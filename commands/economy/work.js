const cooldowns = new Map();

module.exports = {
  name: "work",
  description: "Work a random job and earn coins (with failure chance)",
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
    const jobs = [
      { name: "Doctor", min: 50, max: 100, messages: ["You saved a patient’s life!", "You performed a successful surgery!"] },
      { name: "Engineer", min: 400, max: 90, messages: ["You fixed a server issue!", "You designed a new machine!"] },
      { name: "Chef", min: 30, max: 70, messages: ["You cooked a delicious meal!", "Your new recipe went viral!"] },
      { name: "Teacher", min: 20, max: 60, messages: ["You taught an amazing class!", "Your students aced the exam!"] },
      { name: "Janitor", min: 10, max: 50, messages: ["You cleaned the entire building!", "You found a lost wallet and returned it!"] },
      { name: "Firefighter", min: 40, max: 85, messages: ["You bravely extinguished a fire!", "You saved a family from a burning house!"] },
      { name: "Police Officer", min: 35, max: 80, messages: ["You caught a criminal!", "You helped a lost child find their parents!"] },
      { name: "Pilot", min: 60, max: 110, messages: ["You safely landed a plane!", "You flew passengers across the world!"] }
    ];

    const failureMessages = [
      "You got fired for being late too many times!",
      "You messed up at work and lost your job!",
      "You showed up to work but forgot what to do!",
      "Your boss caught you slacking off and didn't pay you!",
      "A bad customer review cost you your paycheck!",
      "You had a terrible day at work and earned nothing!"
    ];

    // Select a random job
    let job = jobs[Math.floor(Math.random() * jobs.length)];

    // Cooldown system (3 hours)
    const userId = message.author.id;
    const cooldown = cooldowns.get(userId);
    const now = Date.now();
    const workCooldown = 10800000; // 3 hours

    if (cooldown && now - cooldown < workCooldown) {
      let timeLeft = ((cooldown + workCooldown - now) / 60000).toFixed(1); // Convert to minutes
      return message.reply({
        embeds: [
          new client.embed().desc(
            `${emoji.no} **You're too tired to work again!**\n` +
            `⏳ Come back in **${(timeLeft / 60).toFixed(1)} hours**.`
          ),
        ],
      });
    }

    let failed = Math.random() < 0.45; // 45% chance to fail

    if (failed) {
      cooldowns.set(userId, now);
      return message.reply({
        embeds: [
          new client.embed().desc(
            `💼 **You tried to work as a ${job.name}, but failed!**\n` +
            `❌ **${failureMessages[Math.floor(Math.random() * failureMessages.length)]}**\n` +
            `⏳ **You can work again in 3 hours.**`
          ),
        ],
      });
    }

    let earnings = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min;
    let workMessage = job.messages[Math.floor(Math.random() * job.messages.length)];

    let coins = parseInt((await client.db.coins.get(userId)) || 0);
    coins += earnings;

    await client.db.coins.set(userId, coins);
    cooldowns.set(userId, now);

    await message.reply({
      embeds: [
        new client.embed().desc(
          `💼 **You worked as a ${job.name}!**\n` +
          `🛠️ ${workMessage}\n` +
          `${emoji.coin} **Earned:** \`${earnings}\` coins\n` +
          `💰 **Total Balance:** \`${coins}\`\n` +
          `⏳ **You can work again in 3 hours.**`
        ),
      ],
    });
  },
};
