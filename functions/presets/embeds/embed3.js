/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const genButtons = require("@gen/playerButtons.js");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (data, client, player) => {
  /*
  const title = data.title;
  const author = data.author;
  const thumbnail = data.thumbnail;
  const duration = data.duration;
  const color = data.color;
  const progress = data.progress;
  const source = data.source;
  */

  const title = data.title;
  const author = data.author;
  const duration = data.duration;
  const thumbnail = data.thumbnail;

  const embed = new client.embed()
    .addFields([
      {
        name: `**Now Playing..**`,
        value:
          `. **Song :** ${title.substring(0, 20)}...\n` +
          `. **Author :** ${author}\n` +
          `. **Duration: **${duration}\n` +
          `. **Requester: **${player.queue.current.requester}`,
        inline: true,
      },
    ])
    .thumb(thumbnail)
    .img(
      "https://media.discordapp.net/attachments/1308318492596109323/1308810810549866587/linha_8-3-1-3-1-1-1-1-1.gif?ex=673f4c8d&is=673dfb0d&hm=4d593fe46ef41b208bb70446ba9667feea2e8923137ad3667613519342c583a0&",
    );

  return [[embed], [], [genButtons(client, player, 5)[0]]];
};
