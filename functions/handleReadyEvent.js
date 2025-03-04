/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

module.exports = async (client) => {
  await client.user.setPresence({
    activities: [
      {
        name: `you | ${client.prefix}help`,
        type: require("discord.js").ActivityType.Listening,
        //state: `| ${client.prefix}help`
        //url: "https://twitch.tv/discord",
      },
    ],
    status: "online",
  });

  let mcount = 0;
  let gcount = client.guilds.cache.size;
  client.guilds.cache.forEach((g) => {
    mcount += g.memberCount;
  });

  let eventsSize = {};
  let commandsSize = {};
  commandsSize.slash = {};
  [
    eventsSize.client,
    eventsSize.node,
    eventsSize.player,
    eventsSize.custom,
    commandsSize.message,
  ] = await Promise.all([
    await require("@loaders/clientEvents.js")(client),
    await require("@loaders/nodeEvents")(client),
    await require("@loaders/playerEvents")(client),
    await require("@loaders/customEvents.js")(client),
    await require("@loaders/commands.js")(client),
  ]);

  client.invite = {
    required: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37080065&scope=bot`,
    admin: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`,
  };

  client.endEmbed = new client.embed()
    .desc(
      `**Enjoying Music with me ?**\n` +
        `If yes, Consider [Join Our Server](https://discord.gg/roroa)`,
    )
    .thumb(client.user.displayAvatarURL())
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: client.user.username,
    })
    .setFooter({ text: "Powered by The RealmX" });

  client.log(
    `Loaded ` +
      ` Client: ${eventsSize.client} ` +
      ` Node: ${eventsSize.node} ` +
      ` Player: ${eventsSize.player} ` +
      ` Custom: ${eventsSize.custom} `,
    "event",
  );
  client.log(`Loaded ` + ` Message: ${commandsSize.message} `, "cmd");
  client.log(`Ready for ${gcount} Servers | ${mcount} Users`, "ready");
};
