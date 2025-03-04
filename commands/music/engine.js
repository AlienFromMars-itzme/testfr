/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "engine",
  aliases: [],
  cooldown: "",
  category: "music",
  usage: "",
  description: "change search engine for music",
  args: false,
  vote: true,
  new: true,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: ["ManageGuild"],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
      
      let engins = ["spotify", "soundcloud", "deezer", "ytmusic", "apple"]
      
      const row = new ActionRowBuilder()
      .addComponents(
          new client.button().secondary()
      )
      
      const edit = await message.reply({
          embeds: [
          new client.embed().desc(
            `${emoji.loop} **Choose a search engine from below :**`,
          ),
        ],
        components: [row],
      })
      .catch(() => {});
  
  
  
  }
}