const axios = require("axios");
const { ActionRowBuilder } = require("discord.js");


module.exports = checkVote = async(client, message, user) => {
    
    let [premiumUser, premiumGuild] = await Promise.all([
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.guild.id}`),
    ]);
    
    if (premiumUser && premiumUser > Date.now()) return true;
    if (premiumGuild && premiumGuild > Date.now()) return true;
    
    
    let res = await axios.get(
        `https://top.gg/api/bots/${client.user.id}/check?userId=${user.id}/`, {
            method: 'GET',
            headers: {
                Authorization: client.config.topgg.key
            }
        });
    
    let data = res.data;
    if (res.status == 200 && data.voted) return true;
    
    await message.reply({
        embeds: [
            new client.embed()
            .setDescription(`**${client.emoji.warn} You need to [vote](https://top.gg/bot/${client.user.id}/vote/) for me to use this command!**`)
        ],
        components: [
            new ActionRowBuilder().addComponents(
               new client.button().link("Vote", `https://top.gg/bot/${client.user.id}/vote/`)
            )
        ]
    }).then(async (msg) => {
        setTimeout(async () => {
            await msg.delete().catch(() => null);
        }, 8000);
    })

    return false;
    
    
    
    
}