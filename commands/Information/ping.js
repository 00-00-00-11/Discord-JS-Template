module.exports = {
    name: "ping",
    category: "Information",
    aliases: [],
    usage: "ping",
    description: "Quão rápido posso te responder",
    run: async (client, message) => {
    
      message.channel.send("Pinging....").then(msg=>{
        msg.edit(`🏓 Pong! \nAPI: \`${Math.round(client.ws.ping)}\`ms \nBot: \`${msg.createdAt - message.createdAt}\`ms.`);
        // msg.edit(`🏓 Ping is \`${Math.round(client.ws.ping)}ms\``)});
      });
  }
};
