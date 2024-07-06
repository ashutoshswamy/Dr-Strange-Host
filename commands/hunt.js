const schema = require("../schemas/currencySchema");
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("hunt")
    .setDescription(
      "Hunt for some animals in the wood and earn coins by selling them"
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const animals = ["Pig", "Bear", "Wild Boar", "Skunk", "Rabbit"];
    const animal = animals[Math.floor(Math.random() * animals.length)];
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

    if (timeout - (Date.now() - data.huntTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.huntTimeout));

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
      if (animal == "Pig") {
        data.huntTimeout = Date.now();
        data.pigCount += amount;
        await data.save();

        const huntEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You went in the woods and hunted **${amount} ${animal}(s)**`
          )
          .setFooter({
            text: "You can sell these by using the /sell command",
          });

        await interaction.reply({
          embeds: [huntEmbed],
        });
      } else if (animal == "Bear") {
        data.huntTimeout = Date.now();
        data.bearCount += amount;
        await data.save();

        const huntEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You went in the woods and hunted **${amount} ${animal}(s)**`
          )
          .setFooter({
            text: "You can sell these by using the /sell command",
          });

        await interaction.reply({
          embeds: [huntEmbed],
        });
      } else if (animal == "Wild Boar") {
        data.huntTimeout = Date.now();
        data.wildboarCount += amount;
        await data.save();

        const huntEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You went in the woods and hunted **${amount} ${animal}(s)**`
          )
          .setFooter({
            text: "You can sell these by using the /sell command",
          });

        await interaction.reply({
          embeds: [huntEmbed],
        });
      } else if (animal === "Skunk") {
        data.huntTimeout = Date.now();
        data.skunkCount += amount;
        await data.save();

        const huntEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You went in the woods and hunted **${amount} ${animal}(s)**`
          )
          .setFooter({
            text: "You can sell these by using the /sell command",
          });

        await interaction.reply({
          embeds: [huntEmbed],
        });
      } else {
        data.huntTimeout = Date.now();
        data.rabbitCount += amount;
        await data.save();

        const huntEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You went in the woods and hunted **${amount} ${animal}(s)**`
          )
          .setFooter({
            text: "You can sell these by using the /sell command",
          });

        await interaction.reply({
          embeds: [huntEmbed],
        });
      }
    }
  },
};
