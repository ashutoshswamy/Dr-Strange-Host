const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("sellprices")
    .setDescription("View the selling prices of all the items"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const pricesEmbed = new discord.EmbedBuilder()
      .setColor("Blurple")
      .setTitle("Selling Prices")
      .setDescription(
        "These are the selling prices of all the items\n\n**:coin: 100 / Fish**\n**:coin: 250 / Pig**\n**:coin: 500 / Bear**\n**:coin: 500 / Wild Boar**\n**:coin: 250 / Skunk**\n**:coin: 250 / Rabbit**\n**:coin: 2,500 / 1kg Iron**\n**:coin: 5,000 / 1kg Gold**\n**:coin: 10,000 / Diamond**\n**:coin: 500 / Wood Log**"
      )
      .setFooter({
        text: "You can sell these by using the /sell command",
      });

    await interaction.reply({
      embeds: [pricesEmbed],
    });
  },
};
