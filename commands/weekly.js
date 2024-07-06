const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Get your weekly reward"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const amount = Math.floor(Math.random() * 50000) + 5000;

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

    let timeout = 604800000;

    if (timeout - (Date.now() - data.weeklyTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.weeklyTimeout));

      const timeoutEmbed = new discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Calm down a little bit...")
        .setDescription(
          `You have already recieved your weekly reward\nYou can use this command again after **:alarm_clock: ${timeLeft}**`
        );

      await interaction.reply({
        embeds: [timeoutEmbed],
      });
    } else {
      data.weeklyTimeout = Date.now();
      data.wallet += amount;
      await data.save();

      const weeklyEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setDescription(
          `You recieved a weekly reward of **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [weeklyEmbed],
      });
    }
  },
};
