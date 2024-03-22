require("dotenv").config(); //initializes dotenv
const { Client, GatewayIntentBits } = require("discord.js");
const minnesota = "./minnesota.png";
const regex = /minnesota/i;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    // Add other intents as needed
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (regex.test(msg.content)) {
    msg.reply({ files: [minnesota] });
  }
});

//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
