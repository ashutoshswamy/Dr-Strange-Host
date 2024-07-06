const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("slots")
    .setDescription("Use the slots machine and test your luck")
    .addIntegerOption((option) =>
      option
        .setName("bet_amount")
        .setDescription("Enter the bet amount")
        .setMinValue(1000)
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const betAmount = interaction.options.getInteger("bet_amount");
    const slotsData = ["🍎", "🍊", "🍇", "🍌", "🍍", "🍉"];
    const slot1 = slotsData[Math.floor(Math.random() * slotsData.length)];
    const slot2 = slotsData[Math.floor(Math.random() * slotsData.length)];
    const slot3 = slotsData[Math.floor(Math.random() * slotsData.length)];

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

    if (timeout - (Date.now() - data.slotsTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.slotsTimeout));

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
      if (slot1 === slot2 && slot1 === slot3 && slot2 === slot3) {
        data.slotsTimeout = Date.now();
        data.wallet += betAmount;
        await data.save();

        const winEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setImage("https://media1.tenor.com/m/V5M7-v_BsYUAAAAC/ee.gif")
          .setTitle("You won!")
          .setDescription(
            `${slot1} | ${slot2} | ${slot3}\n\nYou got double of your bet amount back!`
          );

        await interaction.reply({
          embeds: [winEmbed],
        });
      } else {
        data.slotsTimeout = Date.now();
        data.wallet -= betAmount;
        data.wallet += betAmount / 2;
        await data.save();

        const loseEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setImage(
            "https://media1.tenor.com/m/A5pno59UdMoAAAAC/minions-bored.gif"
          )
          .setTitle("You Lost!")
          .setDescription(
            `${slot1} | ${slot2} | ${slot3}\n\nYou got half of your bet amount back!`
          );

        await interaction.reply({
          embeds: [loseEmbed],
        });
      }
    }
  },
};
