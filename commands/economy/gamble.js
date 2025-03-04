module.exports = {
  name: "gamble",
  aliases: ["bet"],
  description: "Gamble your coins",
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
  usage: "<amount>",
  execute: async (client, message, args, emoji) => {
    let amount = parseInt(args[0]);
    let userCoins = parseInt((await client.db.coins.get(`${message.author.id}`)) || 0);

    if (isNaN(amount) || amount <= 0) {
      return message.reply({ embeds: [new client.embed().desc(`${emoji.no} Enter a valid bet amount!`)] });
    }

    if (amount > userCoins) {
      return message.reply({ embeds: [new client.embed().desc(`${emoji.no} You don’t have enough coins!`)] });
    }

    let win = Math.random() < 0.5; // 50% chance
    let newBalance = win ? userCoins + amount : userCoins - amount;

    await client.db.coins.set(`${message.author.id}`, newBalance);

    await message.reply({
      embeds: [
        new client.embed().desc(
          win
            ? `${emoji.yes} **You won!** 🎉\n${emoji.coin} New Balance: \`${newBalance}\``
            : `${emoji.no} **You lost!** 😭\n${emoji.coin} New Balance: \`${newBalance}\``
        ),
      ],
    });
  },
};
