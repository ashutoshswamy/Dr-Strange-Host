const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("commands")
    .setDescription("Shows all the available commands")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Select a category")
        .addChoices(
          {
            name: "Currency",
            value: "currency",
          },
          {
            name: "Gambling",
            value: "gambling",
          },
          {
            name: "Fun",
            value: "fun",
          },
          {
            name: "Utility",
            value: "utility",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const category = interaction.options.getString("category");

    if (category == "currency") {
      const currencyEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Currency commands")
        .setDescription(
          "`balance`, `beg`, `deposit`, `withdraw`, `fish`, `hunt`, `dig`, `chopwood`, `daily`, `weekly`, `monthly`, `inventory`, `sell`, `sellprices`"
        );

      await interaction.reply({
        embeds: [currencyEmbed],
      });
    } else if (category == "gambling") {
      const gamblingEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Gambling commands")
        .setDescription("`coinflip`, `slots`");

      await interaction.reply({
        embeds: [gamblingEmbed],
      });
    } else if (category == "fun") {
      const funEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Fun commands")
        .setDescription("`meme`, `gif`, `joke`");

      await interaction.reply({
        embeds: [funEmbed],
      });
    } else {
      const utilityEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Utility commands")
        .setDescription("`ping`, `commands`");

      await interaction.reply({
        embeds: [utilityEmbed],
      });
    }
  },
};
