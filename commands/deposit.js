const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit your coins into the bank")
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

    if (amount > data.wallet) {
      await interaction.reply({
        content: "You don't have that much coins in your wallet at the moment!",
      });
    } else {
      data.wallet -= amount;
      data.bank += amount;
      await data.save();

      const depositEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Deposited successfully")
        .setDescription(`Deposit amount: **:coin: ${amount.toLocaleString()}**`)
        .setTimestamp();

      await interaction.reply({
        embeds: [depositEmbed],
      });
    }
  },
};
