const Discord = require('discord.js')
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })

const fs = require('fs');
const { readdirSync } = require('fs')

client.slashcommands = new Discord.Collection()
const slashcommandFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith(".js"))

for (const file of slashcommandFiles){
  const slash = require(`./slashcmd/${file}`)
  console.log(`Slash command -> ${file}`)
  client.slashcommands.set(slash.data.name, slash)
}

client.on("ready", async (ready) => {
  console.log("BOT LISTO")
});

client.on("interactionCreate", async (interaction) => {
  if(!interaction.isCommand()) return; 

  const slashcmds = client.slashcommands.get(interaction.commandName)
  
  if(!slashcmds) return;

  try {
    await slashcmds.run(client, interaction)
  } catch(e) {
    console.error(e)
  }
})


client.login("TOKEN")