const config = require("../../config/config.js"); // Loading config file with token and prefix, and settings

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

module.exports = async (client, message) => {
  if(!message.guild) return; // If the message is not in a guild, return (ignore)
  if(message.author.bot) return; // If the message author is a bot, return
  if(message.channel.partial) await message.channel.fetch(); // If the channel is on partial fetch it
  if(message.partial) await message.fetch(); // If the message is on partial fetch it
  
  let prefix = config.prefix; // Get the current prefix from the config/config.json
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); // The prefix can be a Mention of the Bot / The defined Prefix of the Bot
  
  if(!prefixRegex.test(message.content.toLowerCase())) return; // If its not that then return
  
  const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex); // Now define the right prefix either ping or not ping
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/); // Create the arguments with sliceing of of the rightprefix length
  const cmd = args.shift().toLowerCase(); // Creating the cmd argument by shifting the args by 1
  
  // If no cmd added return error
  if(cmd.length === 0) {
    if(matchedPrefix.includes(client.user.id)) // If message content is bot ping
      return message.channel.send(`Para ver todos os comandos digite \`${prefix}help\``);
    return;
  }
  
  let command = client.commands.get(cmd); // Get the command from the collection

  // If the command does not exist, try to get it by his alias
  if(!command) command = client.commands.get(client.aliases.get(cmd));
  
  // If the command is now valid
  if(command) {
      if(command.adminOnly) { // If adminOnly configuration is true
        // *code*
        // adminOnly example: commands/say.js
      }

      command.run(client, message, args); // Run the command with the parameters:  client, message, args
  } else // If the command is not found send an info msg
      return message.channel.send(`❌ Unkown command, try: **\`${prefix}help\`** \nTo get help on a specific command, type \`${prefix}help [command name]\``)
      .then(msg => msg.delete(), 5000).catch((e) => {console.log(e)});
}

