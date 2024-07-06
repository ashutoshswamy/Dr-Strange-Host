const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("fish")
    .setDescription("Do some fishing and earn coins by selling them"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const amount = Math.floor(Math.random() * 10) + 1;

    let data;

    try {
      data = await schema.findOne({
        userId: interaction.user.id,
        guildId: interaction.guild.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
    }

    let timeout = 30000;

    if (timeout - (Date.now() - data.fishTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.fishTimeout));

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
      data.fishTimeout = Date.now();
      data.fishCount += amount;
      await data.save();

      const fishEmbed = new discord.EmbedBuilder()
        .setColor("Blurple")
        .setDescription(
          `You did some fishing and caught **${amount} fish(es)**`
        )
        .setFooter({
          text: "You can sell these by using the /sell command",
        });

      await interaction.reply({
        embeds: [fishEmbed],
      });
    }
  },
};
