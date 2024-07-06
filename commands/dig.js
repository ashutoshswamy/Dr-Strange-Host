const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("dig")
    .setDescription("Dig some minerals and earn coins by selling them"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const minerals = ["Iron", "Gold", "Diamond"];
    const mineral = minerals[Math.floor(Math.random() * minerals.length)];
    const amount = Math.floor(Math.random() * 5) + 1;

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

    if (timeout - (Date.now() - data.digTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.digTimeout));

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
      if (mineral == "Iron") {
        data.digTimeout = Date.now();
        data.ironCount += amount;
        await data.save();

        const digEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You did some digging and found **${amount} kg** of **${mineral}**`
          )
          .setFooter({
            text: "You can sell this by using the /sell command",
          });

        await interaction.reply({
          embeds: [digEmbed],
        });
      } else if (mineral == "Gold") {
        data.digTimeout = Date.now();
        data.goldCount += amount;
        await data.save();

        const digEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You did some digging and found **${amount} kg** of **${mineral}**`
          )
          .setFooter({
            text: "You can sell this by using the /sell command",
          });

        await interaction.reply({
          embeds: [digEmbed],
        });
      } else {
        data.digTimeout = Date.now();
        data.diamondCount += amount;
        await data.save();

        const digEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You did some digging and found **${amount} ${mineral}(s)**`
          )
          .setFooter({
            text: "You can sell this by using the /sell command",
          });

        await interaction.reply({
          embeds: [digEmbed],
        });
      }
    }
  },
};
