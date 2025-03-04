module.exports = {
  name: "give",
  aliases: ["pay"],
  description: "Give coins to another user",
  usage: "<mention> <amount>",
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
    let target = message.mentions.users.first();
    let amount = parseInt(args[1]);

    if (!target || isNaN(amount) || amount <= 0) {
      return message.reply({ embeds: [new client.embed().desc(`${emoji.no} Invalid user or amount!`)] });
    }

    let senderCoins = parseInt((await client.db.coins.get(`${message.author.id}`)) || 0);
    let receiverCoins = parseInt((await client.db.coins.get(`${target.id}`)) || 0);

    if (amount > senderCoins) {
      return message.reply({ embeds: [new client.embed().desc(`${emoji.no} Not enough coins!`)] });
    }

    senderCoins -= amount;
    receiverCoins += amount;

    await client.db.coins.set(`${message.author.id}`, senderCoins);
    await client.db.coins.set(`${target.id}`, receiverCoins);

    await message.reply({
      embeds: [
        new client.embed().desc(
          `${emoji.yes} You sent \`${amount}\` coins to ${target}.\n${emoji.coin} Your new balance: \`${senderCoins}\``
        ),
      ],
    });
  },
};
