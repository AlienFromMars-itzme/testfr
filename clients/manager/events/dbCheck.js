/** @format
 *
 * Manager By Painfuego
 * Version: 6.0.0-beta
 * © 2024 The Extremez
 */

const schedule = require("node-schedule");

module.exports = (client) => {
  client.once("ready", async () => {
    client.logger.log(`Ready! Logged in as ${client.user.tag}`, "ready");

    schedule.scheduleJob("0 0 * * *", async () => {
      let db = require(`@db/premium.js`);
      let keys = await db.keys;

      for (const key of keys) {
        let id = key.split("_")[1];
        const expiryTimestamp = db.get(`${key}`);
        const reminderTime = expiryTimestamp - 24 * 60 * 60 * 1000;

        if (Date.now() > expiryTimestamp) {
          await db.delete(`${key}`);
        }

        if (Date.now() < expiryTimestamp && Date.now() >= reminderTime) {
          client.users
            .fetch(id)
            .then(async (user) => {
              let desc =
                `${emoji.warn} Your premium for Realm Beats is expiring tomorrow !\n` +
                `Please visit **[Support Server](https://discord.gg/roroa)** for further details or use Realm Beats's command \`$buy\` to renew your subscription`;
              await client.send(user, desc);
            })
            .catch(() => {});
        }
      }
    });
  });
};
