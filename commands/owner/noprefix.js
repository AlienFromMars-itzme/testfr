module.exports = {
  name: "noprefix",
  aliases: ["nop"],
  cooldown: "",
  category: "owner",
  usage: "<mention> <time>",
  description: "Add np",
  args: true,
  vote: false,
  new: false,
  admin: true,
  owner: true,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
   
      
      let id = message.mentions.members.first()?.user.id ||
      args[1]?.replace(/[^0-9]/g, '')

    let [user] = await Promise.all([
      id ? client.users.fetch(id, { force: true }).catch((err) => {}) : null
    ])
    
    if (!user) {
      return await message.reply({
        embeds: [
          new client.embed().desc(`${emoji.no} **Invalid/No User provided**`),
        ],
      });
    }
      
      let subcmd = args[0].toLowerCase()
      let time = args[2] ?? null

      
      let np = await client.db.np.get(user.id) ?? null;
      
      if (subcmd === `add`) {
        if (np) {
            return await  message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.no} **User already has noprefix**`)
              ]
          });
        }
            let dur = time ? require("ms")(time) : null
            await client.db.np.set(user.id, dur ? Date.now() + dur : true)
            return message.channel.send({embeds: [ new client.embed().desc(`**Added** \`${user.tag}\` to my list\n${dur ? `**Ends**: <t:${Math.round((Date.now() + dur) / 1000)}:f>` : ""}`).setAuthor({name: `Manage Mico's NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
          }
      
      if (subcmd === `remove`) {
        if (!np) {
            return await  message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.no} **User doesn't have noprefix**`)
              ]
          });
        } else {
          await client.db.np.delete(user.id)
         
      return message.channel.send({embeds: [ new client.embed().desc(`**Removed** \`${user.tag}\` from my list`).setAuthor({name: `Manage Mico's NoPrefix`, iconURL: client.user.displayAvatarURL()})]})
        }
      }
    
      
  }
}