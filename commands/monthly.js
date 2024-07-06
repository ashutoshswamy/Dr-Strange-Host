const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("monthly")
    .setDescription("Get your monthly reward"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const amount = Math.floor(Math.random() * 250000) + 10000;

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

    let timeout = 2592000000;

    if (timeout - (Date.now() - data.monthlyTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.monthlyTimeout));

      const timeoutEmbed = new discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Calm down a little bit...")
        .setDescription(
          `You have already recieved your monthly reward\nYou can use this command again after **:alarm_clock: ${timeLeft}**`
        );

      await interaction.reply({
        embeds: [timeoutEmbed],
      });
    } else {
      data.monthlyTimeout = Date.now();
      data.wallet += amount;
      await data.save();

      const monthlyEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setDescription(
          `You recieved a monthly reward of **:coin: ${amount.toLocaleString()}**`
        );

      await interaction.reply({
        embeds: [monthlyEmbed],
      });
    }
  },
};
