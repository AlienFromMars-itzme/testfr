/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

module.exports = {
  name: "disconnect",
  run: async (client, name, players, moved) => {
    client.log(`Lavalink ${name}: Disconnected`, "warn");
  },
};
