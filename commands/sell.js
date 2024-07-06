const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("sell")
    .setDescription("Sell items and earn coins")
    .addStringOption((option) =>
      option
        .setName("item")
        .setDescription("Select an item")
        .addChoices(
          {
            name: "Fish",
            value: "fish",
          },
          {
            name: "Pig",
            value: "pig",
          },
          {
            name: "Bear",
            value: "bear",
          },
          {
            name: "Wild Boar",
            value: "wildboar",
          },
          {
            name: "Skunk",
            value: "skunk",
          },
          {
            name: "Rabbit",
            value: "rabbit",
          },
          {
            name: "Iron",
            value: "iron",
          },
          {
            name: "Gold",
            value: "gold",
          },
          {
            name: "Diamond",
            value: "diamond",
          },
          {
            name: "Wood Log",
            value: "woodlog",
          }
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("quantity")
        .setDescription("Enter the quantity")
        .setMinValue(1)
        .setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const item = interaction.options.getString("item");
    const quantity = interaction.options.getInteger("quantity") || 1;

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

    if (item == "fish") {
      if (quantity > data.fishCount) {
        await interaction.reply({
          content:
            "You don't have that much **Fish** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 100;

        data.fishCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Fish(es)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "pig") {
      if (quantity > data.pigCount) {
        await interaction.reply({
          content:
            "You don't have that much **Pig** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 250;

        data.pigCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Pig(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "bear") {
      if (quantity > data.bearCount) {
        await interaction.reply({
          content:
            "You don't have that much **Bear** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 500;

        data.bearCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Bear(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "wildboar") {
      if (quantity > data.wildboarCount) {
        await interaction.reply({
          content:
            "You don't have that much **Wild Boar** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 500;

        data.wildboarCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Wild Boar(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "skunk") {
      if (quantity > data.skunkCount) {
        await interaction.reply({
          content:
            "You don't have that much **Skunk** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 250;

        data.skunkCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Skunk(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "rabbit") {
      if (quantity > data.rabbitCount) {
        await interaction.reply({
          content:
            "You don't have that much **Rabbit** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 250;

        data.rabbitCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Rabbit(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "iron") {
      if (quantity > data.ironCount) {
        await interaction.reply({
          content:
            "You don't have that much **Iron** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 2500;

        data.ironCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} kg** of **Iron** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "gold") {
      if (quantity > data.goldCount) {
        await interaction.reply({
          content:
            "You don't have that much **Gold** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 5000;

        data.goldCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} kg** of **Gold** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else if (item == "diamond") {
      if (quantity > data.diamondCount) {
        await interaction.reply({
          content:
            "You don't have that much **Diamond** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 10000;

        data.diamondCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Diamond(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    } else {
      if (quantity > data.woodlogCount) {
        await interaction.reply({
          content:
            "You don't have that much **Wood Log** in your inventory at the moment...",
        });
      } else {
        const amount = quantity * 500;

        data.woodlogCount -= quantity;
        data.wallet += amount;
        await data.save();

        const sellEmbed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setDescription(
            `You sold **${quantity.toLocaleString()} Wood Log(s)** and earned **:coin: ${amount.toLocaleString()}**`
          );

        await interaction.reply({
          embeds: [sellEmbed],
        });
      }
    }
  },
};
