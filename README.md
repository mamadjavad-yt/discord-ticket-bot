<div align="center">

<h1>🎫 Discord Ticket Bot</h1>
<p>A powerful, feature-rich Discord ticket system built with <strong>discord.js v14</strong></p>

<img src="https://img.shields.io/badge/discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />

</div>

---

## ✨ Features

- 🎫 **Ticket Panel** — Beautiful embed with button to create tickets
- 🔒 **Auto Permissions** — Only ticket creator + staff can see the channel
- 📋 **Ticket Logs** — All actions logged to a dedicated channel
- 🔖 **Slash Commands** — Modern `/ticket panel` and `/ticket close`
- ⚡ **Fast & Lightweight** — Built on Node.js with minimal dependencies

---

## 📦 Setup

### Prerequisites
- Node.js v18+
- A Discord Bot Token

### Installation

```bash
# Clone the repo
git clone https://github.com/mamadjavad-yt/discord-ticket-bot.git
cd discord-ticket-bot

# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env
```

### Configure `.env`

```env
TOKEN=your_bot_token_here
CLIENT_ID=your_client_id
GUILD_ID=your_server_id
TICKET_CATEGORY_ID=category_for_tickets
LOG_CHANNEL_ID=channel_for_logs
STAFF_ROLE_ID=your_staff_role_id
```

### Run

```bash
npm start
```

---

## 🛠️ Commands

| Command | Description | Permission |
|---------|-------------|-----------|
| `/ticket panel` | Sends the ticket panel embed | Manage Channels |
| `/ticket close` | Closes the current ticket | Staff |

---

## 📁 Project Structure

```
discord-ticket-bot/
├── src/
│   ├── index.js              # Bot entry point
│   ├── commands/
│   │   └── ticket.js         # /ticket command
│   └── events/
│       ├── ready.js          # On bot ready
│       └── interactionCreate.js  # Buttons & commands
├── .env.example
├── package.json
└── README.md
```

---

## 👤 Author

Made with ❤️ by **[mamadjavad-yt](https://github.com/mamadjavad-yt)**

> 🎮 Part of the **OnyxRanked** developer community

---

## 📄 License

MIT License — free to use and modify.
