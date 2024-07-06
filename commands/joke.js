const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("joke")
    .setDescription("Get jokes on different topics")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("Select a topic")
        .addChoices(
          {
            name: "Random",
            value: "random",
          },
          {
            name: "Programming",
            value: "programming",
          },
          {
            name: "Misc",
            value: "misc",
          },
          {
            name: "Dark",
            value: "dark",
          },
          {
            name: "Pun",
            value: "pun",
          },
          {
            name: "Spooky",
            value: "spooky",
          },
          {
            name: "Christmas",
            value: "christmas",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let topic = interaction.options.getString("topic");

    if (topic == "random") {
      axios
        .get("https://v2.jokeapi.dev/joke/Any")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (topic == "programming") {
      axios
        .get("https://v2.jokeapi.dev/joke/Programming")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (topic == "misc") {
      axios
        .get("https://v2.jokeapi.dev/joke/Misc")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (topic == "dark") {
      axios
        .get("https://v2.jokeapi.dev/joke/Dark")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (topic == "pun") {
      axios
        .get("https://v2.jokeapi.dev/joke/Pun")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (topic == "spooky") {
      axios
        .get("https://v2.jokeapi.dev/joke/Spooky")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("https://v2.jokeapi.dev/joke/Christmas")
        .then(async (res) => {
          const jokeEmbed = new discord.EmbedBuilder()
            .setColor("Blurple")
            .setDescription(`${res.data.setup}\n${res.data.delivery}`);

          await interaction.reply({
            embeds: [jokeEmbed],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
