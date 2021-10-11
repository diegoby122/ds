const config = require("./config.json")
const Discord = require('discord.js');
const { statSync } = require("fs");
const client = new Discord.Client();


function presence(){
    client.user.setPresence({
        status:"online",
        activity:{
            name:"A trabajar en el server",
            type:"PLAYING"
        }
    });
}

client.on('ready', () => {
    console.log(`Iniciando sesion como ${client.user.tag}`);
    presence();
});
Discord.Client.instance
let prefix = config.prefix;


client.on("guildMemberAdd", async member => {
    let canal = client.channels.cache.get('817560110665564160');
    if(!canal) return;
    var server = member.guild;
    const embed = new Discord.MessageEmbed()
    .setTitle("Bienvenidx")
    .setAuthor(member.user.username, member.user.displayAvatarURL({format: "png", dynamic: true}))
    .setThumbnail(member.user.displayAvatarURL({format: "png", dynamic: true}))
    .setDescription(`${member} bienvenido a nuestro server **${member.guild.name}**`)
    .setColor("BLUE")
    .setTimestamp()
  .addField("✗|ID del usuario", `**${member.id}**`)
  .addField("✗|OWNER", `**${server.owner.user.tag}**`) 
  .addField("✗|REGION", `**${server.region}**`)
  .addField("✗|Fecha de creacion", `**${server.joinedAt.toDateString()}**`)
  .addField("✗|Usuario", `**${server.memberCount}**`)
  .setImage(`https://cdn.discordapp.com/attachments/793149983050301450/817560333462929472/na.jpg`) 
  canal.send(embed)
  });

  client.on("guildMemberRemove", async member =>{
      let canal = client.channels.cache.get('817567569484709918')
      if(!canal) return;
      var server = member.guild;
      const embed = new Discord.MessageEmbed()
    .setTitle("Despedida")
    .setAuthor(member.user.username, member.user.displayAvatarURL({format: "png", dynamic: true}))
    .setThumbnail(member.user.displayAvatarURL({format: "png", dynamic: true}))
    .setDescription(`Bueno ${member} espero que la hayas pasado muy bien en tu pasada por el server, cuando quieras VUELVE!!!`)
    .setColor("BLUE")
    canal.send(embed)
      
});

  client.on('message', async message => {

    

    if(message.author.bot) return;
  
  
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
  
  
  if(message.content.startsWith("-kick")) {
  
  let user = message.mentions.users.first();
  let razon = args.slice(1).join(' ');
  
  var perms = message.member.hasPermission("KICK_MEMBERS");
  
  if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
  
  if (!razon) return message.channel.send('Escriba una razón, `-kick @username [razón]`');
  if (!message.guild.member(user).kickable) return message.reply('No puedo patear al usuario mencionado.');
       
  message.guild.member(user).kick(razon);
  let canal = client.channels.cache.get('817571470342750265');
    if(!canal) return;
    const embed = new Discord.MessageEmbed()
    .setTitle("<:warning:788940276998995999>|***KICK***")
    .addField("Kickeado por el STAFF",`**${message.author.tag}**`)
    .addField("Usuario kickeado",`**${user.tag}**`)
    .addField("Razon del Kick",`**${razon}**`)
    .setColor('RED')
    canal.send(embed);
  
  
  }
  
  
    
    if(message.content.startsWith("-ban")) {
  
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
      return message.channel.send('No tengo permisos para banear personas')
    }
    
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.channel.send('no tienes el permiso para banear personas')
    }
    
    let persona = message.mentions.members.first() || 
      message.guild.members.resolve(args[0])
    
    if (!persona) {
      return message.channel.send('Debe mencionar a alguien para banear')
    } else if(!persona.bannable){
      return message.channel.send('No puedo banear a esta persona')
    }else if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
      return message.channel.send('Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes banearlo')
    }
    
    var razon = args.slice(1).join(' ')
    if (!razon) {
      razon = 'Razon no especificada'
    }
    
   
    
    message.guild.members.ban(persona, {
      reason: razon
    })
      .catch(e => message.reply('Ocurrio un **error** desconocido'))
      .then(() => {
        let canal = client.channels.cache.get('817571470342750265');
    if(!canal) return;
    const embed = new Discord.MessageEmbed()
        .setTitle("<:warning:788940276998995999>|***Baneado***")
        .addField("Baneado por STAFF",`**${message.author.tag}**`)
        .addField("Usuario baneado",`**${persona.user.tag}**`)
        .addField("Razon del Ban",`**${razon}**`)
        .setColor('RED')
        canal.send(embed)
  
        message.channel.send(`El señor** ${persona.user.tag} se fue baneado**`)
  
        message.channel.send("https://cdn.discordapp.com/attachments/781320161327841290/788977507134865418/ban.gif")
      });
  
    }
  
      if(message.content.startsWith("-reporte")) {
  
        let persona = message.mentions.members.first() || 
        message.guild.members.resolve(args[0])
        let channel = client.channels.cache.get('817571763658555403'); 
   let user = message.author;
   let reporte = args.join(' ');
   if(!reporte) return message.channel.send(`:grey_exclamation: | **Envia un reporte o dudas**`)
   
   const embed = new Discord.MessageEmbed()
    .setTitle(':e_mail: | **Reporte**')
    .addField("Reporte enviado por",`**${message.author.tag}**`)
    
    .addField("Razon del reporte",`**${reporte}**`)
    .setColor("RED")
    
  
    channel.send(embed).then(x => {
      x.react('❌' )
      x.react('✅' )
      })
   message.channel.send(":white_check_mark: | **Reporte enviado**");
          
   
      }
  
      
  
  
      if(message.content.startsWith("-warn")) {
  
        let persona = message.mentions.members.first() || 
        message.guild.members.resolve(args[0])
        let channel = client.channels.cache.get('817571525313429534'); 
   let user = message.author;
   let reporte = args.join(' ');
   if(!reporte) return message.channel.send(`:grey_exclamation: | **Envia un reporte o dudas**`)
   
   const embed = new Discord.MessageEmbed()
    .setTitle('<:warning:788940276998995999>| **Warn**')
    .addField("Warn enviado por",`**${message.author.tag}**`)
    .addField("Usuario Warneado",`**${persona.user.tag}**`)
    .addField("Razon del Warn",`**${reporte}**`)
    .setColor("RED")
    
  
    channel.send(embed)
   message.channel.send("<:warning:788940276998995999>| **Warn enviado**"); 
  
      };
  
    if(message.content.startsWith("-reglas")) {
  
      
  
      let canal = client.channels.cache.get('782386577456234566');
        if(!canal) return;
        const embed = new Discord.MessageEmbed()
        .setTitle("```R E G L A S```")
        .addField("✗|", `- Respetar a los otros usuarios del servidor, (no se tolera el acoso).`)
        .addField("✗|", `-Evitar revelar información personal de otra persona o inclusive tuya (apellidos, número de teléfono, direcciones, etc.).`)
        .addField("✗|", `- No acosar y respetar las preferencias de mensajes.`)
        .addField("✗|", `-Las multicuentas están prohibidas**`)
        .addField("✗|", `-Prohibido hacer menciones masivas o mencionar roles del staff`)
        .addField("✗|", `- No acosar y respetar las preferencias de mensajes.`)
        .addField("✗|",`-Publicar contenido segun la tematica de cada canal`)
        .addField("✗|",`-El Spam está estrictamente prohibido.`)
        .addField("✗|",`-No enviar invitaciones de otros servidores.`)
        .addField("✗|",`-Nos quedamos fuera de todo tema hablado fuera del servidor.`)
        .addField("✗|",`-No usurpar y/o suplantar la identidad de otro usuario.`)
       
        .addField("✗|",`no tener conocimiento de las reglas no justifica su incumplimiento.`)
        .addField("```O R D E N  D E  S A N C I O N E S```",`**\u200b**`)
        .addField("✗|",`**3 warns=mute 5m**`)
        .addField("✗|",`**6 warns=mute 10m**`)
        .addField("✗|",`**12 warns=kick**`)
        .addField("✗|",`**17 warns=ban 1 dia**`)
        .addField("✗|",`**22 warns=banperma**`)
        .setColor("#FF0000")
        canal.send(embed)
    }
