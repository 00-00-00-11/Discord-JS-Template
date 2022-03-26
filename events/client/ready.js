module.exports = (client) => {
  console.log(`\n-> Logged in as ${client.user.tag}!\n`);

  client.user.setActivity('Yey', { type: 'WATCHING' });
  // PLAYING
  // STREAMING
  // LISTENING
  // WATCHING
  // COMPETING
};
