/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */
const axios = require("axios");
const { ActionRowBuilder } = require("discord.js")

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "See server configs",
  args: false,
  vote: false,
  new: true,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
      
    const id = message.mentions.users.first()?.id || args[0] || message.member.id;
    const user = await client.users.fetch(id).catch(() => null);
      
      if (!user) {
      return await message.reply({
        embeds: [
          new client.embed().desc(`${emoji.no} **Invalid/No User provided**`),
        ],
      });
    }
      
    let [pfx, premiumUser, dev, admin, badges] = await Promise.all([
      await client.db.pfx.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
      await client.db.badges.get(`${client.user.id}_${message.author.id}`) || []
    ]);
      
      

    let premium =
      premiumUser == true
        ? "Lifetime"
        : premiumUser
          ? `Expiring <t:${`${premiumUser}`?.slice(0, -3)}:R>`
          : `\`Not Activated\``;

      

      

      let bdg = {
          "dev": " Development Team",
          "owner": " Owner",
          "donate": " Donator",
          "npre": " Realm No Prefix",
          "staff": " Staff Team",
          "vip": " Vip", 
          "friend": " Owner's Friend",
          "partner": " Partner",
          "contributor": " Contributor",
          "mspec": " Realm Special",
          "earlysupporter": " Early Supporter",
          "beta": " Beta Tester"
      }
      
      let show = ""
      
      if (dev) show += ` [${user.displayName}](https://discord.com/users/${user.id})\n`
      
      badges.size > 0 ? badges.forEach((x) => {
          show += `${bdg[x]}\n`
      }) : show += " My Pricious Users"
    await message
      .reply({
        embeds: [
          new client.embed()

            .setAuthor({
              name: `${user.displayName} Profile`,
              iconURL: client.user.displayAvatarURL(),
            })
            .addFields([
                {
                    name: `Badges [ ${badges.size > 0 ? badges.size : `1`} ]`,
                    value: `**${show}**`
                },
                {
                    name: `Privilages`,
                    value: `**${ premiumUser ? `${emoji.prime} Premium` ${premium} : ""}\n${ premiumUser ? `${emoji.vote} Vote Commands Access` : ""}**`
                }
            ])
            

            .thumb(message.member.displayAvatarURL())
            .setFooter({
              text: `Requested by ${message.author.displayName}`,
                iconURL: message.author.displayAvatarURL()
            }),
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new client.button().link("Free Privilage", `https://top.gg/bot/${client.user.id}/vote/`)
            )
        ]
      })
      .catch(() => {});
  },
};
