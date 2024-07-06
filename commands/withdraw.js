const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("Withdraw your coins from the bank")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Enter the amount")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const amount = interaction.options.getInteger("amount");

    let data;

    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
        });
      }
    } catch (err) {
      console.log(err);
    }

    if (amount > data.bank) {
      await interaction.reply({
        content: "You don't have that much coins in your bank at the moment!",
      });
    } else {
      data.bank -= amount;
      data.wallet += amount;
      await data.save();

      const withdrawEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Withdrawn successfully")
        .setDescription(
          `Withdraw amount: **:coin: ${amount.toLocaleString()}**`
        )
        .setTimestamp();

      await interaction.reply({
        embeds: [withdrawEmbed],
      });
    }
  },
};
