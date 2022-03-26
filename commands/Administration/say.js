module.exports = {
    name: "say",
    category: "Administration",
    aliases: ["speak"],
    usage: "say <text>",
    description: ":parrot:",
    adminOnly: false,
    run: async (client, message, args) => {
      const text = args.join(" ");
      if(!args[0]) return message.channel.send(`Sem texto pra eu falar`);

      message.channel.send(text);

  }
}
