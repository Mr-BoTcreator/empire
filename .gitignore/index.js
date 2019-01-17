const Discord = require('discord.js');



const client = new Discord.Client();


var prefix = "+";


client.login(process.env.TOKEN1);



      client.on('ready' , () => {  
setInterval(function() {
client.user.setActivity("Bot crée par Mr-BoT");
client.user.setActivity("Le flood " , { type: "WATCHING"} );       
},5000);
console.log("Bot Ready !");
});

client.on('guildMemberAdd', member => {
      member.guild.channels.find("name" , "arrivals").send(`Salut  ${member} :wave:

Bienvenue dans L'Empire  :tada:

 On vous invite à visiter le salon #auto-roles pour choisir vos rôle selon vos hôtels de ville ainsi choisir vos langues avec la reaction :flag_fr: si vous êtes Francais , ou :flag_lr: si vous êtes Anglais , et après , lire notre règlement juste ici #règlement ! :crossed_swords: 

Bon jeu à toi ! 
------------------------------------------------------------
Hi

Welcome to The L'Empire  :tada:

We invite you to visit the salon #auto-roles to choose your role according to your city halls so choose your languages ​​with the reaction :flag_fr: if you are French, or :flag_lr: if you are English, and after , reading our rules right here #settlement  :crossed_swords:

Good game for you !

    
     `);
        
});

client.on('message' , message =>{
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()  
               .setColor('#D710A8')    
               .setTitle('Commande du bot des Modérateur certaines sont réservés aux Adminstrateur')
               .setDescription('Ces commandes ne peuvent etre utiliser que par les Regulator')
               .addField("+warn [@tag] [raison] :" , "Donner un avertissement à un utilisateur {L'avertissement s'enregistre sur la base de données}")
               .addField("+clear [nombre de messages] : " , "Effacer des messages")
               .addField("+unmute [@tag] :" ,"Le mebre parle")
               .addField("+mute [@tag] :" , "rend le membre muet dans le salon choisi")
               .addField("+seewarns [@tag] :" , "Vous permet de savoir le nombre d'avetissement d'un utilisateur")
               .addField("+deletewarns [@tag] [numéro de l'avertissement] :" ,"Supprimer un avertissement de la base de données")
               .addField("+kick :" , "Exclure un membre .  ") 
               .addField("+ban :" , "Bannir un membre .  ") 
               .addField("+help :" , "Affiche les commandes du bot  ")
               .addField("+membres :" , "Te permet de savoir le nombre de membres") 
               .setFooter('Toute personnes ayant essaye de utiliser ces commandes sera sanctionne par un mute')
               message.channel.send(help_embed);       
        console.log("Commande help demandée !");
     
};
      if (message.content === 'prefixe') {
         message.reply('Mon prefixe est [+]')
            console.log("prefixe demandé")
       };
   if (message.content ===prefix + "membres"){
         var info_embed = new Discord.RichEmbed()
              .setColor('#AC1A32')
              .addField("Nous sommes actuellement " , message.guild.members.size)
              message.channel.send(info_embed);
          console.log("Nombres de membres demande");  
   }

   if(message.content.startsWith(prefix + "kick")) {
       if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande." );
       
       if(message.mentions.users.size === 0) {
              return message.channel.send("Vous devez mentionner un utilisateur")
       }
       var kick = message.guild.member(message.mentions.users.first());
       if(!kick) {
              return message.channel.send("l'utilisateur mentionne n'existe pas")
       }
       if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
              return message.channel.send("je ne peux pas l'exclure")
       }
       kick.kick().then(member =>{
              message.channel.send(`${member.user.username} a bien été exclu par ${message.author.username} `)
              
      
             });
}
if(message.content.startsWith(prefix + "ban")) {
       if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
       
       if(message.mentions.users.size === 0) {
              return message.channel.send("Vous devez mentionner un utilisateur")
       }
       var ban = message.guild.member(message.mentions.users.first());
       if(!ban) {
              return message.channel.send("l'utilisateur mentionne n'existe pas")
       }
       if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
              return message.channel.send("je ne peux pas le bannir")
       }
       ban.ban().then(member =>{
              message.channel.send(`${member.user.username} a bien été bani par ${message.author.username} `)
              
      
             });
}
 if(message.content.startsWith(prefix + "clear")) {
       if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
        
        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Veuillez précisez le nombre je vous prie.")
        message.channel.bulkDelete(args[0]).then(() => {
               message.channel.send(`${args[0]} messages supprimées avec succés.` );
        });
       }
       if(message.content.startsWith(prefix + "mute")) {
              if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
       
              if(message.mentions.users.size === 0) {
                  return message.channel.send("Aucun utilisateur n'a été mentionné  ");
              }
       
              var mute = message.guild.member(message.mentions.users.first());
              if(!mute) {
                  return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
              }
       
              if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je n'ai pas la permission !");
              message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
                  message.channel.send(`${mute.user.username} est mute !`);
              })
          };     
          if(message.content.startsWith(prefix + "unmute")) {
              if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
       
              if(message.mentions.users.size === 0) {
                  return message.channel.send('Vous devez mentionner un utilisateur !');
              }
       
              var mute = message.guild.member(message.mentions.users.first());
              if(!mute) {
                  return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
              }
       
              if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je n'ai pas la permission !");
              message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
                  message.channel.send(`${mute.user.username} peut maintenant parler  !`);
              })
          }; 
          var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Tu n'as pas les permissions pour exécuter cette commande.");
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send(" Vous n'avez mentionnée aucun utilisateur");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send('** | '+mentionned.tag+' a été averti**');
 
message.mentions.users.first().send(`Vous avez été averti  par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Tu n'as pas les permissions pour exécuter cette commande.");
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a recu aucun warn ");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a recu aucun warn ");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns ");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");

 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Tu n'as pas les permissions pour exécuter cette commande.");
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send(" Ce warn n'existe pas.");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé.`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** ont été enlevé .`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("Tu n'as pas les permissions pour exécuter cette commande.");
 
    }
 
  };
 
  

    
       
  
 
});