/////////////////////////vips//////////////////////////
    if(message.content.startsWith("-price")) {

        let canal = client.channels.cache.get('817802725911035904')
        if(!canal) return;
        const embed = new Discord.MessageEmbed()

        .setTitle("***Precios Cuentas Chetadas GTA!***")
        .addField('Vip plata',`**\u200b**`)
        .addField('Niveles',`**120-180**`)
        .addField('Dinero',`**300 millones**`)
        .addField('Unlocked',`**TODO DESBLOQUEADO**`)
        
        .addField('Price',`***9$ dollars***`)
        .setColor('BLUE')
        canal.send(embed)

    }

    if(message.content.startsWith("-pri")) {

      let canal = client.channels.cache.get('817802725911035904')
      if(!canal) return;
      const embed = new Discord.MessageEmbed()

      .setTitle("***Precios Cuentas Chetadas GTA!***")
      .addField('Vip oro',`**\u200b**`)
      .addField('Niveles',`**120-280**`)
      .addField('Dinero',`**600 millones**`)
      .addField('Unlocked',`**TODO DESBLOQUEADO**`)
      .addField('Oufits de mods',`**\u200b**`)
      .addField('Price',`***15$ dollars***`)
      .setColor('BLUE')
      canal.send(embed)

  }

  if(message.content.startsWith("-pr")) {

    let canal = client.channels.cache.get('817802725911035904')
    if(!canal) return;
    const embed = new Discord.MessageEmbed()

    .setTitle("***Precios Cuentas Chetadas GTA!***")
    .addField('Vip ++',`**\u200b**`)
    .addField('Niveles',`**120-350**`)
    .addField('Dinero',`** 1billon**`)
    .addField('Unlocked',`**TODO DESBLOQUEADO**`)
    .addField('Oufits de mods',`**\u200b**`)
    .addField('1 Coche de mods',`**\u200b**`)
   
    .addField('Price',`***20$ dollars***`)
    .setColor('BLUE')
    canal.send(embed)

}
    /////////////////////////recovery//////////////////

    if(message.content.startsWith("-reco")) {

      let canal = client.channels.cache.get('759204009294037052')
      if(!canal) return;
      const embed = new Discord.MessageEmbed()

      .setTitle("***Precios Recoverys GTA!***")
      
      .addField('Niveles',`**120-180**`)
      .addField('Dinero',`**100/300 millones**`)
      .addField('Unlocked',`**TODO DESBLOQUEADO**`)
      
      .addField('Price',`***5$ dollars***`)
      .setColor('BLUE')
      canal.send(embed)

  }

  if(message.content.startsWith("-rec1")) {

    let canal = client.channels.cache.get('759204009294037052')
    if(!canal) return;
    const embed = new Discord.MessageEmbed()

    .setTitle("***Precios Recoverys GTA!***")
    
    .addField('Niveles',`**120-300**`)
    .addField('Dinero',`**100/500 millones**`)
    .addField('Unlocked',`**TODO DESBLOQUEADO**`)
    .addField('2 Oufits de mods',`**\u200b**`)
    .addField('Price',`***10$ dollars***`)
    .setColor('BLUE')
    canal.send(embed)

  }

  if(message.content.startsWith("-re2")) {

    let canal = client.channels.cache.get('759204009294037052')
    if(!canal) return;
    const embed = new Discord.MessageEmbed()

    .setTitle("***Precios Recoverys GTA!***")
    
    .addField('Niveles',`**120-180**`)
    .addField('Dinero',`**100millones/ 1billon**`)
    .addField('Unlocked',`**TODO DESBLOQUEADO**`)
    .addField('4 Oufits de mods',`**\u200b**`)
    .addField('2 Coches de mods',`**\u200b**`)
    .addField('Price',`***15$ dollars***`)
    .setColor('BLUE')
    canal.send(embed)

  }
