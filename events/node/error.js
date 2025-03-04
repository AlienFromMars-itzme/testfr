/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

module.exports = {
  name: "error",
  run: async (client, name, error) => {
    client.log(`Lavalink "${name}" error ${error}`, "error");
  },
};
