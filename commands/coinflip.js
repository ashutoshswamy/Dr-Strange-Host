const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Flip a coin and test your luck")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Select heads or tails")
        .addChoices(
          {
            name: "Heads",
            value: "heads",
          },
          {
            name: "Tails",
            value: "tails",
          }
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("bet_amount")
        .setDescription("Enter your bet amount")
        .setMinValue(1000)
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const choice = interaction.options.getString("choice");
    const betAmount = interaction.options.getInteger("bet_amount");
    const botChoices = ["heads", "tails"];
    const botChoice = botChoices[Math.floor(Math.random() * botChoices.length)];

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

    if (timeout - (Date.now() - data.coinflipTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.coinflipTimeout));

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
      if (choice === botChoice) {
        data.coinflipTimeout = Date.now();
        data.wallet += betAmount;
        await data.save();

        const winEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setImage("https://media1.tenor.com/m/V5M7-v_BsYUAAAAC/ee.gif")
          .setTitle("You won!")
          .setDescription(
            `**${choice}** it is!\n\nYou got double of your bet amount back!`
          );

        await interaction.reply({
          embeds: [winEmbed],
        });
      } else {
        data.coinflipTimeout = Date.now();
        data.wallet -= betAmount;
        await data.save();

        const loseEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setImage(
            "https://media1.tenor.com/m/A5pno59UdMoAAAAC/minions-bored.gif"
          )
          .setTitle("You Lost!")
          .setDescription(
            `**${botChoice}** it is!\n\nYou lost all your bet amount!`
          );

        await interaction.reply({
          embeds: [loseEmbed],
        });
      }
    }
  },
};
