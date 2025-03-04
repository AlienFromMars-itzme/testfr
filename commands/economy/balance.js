/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

module.exports = {
  name: "balance",
  aliases: ["bal"],
  cooldown: "",
  category: "economy",
  usage: "",
  description: "Check balance",
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
    let coins = parseInt(
      (await client.db.coins.get(`${message.author.id}`)) || 0,
    );

    const m = await message
      .reply({
        embeds: [
          new client.embed()
            .desc(
              `**${emoji.coin} You have a total of ${
                coins || `0`
              } coins**\n\n` +
                `**Need coins ? Here's how you can get them:**\n\n` +
                `${emoji.free}**For Freebies :**\n` +
                `⠀⠀⠀Each cmd used (1-3 coins)\n` +
                `⠀⠀⠀Add me in server (150 coins)\n` +
                `${emoji.rich}**For Rich boys :**\n` +
                `⠀⠀⠀Boost support server (1000 coins)\n` +
                `⠀⠀⠀Pay 1.5M UwU or 29.99 INR (1800 coins)\n` +
                `${emoji.danger}**For Daredevils :**\n` +
                `⠀⠀⠀Beg ! May get u rich / blacklisted\n\n`,
            )

            .setFooter({
              text: `This isn't a real but an in-game currency. User discretion is advised.ㅤㅤ`,
            }),
        ],
      })
      .catch(() => {});
  },
};
