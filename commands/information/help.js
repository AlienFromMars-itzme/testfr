const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's help menu",
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
    let categories = await client.categories.filter((c) => c != "owner");
    categories = categories.sort((b, a) => b.length - a.length);
    let cat = categories
      .map(
        (c) =>
          `> **${emoji[c]} • ${
            c.charAt(0).toUpperCase() + c.slice(1)
          } Commands**\n`,
      )
      .join("");

    const helpLinks = `## [Help Panel](https://discord.gg/roroa) `;

    const embed = new client.embed()
      
      .setDescription(`**Hey There It's <@${message.author.id}> Dive to world of music. A music bot with all advanced features of reconnection and different search engines. Providing you the qulaity music for your server.\n• My default prefix for the server is: \`$\`\n•For More info about me: \`$info\`** \n\n ${helpLinks}\n\n${cat}`) // Help links are now above the categories
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: `Command Asked By ${message.author.name} | Team RealmX`,
      });

    let arr = [];
    for (let category of categories) {
      let cmnds = client.commands.filter((c) => c.category == category);
      arr.push(cmnds.map((c) => `\`${c.name}\``));
    }

    let allCmds = categories.map(
      (cat, i) =>
        `${emoji[cat]} **[${cat.charAt(0).toUpperCase() + cat.slice(1)}](${
          client.support
        })\n ${arr[i].join(", ")}**`,
    );
    let desc = allCmds.join("\n\n");

    const all = new client.embed()
      .setDescription(desc)
      .setFooter({
        text: `Developed By Team RealmXㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
      });

    let menu = new StringSelectMenuBuilder()
      .setCustomId("menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("Select category to view commands")
      .addOptions([
        {
          label: "Go to homepage",
          value: "home",
          emoji: `${emoji.home}`,
        },
      ]);

    const selectMenu = new ActionRowBuilder().addComponents(menu);

    categories.forEach((category) => {
      menu.addOptions({
        label:
          category.charAt(0).toUpperCase() + category.slice(1) + ` commands`,
        value: category,
        emoji: `${emoji[category]}`,
      });
    });

    menu.addOptions([
      {
        label: "Show all commands",
        value: "all",
        emoji: `${emoji.all}`,
      },
    ]);

    const m = await message.reply({
      embeds: [embed],
      components: [selectMenu],
    });

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction.message.edit({
        components: [selectMenu],
      });
      await interaction
        .reply({
          embeds: [
            new client.embed().setDescription(
              `${emoji.no} Only **${message.author.tag}** can use this`,
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

    collector?.on("collect", async (interaction) => {
      if (!interaction.deferred) await interaction.deferUpdate();

      const category = interaction.values[0];
      switch (category) {
        case "home":
          await m.edit({
            embeds: [embed],
          }).catch(() => {});
          break;

        case "all":
          await m.edit({
            embeds: [all],
          }).catch(() => {});
          break;

        default:
          await m.edit({
            embeds: [
              new client.embed()
                .setDescription(await genCommandList(client, category))
                .setTitle(
                  `${
                    category.charAt(0).toUpperCase() + category.slice(1)
                  } - related Commands`,
                )
                .setFooter({
                  text: `Team RealmX!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ`,
                }),
            ],
          }).catch(() => {});
          break;
      }
    });

    collector?.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};
