/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "notice",
  aliases: [],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows message from devs",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    let emb = new client.embed()
      .desc(
        `## Notice from developers\n\n` +
          `**Changelogs**\n` +
          `ㅤ${emoji.yes}  Change V1 To V1.7 \n` +
          `ㅤ${emoji.yes}  Added PlayEmbeds, Spotify Engine, New Commands \n` +

          `**Bugs and reports**\n` +
          `ㅤ${emoji.bug}  Report bugs using \`${client.prefix}report\`\n`,
      )

    await message.reply({ embeds: [emb] }).catch(() => {});
  },
};
