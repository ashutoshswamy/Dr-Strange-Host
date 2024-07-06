const config = require("../config.json");
const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gif")
    .setDescription("Get a GIF from tenor")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Enter a search query")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const query = interaction.options.getString("query");

    let url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
      query
    )}&key=${config.tenor_api_key}&limit=8`;

    axios
      .get(url)
      .then(async (res) => {
        await interaction.reply({
          content: res.data.results[Math.floor(Math.random() * 7)].url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
