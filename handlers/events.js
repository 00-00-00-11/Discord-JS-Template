const fs = require("fs");
const allevents = [];

module.exports = async (client) => {
  const load_dir = (dir) => {
    const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js")); // Getting all files that ends with .js
    for(const file of event_files) {
      const event = require(`../events/${dir}/${file}`) // Getting all events name
      let eventName = file.split(".")[0]
      allevents.push(eventName); // Adding to allevents array (just to count)
      client.on(eventName, event.bind(null, client)); // client.on(event)
    }
  }

  await ["client", "guild"].forEach((e) => load_dir(e)); // Load events
  for(let i = 0; i < allevents.length; i++) {
    console.log(`${i+1}. ${allevents[i]} Ready`); // Events ready
  }
  console.log(`\n- Loaded ${allevents.length} Events -`);
  console.log("\nLogging into the BOT...");
};
