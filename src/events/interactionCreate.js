const {
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({ content: "❌ An error occurred!", ephemeral: true });
      }
    }

    // Handle button: create ticket
    if (interaction.isButton() && interaction.customId === "create_ticket") {
      const guild = interaction.guild;
      const user = interaction.user;

      // Check if user already has a ticket
      const existing = guild.channels.cache.find(
        (c) => c.name === `ticket-${user.username.toLowerCase()}`
      );
      if (existing) {
        return interaction.reply({
          content: `❌ You already have a ticket: ${existing}`,
          ephemeral: true,
        });
      }

      // Create ticket channel
      const channel = await guild.channels.create({
        name: `ticket-${user.username.toLowerCase()}`,
        type: ChannelType.GuildText,
        parent: process.env.TICKET_CATEGORY_ID || null,
        permissionOverwrites: [
          { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
          {
            id: user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
          {
            id: process.env.STAFF_ROLE_ID || guild.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.ManageChannels,
            ],
          },
        ],
      });

      const embed = new EmbedBuilder()
        .setTitle("🎫 Ticket Opened")
        .setDescription(`Hello ${user}! Please describe your issue and a staff member will assist you shortly.`)
        .setColor(0x57f287)
        .setTimestamp()
        .setFooter({ text: "OnyxRanked Support" });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("close_ticket")
          .setLabel("Close Ticket")
          .setEmoji("🔒")
          .setStyle(ButtonStyle.Danger)
      );

      await channel.send({ content: `${user} <@&${process.env.STAFF_ROLE_ID}>`, embeds: [embed], components: [row] });
      await interaction.reply({ content: `✅ Your ticket has been created: ${channel}`, ephemeral: true });

      // Log
      const logChannel = guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("📋 Ticket Created")
              .addFields(
                { name: "User", value: `${user.tag}`, inline: true },
                { name: "Channel", value: `${channel}`, inline: true }
              )
              .setColor(0x5865f2)
              .setTimestamp(),
          ],
        });
      }
    }

    // Handle button: close ticket
    if (interaction.isButton() && interaction.customId === "close_ticket") {
      await interaction.reply("🔒 Closing ticket in 5 seconds...");
      setTimeout(() => interaction.channel.delete(), 5000);
    }
  },
};