/////////////////////////ticket//////////////////////////

if(message.content.startsWith("-ticket")){
  message.channel.send("Reacciona para abrir un ticket").then(m =>{
    m.react("🖱")
    m.awaitReactions(async(reaction, user) =>{
      if(user.id === client.user.id) return;
      if(reaction.emoji.name === "🖱" ){ 
          await reaction.message.guild.members.cache.get(user.id).roles.add("759178785253097473")
    }
    if(reaction.emoji.name === "🖱"){
      reaction.users.remove(user);
      const roles = ["759178785253097473"]
      message.guild.channels.create("ticket").then((x) =>{
        const embed = new Discord.MessageEmbed()
        .setTitle('Ticket')
        .setDescription(`${user.tag} Ya te atendera un staff`)
        x.send(embed)
        x.setPosition(message.guild.channels.cache.size -10)
        x.createOverwrite(message.guild.id, {
          VIEW_CHANNEL:false 
        }).then(() =>{
          roles.forEach(id =>{
            x.createOverwrite(id, {
              VIEW_CHANNEL:true
            })
            
          })

        })
        message.reply("Tu ticket fue creado con exito <#"+x.id+">").then(m =>{
          m.delete({timeout: 4000})
        })

      })
    }


    })

  
    
  })
}

  
  });

  client.login(config.token);