/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

const { Connectors } = require("shoukaku");
const { Kazagumo, Plugins } = require("kazagumo");

module.exports = player = (client) => {
  client.manager = new Kazagumo(
    {
      plugins: [
        new (require("kazagumo-apple"))({
          countryCode: "us",
          imageWidth: 600,
          imageHeight: 900,
        }),
        new (require("kazagumo-filter"))(),
        new (require("kazagumo-deezer"))({
          playlistLimit: 20,
        }),
        new (require("kazagumo-spotify"))({
          searchLimit: 10,
          albumPageLimit: 1,
          searchMarket: "IN",
          playlistPageLimit: 2,
          clientId: client.config.spotify.id,
          clientSecret: client.config.spotify.secret,
        }),
        new Plugins.PlayerMoved(client),
      ],
      send: (guildId, payload, important) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
      },
      defaultSearchEngine: "Spotify",
      reconnectTries: Infinity, // Number of retry attempts
      reconnectInterval: 5000, // Retry interval in milliseconds (5 seconds)
    },
    new Connectors.DiscordJS(client),
    [
      {
        name: "Public Lavalink v4 NonSSL",
        url: "lava-v4.ajieblogs.eu.org:80",
        auth: "https://dsc.gg/ajidevserver",
        secure: false,
      },
    ]
  );

  // Handle Lavalink node disconnection and retry logic
  client.manager.shoukaku.on("disconnect", (name, reason) => {
    console.warn(`[Lavalink] Node ${name} disconnected: ${reason}`);

    let attempts = 0;
    const reconnect = setInterval(() => {
      if (attempts >= 5) {
        console.error("[Lavalink] Maximum reconnect attempts reached.");
        clearInterval(reconnect);
        return;
      }

      console.log(`[Lavalink] Attempting to reconnect... (${attempts + 1}/5)`);
      client.manager.shoukaku.reconnect(name);
      attempts++;
    }, 5000);
  });

  client.manager.shoukaku.on("ready", (name) => {
    console.log(`[Lavalink] Node ${name} is now connected.`);
  });

  client.manager.shoukaku.on("error", (name, error) => {
    console.error(`[Lavalink] Node ${name} encountered an error:`, error);
  });
};
