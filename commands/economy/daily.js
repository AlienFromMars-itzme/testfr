const cooldowns = new Map(); // Store user cooldowns

module.exports = {
  name: "daily",
  description: "Claim your daily reward",
  category: "economy",
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
    const userId = message.author.id;
    const cooldown = cooldowns.get(userId);
    const now = Date.now();
    const dailyAmount = 15; // Change the reward amount as needed

    if (cooldown && now - cooldown < 86400000) {
      let timeLeft = ((cooldown + 86400000 - now) / 3600000).toFixed(1);
      return message.reply({
        embeds: [
          new client.embed().desc(
            `${emoji.no} You already claimed your daily reward! Try again in **${timeLeft} hours**.`
          ),
        ],
      });
    }

    let coins = parseInt((await client.db.coins.get(userId)) || 0);
    coins += dailyAmount;

    await client.db.coins.set(userId, coins);
    cooldowns.set(userId, now);

    await message.reply({
      embeds: [
        new client.embed().desc(
          `${emoji.yes} You claimed your daily reward!\n${emoji.coin} **+${dailyAmount}** coins\nTotal: \`${coins}\``
        ),
      ],
    });
  },
};
