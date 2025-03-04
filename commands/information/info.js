/** @format

 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const counts = require("@utils/codestats.js");
const { ActionRowBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "info",
  aliases: ["botinfo", "bi"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot-info",
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
    const e1 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(
        `**${client.user.username} is a feature-rich Discord Music Bot.` +
          ` Made in lavalink to provide you the best quality audio possible.` +
          ` Also comes with a variety of awesome audio filters, custom equalizer and much more.**`
      )
      .img(
        "https://images-ext-1.discordapp.net/external/JelYQ0BK4lvppYNFkQJNhmRe_tbFChe59BXjz1xE3Xk/%3Fsize%3D4096/https/cdn.discordapp.com/banners/1089504577734311976/a_e580fad33f25c414ec4e9154f97e128b.gif"
      )
      .setFooter({ text: `Page : [1/7] By ━● RealmX` });

    const e2 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username} [Nerdy Stats]`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(
        `> **${emoji.ver} Version : **\`v${
          require(`@root/package.json`).version
        }-HydroGen\`\n` +
          `> **${emoji.djs} Discord.js : **\`v${
            require("discord.js").version
          }\`\n` +
          `> **${emoji.nodejs}  Node version : **\`${process.version}\`\n` +
          `> **${emoji.cog}  SRC Manager : **\`M-3.1.3\`\n` +
          `> **${emoji.link}  API Manager : **\`iV-Linker\`\n` +
          `> **${emoji.link}  Plugins : **\`v${
            require(`@root/package.json`).dependencies["kazagumo"].split("^")[1]
          } - RainyXeon\`\n` +
          `> **${emoji.dir}  Total Files & Dirs : ** \`${counts.fileCount}\`, \`${counts.directoryCount}\` \n` +
          `> **${emoji.lines}  Line & Chars : ** \`${counts.totalLines}\`, \`${counts.totalCharacters}\`\n`
      )
      .img("https://images.dmca.com/Badges/dmca-badge-w250-5x1-11.png?")
      .setFooter({
        text: `Page : [2/7] By ━● RealmX ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    const e3 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username} [Dev & Owner]`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(
        `> **${emoji.king} [Itz_Me](https://discord.gg/roroa) [Own & Dev]**\n` +
          `> **${emoji.partner} [GameChangerCYC](https://discord.gg/roroa) [Co - Own]**\n` +
          `> **${emoji.dev} [Zenith](https://discord.gg/roroa) [Ex-owner of code]**\n`
      )
      .setFooter({
        text: `Page : [3/7] By ━● RealmX ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    const e4 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username} [Honorables]`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(
        `> **${emoji.partner} [Sky](https://discord.gg/roroa) [Friend]**\n`
      )
      .setFooter({
        text: `Page : [4/7] By ━● RealmX ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    const e5 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username} [Sponsor]`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(`> **${emoji.web} **Galactic Hosting** The Best Quality Host I've Ever Used**`)
      .setFooter({
        text: `Page : [5/7] By ━● RealmX ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    const e6 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username} [Data Discrepency]`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(
        `**• [User Ids](${client.support})** (vote and premium management)\n` +
          `**• [Guild Ids](${client.support})** (vote and premium management)\n` +
          `**• [Logs of cmd used](${client.support})** (bot usage and growth)\n` +
          `**• [Logs of songs played](${client.support})** (bot usage and growth)\n`
      )
      .setFooter({
        text: `Page : [6/7] By ━● RealmX ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    const e7 = new client.embed()
      .setAuthor({
        name: `About ${client.user.username} [Affiliates]`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .desc(
        `> **${emoji.partner}  [Nexus](${client.invite.admin.replace(
          `${client.user.id}`,
          ``
        )}) [AIO-BOT]**\n`
      )
      .setFooter({
        text: `Page : [7/7] By ━● RealmX ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    const pages = [e1, e2, e3, e4, e5, e6, e7];
    let page = 0;

    const btn1 = new client.button().secondary(`home`, `Home`);
    const btn2 = new client.button().secondary(`stats`, `Codestat`);
    const btn3 = new client.button().secondary(`dev`, `Dev`);
    const btn4 = new client.button().secondary(`honor`, `Honours`);
    const btn5 = new client.button().secondary(`sponsor`, `Sponsor`);
    const btn6 = new client.button().secondary(`yourData`, `Privacy`);
    const btn7 = new client.button().secondary(`affiliates`, `Projects`);
    const btn8 = new client.button().danger(`stop`, `✖`);

    const row1 = new ActionRowBuilder().addComponents(btn1, btn2, btn3, btn4);
    const row2 = new ActionRowBuilder().addComponents(btn5, btn6, btn7, btn8);
    const rows = [row1, row2];

    const m = await message.reply({
      embeds: [pages[page]],
      components: rows,
    });

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction
        .reply({
          embeds: [
            new client.embed().desc(
              `${emoji.no} Only **${message.author.tag}** can use this`
            ),
          ],
          ephemeral: true,
        })
        .catch(() => {});
      return false;
    };
    const collector = m?.createMessageComponentCollector({
      filter: filter,
      time: 60000,
      idle: 60000 / 2,
    });

    collector?.on("collect", async (c) => {
      if (!c.deferred) await c.deferUpdate();

      switch (c.customId) {
        case "home":
          page = 0;
          await m.edit({ embeds: [pages[page]] }).catch(() => {});
          break;

        case "stats":
          page = 1;
          await m.edit({ embeds: [pages[page]], files: [] }).catch(() => {});
          break;

        case "dev":
          page = 2;
          await m.edit({ embeds: [pages[page]], files: [] }).catch(() => {});
          break;

        case "honor":
          page = 3;
          await m.edit({ embeds: [pages[page]], files: [] }).catch(() => {});
          break;

        case "sponsor":
          page = 4;
          await m.edit({ embeds: [pages[page]], files: [] }).catch(() => {});
          break;

        case "yourData":
          page = 5;
          await m.edit({ embeds: [pages[page]], files: [] }).catch(() => {});
          break;

        case "affiliates":
          page = 6;
          await m.edit({ embeds: [pages[page]], files: [] }).catch(() => {});
          break;

        case "stop":
          await collector.stop();
          break;

        default:
          break;
      }
    });

    collector?.on("end", async (collected, reason) => {
      await m
        .edit({
          components: [],
        })
        .catch(() => {});
    });
  },
};
