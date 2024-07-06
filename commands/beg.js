const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for some coins"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const choices = [0, 1];
    const choice = choices[Math.random(Math.floor() * choices.length)];
    const amount = Math.floor(Math.random() * 1000) + 100;

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

    let timeout = 30000;

    if (timeout - (Date.now() - data.begTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.begTimeout));

      const timeoutEmbed = new discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Calm down a little bit...")
        .setDescription(
          `You can use this command again after **:alarm_clock: ${timeLeft}**`
        );

      await interaction.reply({
        embeds: [timeoutEmbed],
      });
    } else {
      if (choice === 0) {
        const replies = [
          "Not now, you beggar!",
          "I can't give you coins right now!",
          "You luck's not good enough!",
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];

        await interaction.reply({
          content: reply,
        });
      } else {
        data.begTimeout = Date.now();
        data.wallet += amount;
        await data.save();

        const begEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You begged and recieved **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [begEmbed],
        });
      }
    }
  },
};
