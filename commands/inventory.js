const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("inventory")
    .setDescription("View your inventory"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
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

    const inventoryEmbed = new discord.EmbedBuilder()
      .setColor("Blurple")
      .setThumbnail(
        `${interaction.user.displayAvatarURL({
          size: 256,
        })}`
      )
      .setTitle(`${interaction.user.username}'s Inventory`)
      .setDescription("These are all the items in our inventory")
      .addFields(
        {
          name: "Fish",
          value: `${data.fishCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Pig",
          value: `${data.pigCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Bear",
          value: `${data.bearCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Wild Boar",
          value: `${data.wildboarCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Skunk",
          value: `${data.skunkCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Rabbit",
          value: `${data.rabbitCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Iron",
          value: `${data.ironCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Gold",
          value: `${data.goldCount.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Diamond",
          value: `${data.diamondCount.toLocaleString()}`,
          inline: true,
        }
      );

    const inventoryEmbed2 = new discord.EmbedBuilder()
      .setColor("Blurple")
      .addFields({
        name: "Wood Log",
        value: `${data.woodlogCount.toLocaleString()}`,
        inline: true,
      });

    const inventoryEmbed3 = new discord.EmbedBuilder()
      .setColor("Blurple")
      .setFooter({
        text: "You can sell these items by using the /sell command\nYou can see the selling prices using the /sellprices command",
      });

    await interaction.reply({
      embeds: [inventoryEmbed, inventoryEmbed2, inventoryEmbed3],
    });
  },
};
