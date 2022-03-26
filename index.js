const Discord = require("discord.js");
const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs");

// Creates bot client
const client = new Client({
    partials: ["CHANNEL"],
	intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
});

// Client variables to use everywhere
client.commands = new Collection(); // An collection (like a digital map(database)) for all your commands
client.aliases = new Collection(); // An collection for all your command-aliases
client.events = new Collection();
client.categories = fs.readdirSync("./commands/"); // Categories

// Loading files, with the client variable like Command Handler, Event Handler etc
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Login into the bot
const { TOKEN } = require('./config/config.js');
client.login(TOKEN)
