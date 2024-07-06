const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your balance"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
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

    const balanceEmbed = new discord.EmbedBuilder()
      .setColor("Blurple")
      .setThumbnail(
        `${interaction.user.displayAvatarURL({
          size: 256,
        })}`
      )
      .setTitle(`${interaction.user.username}'s Balance`)
      .setDescription(
        `Wallet: **:coin: ${data.wallet.toLocaleString()}**\nBank: **:coin: ${data.bank.toLocaleString()}**`
      );

    await interaction.reply({
      embeds: [balanceEmbed],
    });
  },
};
