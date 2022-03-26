const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json");
const { prefix } = require("../../config/config.js");

function capitalize(string) { // Remove if your category's name isn't capitalized
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

module.exports = {
  name: "help",
  category: "Info",
  aliases: ["ajuda", "comandos"],
  usage: "help [command]",
  description: "Uma lista de todos os comandosm, ou, uma explicação de apenas um comando",
  run: async (client, message, args) => {

    // Show all categorys
    if(!args[0]) {
      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("HELP MENU 🦜🤙 Categories")
        .setFooter({ text: `Para ver informações de um comando digite ${prefix}help [cmd]`, iconURL: client.user.displayAvatarURL() });

      const commands = (category) => {
          return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
      };

      var inputArray = [];
      for(let i = 0; i < client.categories.length; i++) {
        const current = client.categories[i];
        const items = commands(current);

        var perChunk = 3; // items per chunk    
        inputArray.push(`${current.toUpperCase()} [${items.length}]`);
  
        // Less readable (This isn't my code)
        var result = inputArray.reduce((all, one, i) => {
          const ch = Math.floor(i/perChunk); 
          all[ch] = [].concat((all[ch]||[]),one);
          return all
        }, []);
      };

      
      for(let i=0; i<result.length; i++) {
        embed.addField(`${result[i].join("\n") ? result[i].join("\n") : "\u200b"}`, `\u200b`, true);
      }
      return message.channel.send({ embeds: [embed] });
      
      // More readable (This isn't my code)
      // var perChunk = 3 // items per chunk    
      // var inputArray = cat
      // var result = inputArray.reduce((resultArray, item, index) => { 
      //   const chunkIndex = Math.floor(index/perChunk)
      //   if(!resultArray[chunkIndex]) {
      //     resultArray[chunkIndex] = [] // start a new chunk
      //   }
      //   resultArray[chunkIndex].push(item)
      //   return resultArray
      // }, []);
    };
    const embed = new MessageEmbed();
    
    // Check if help is for category
    const current = client.categories[client['categories'].indexOf(capitalize(args[0]))]; // Command name
    if(current) { // If category exists
      const commands = (category) => { // Get commands
        return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
      };
      let items = commands(current); // Commands
      
      // Embed configs
      embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${items.join("\n> ")}`, true)
        .setColor(ee.color)
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("HELP MENU 🦜🤙 Commands")
        .setFooter({ text: `Para ver informações de um comando digite ${prefix}help [category]`, iconURL: client.user.displayAvatarURL() });
      return message.channel.send({ embeds: [embed] });
    };

    // If isn't a category check if is a command
    const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
    if(!cmd) {
      embed.setColor(ee.wrongcolor).setDescription(`Não tenho um comando/categoria chamada **${args[0].toLowerCase()}**`);
      return message.channel.send({ embeds: [embed] });
    }

    // Command help
    if(cmd.name) embed.addField("**Command :**", `\`${cmd.name}\``);
    if(cmd.name) embed.setTitle(`Informações detalhadas sobre \`${cmd.name}\``);
    if(cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);

    let al = cmd.aliases.map((a) => `${a}`).join("`, `");
    if(al.length==0) al = "None";
    if(cmd.aliases) embed.addField("**Aliases**", `\`${al}\``);

    if(cmd.usage) {
        embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
        embed.setFooter({ text: "<> - Argumento obrigátorio \n[] - Argumento opcional" });
    }
    if(cmd.useage) {
        embed.addField("**Usage**", `\`${prefix}${cmd.useage}\``);
        embed.setFooter({ text: "<> - Argumento obrigátorio \n[] - Argumento opcional" });
    }
    embed.setColor(ee.color);
    return message.channel.send({ embeds: [embed] });
  }
};
