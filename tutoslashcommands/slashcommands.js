const fs = require('fs')
const Discord = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guild } = require('./slashconfig.json')
const commands = []
const slashcommandFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith(".js"))

for (const file of slashcommandFiles){
  const slash = require(`./slashcmd/${file}`)
  commands.push(slash.data.toJSON())
}

const rest = new REST({ version: "9" }).setToken("TOKEN")

createSlash()

async function createSlash(){ 
  try{
    await rest.put(
      Routes.applicationCommands(clientId, guild), {
        body: commands
      }
    )
    console.log("Slash Commands Cargados Correctamente") /* CONSOLE */
  } catch(e) {
    console.log(e)
  }
}