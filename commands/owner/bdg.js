/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "bdg",
  aliases: [],
  cooldown: "",
  category: "owner",
  usage: "<mention> <badge>",
  description: "Add badge",
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
    const id = message.mentions.users.first()?.id || args[1] || null;
    const validUser = await client.users.fetch(id).catch(() => null);
      
    let badges = ["dev", "owner", "earlysupporter", "mspec", "npre", "beta", "friend", "partner", "staff", "vip", "contributor", "all"]

    if (!validUser) {
      return await message.reply({
        embeds: [
          new client.embed().desc(`${emoji.no} **Invalid/No User provided**`),
        ],
      });
    }
      
      let userbdg = await client.db.badges.get(`${client.user.id}_${validUser.id}`) ?? []
    
      if (!args[2] || !badges.includes(args[2]))
          return await message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.no} **Invalid/No badges provided**\n${client.emoji.bell} *Valid types: ${badges.join(", ")}*`)
              ]
          })
      
     if (args[0].toLowerCase() == "add") {
         if (args[2] == "all")
             await client.db.badges.set(`${client.user.id}_${validUser.id}`, badges.filter(bg => bg !== "all"))
            
            return await message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.yes} **Successfully added all badges to user.**`)
              ]
            })
         
        if (userbdg.includes(args[2])) {
            return await  message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.no} **User already has this badge**`)
              ]
          });
        }
            
          userbdg.push(args[2])
            await client.db.badges.set(`${client.user.id}_${validUser.id}`, userbdg)
            
            return await message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.yes} **Successfully added ${args[2]} badge to user.**`)
              ]
            })
     }
      
      
    if (args[0].toLowerCase() == "remove") {
        
        if (args[2] == "all")
            await client.db.badges.set(`${client.user.id}_${validUser.id}`, [])
        return await message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.yes} **Successfully removed all badges from user.**`)
                  ]
        })
            
        if (!userbdg.includes(args[2])) {
            return await  message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.no} **User doen't have this badge**`)
              ]
          });
        }
            
          userbdg = userbdg.filter((x) => x !== args[2])
            await client.db.badges.set(`${client.user.id}_${validUser.id}`, userbdg)
        return await message.reply({
              embeds: [
                  new client.embed()
                  .desc(`${emoji.yes} **Successfully removed ${args[2]} badge from user.**`)
              ]
            })
     }
      
      
      
  }
}