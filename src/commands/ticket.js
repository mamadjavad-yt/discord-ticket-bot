const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Ticket management commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addSubcommand((sub) =>
      sub.setName("panel").setDescription("Send the ticket panel to this channel")
    )
    .addSubcommand((sub) =>
      sub.setName("close").setDescription("Close the current ticket")
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "panel") {
      const embed = new EmbedBuilder()
        .setTitle("🎫 Support Tickets")
        .setDescription(
          "Need help? Click the button below to open a support ticket.\n\n" +
          "Our staff team will assist you as soon as possible."
        )
        .setColor(0x5865f2)
        .setFooter({ text: "OnyxRanked Support System" })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("create_ticket")
          .setLabel("Open Ticket")
          .setEmoji("🎫")
          .setStyle(ButtonStyle.Primary)
      );

      await interaction.channel.send({ embeds: [embed], components: [row] });
      await interaction.reply({ content: "✅ Ticket panel sent!", ephemeral: true });
    }

    if (sub === "close") {
      const channel = interaction.channel;
      if (!channel.name.startsWith("ticket-")) {
        return interaction.reply({ content: "❌ This is not a ticket channel!", ephemeral: true });
      }

      await interaction.reply("🔒 Closing ticket in 5 seconds...");
      setTimeout(() => channel.delete(), 5000);
    }
  },
};
