const { REST, Routes, ActivityType } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity("🎫 Managing tickets", { type: ActivityType.Watching });

    // Register slash commands
    const commands = [];
    const commandsPath = path.join(__dirname, "../commands");
    for (const file of fs.readdirSync(commandsPath).filter((f) => f.endsWith(".js"))) {
      const cmd = require(path.join(commandsPath, file));
      if (cmd.data) commands.push(cmd.data.toJSON());
    }

    const rest = new REST().setToken(process.env.TOKEN);
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log(`📦 Registered ${commands.length} slash commands.`);
  },
};
