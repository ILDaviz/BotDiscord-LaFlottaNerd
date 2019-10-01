/*
*   Bot Yuki per Discord versione 0.0
*   @Davidgalet
*   www.davidev.it
*   yuki.js
*
*/

// Opzioni e sett
const Discord   = require("discord.js");
const schedule  = require('node-schedule');
const config    = require("./config_yuki.json");
const fs        = require('fs');
const sql_data = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot_discord_2'
};

// Database sync-mysql
var MySql = require('sync-mysql');
var connection = new MySql(sql_data);

// Database async-mysql
var mysql = require('mysql');
var connection_async = mysql.createConnection(sql_data);

// Avvio del bot LadyIsabel
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Bot Yuki online.`); 
    client.user.setActivity(`pls help per aiuto! <3`);
});
// Stampa errori
client.on('error', (err) => {
    console.log(err.message);
});

function log(note){
  var embed = new Discord.RichEmbed()
  .setTitle('-- LOG --')
  .setColor(0xFFFF)
  .setDescription(note)
  client.channels.get(config.channel_log).send({embed});
}

//Message bot compreso
client.on("message", async message => {
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'help') {
    var embed = new Discord.RichEmbed()
    .setAuthor('Yuki')
    .setTitle('Io amo i tuoi file <3')
    .setColor(0xFFFF)
    .setDescription('Io sono il filemanager della gilda. Gestirò tutti i file salvati dagli utenti con i comandi sotto stanti.')
    .addField("pls upload <id cartella> <nome file>", 'Carica un file in una cartella o nella root**')
    .addField("pls getfolders ", 'Mostra tutte le cartelle')
    .addField("pls getfolderfile <id cartella> ", 'Mostra contenuto di una cartella')
    .addField("pls addfolder ", 'Crea una nuova cartella')
    .addField("pls delfolder <nome cartella> ", 'Elimina una cartella')
    .addField("pls delfile <nome file> ", 'Elimina un file in particolare')
    .setFooter('Quando scrivi un comadno non serve scrivere i siboli < e > servono solo a farti capire come strutturare il comando. **Clicca sul simbolo + in seguito seleziona il file e aggiungi il comando in "aggiungi un commento"')
    message.channel.send({embed});
  }

  if(command === "upload") {
    if(message.attachments.size <= 0) {
        message.delete(); 
    } else {
        const url_file = message.attachments.first().url
        var id_folder = args[0];
        var name_file = args.slice(1).join(' ');
        var name_file1 = name_file.replace(/'/g, "");
        var name_file2 = name_file1.replace(/"/g, '');
        addFile(name_file2,url_file,id_folder,1);
        var embed = new Discord.RichEmbed().setTitle('File caricato.').setColor(0xFFFF);
        message.channel.send({embed});
        log('Aggiunta un file **'+name_file2+'** nella cartella **'+id_folder+'** utente <@' + message.author.id + '>');
    }
  }

  if(command === "getfolders") {
    getFolders(function(result){
        if (result.length > 0 ) {
            var embed = new Discord.RichEmbed().setColor(0xFFFF);
            var text = '';
            for (var i = result.length - 1; i >= 0; i--) {
               var id_folder = result[i].id_folder;
               var foldername = result[i].foldername;
               text += "**Riferimento cartella: "+id_folder+"** | Nome Cartella: **"+foldername+"**\n";
               text += "--------\n";
            }
            embed.setDescription(text)
            message.channel.send({embed});
        } else {
            var embed = new Discord.RichEmbed().setTitle('Mi dispiace ma non ci sono cartelle..').setColor(0xFFFF);
            message.channel.send({embed});
        }
    });
  }

  if(command === "getfolderfile") {
    var id_folder = args[0];
    getFolder(id_folder,function(result){
      if (result.length > 0 ) {
            var embed = new Discord.RichEmbed().setColor(0xFFFF);
            var text = '';
            for (var i = result.length - 1; i >= 0; i--) {
               var url = result[i].url;
               var name_file = result[i].name_file;
               text += '['+name_file+']('+url+')'+"\n";
               text += "--------\n";
            }
            embed.setDescription(text)
            message.channel.send({embed});
        } else {
            var embed = new Discord.RichEmbed().setTitle('Mi dispiace ma non ci sono file nella cartella o la cartella non esiste').setColor(0xFFFF);
            message.channel.send({embed});
        }
    });
  }


  if(command === "addfolder") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var foldername = args.slice(0).join(' ');
    var foldername1 = foldername.replace(/'/g, "");
    var foldername2 = foldername1.replace(/"/g, '');
    addFolder(foldername2);
    var embed = new Discord.RichEmbed().setTitle('La cartella '+foldername2+' è stata creata').setColor(0xFFFF);
    message.channel.send({embed});
    log('Aggiunta la cartella **'+foldername2+'** utente <@' + message.author.id + '>');
  }

  if(command === "delfolder") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var foldername = args.slice(0).join(' ');
    var foldername1 = foldername.replace(/'/g, "");
    var foldername2 = foldername1.replace(/"/g, '');
    delfolder(foldername2);
    var embed = new Discord.RichEmbed().setTitle('La cartella '+foldername2+' è stata eliminata').setColor(0xFFFF);
    message.channel.send({embed});
    log('La cartella **'+foldername2+'** è stata eliminata utente <@' + message.author.id + '>');
  }

  if(command === "delfile") {
    if(!message.member.roles.some(r=>["Admin", "Moderatori", "Developer"].includes(r.name)) )
        return message.reply("Mi dispiace, ma non hai le autorizzazioni per usare questo comando.");
    var name_file = args.slice(0).join(' ');
    var name_file1 = name_file.replace(/'/g, "");
    var name_file2 = name_file1.replace(/"/g, '');
    delfile(name_file2);
    var embed = new Discord.RichEmbed().setTitle('Il file: '+name_file2+' è stato eliminato').setColor(0xFFFF);
    message.channel.send({embed});
    log('Il file: **'+name_file2+'** è stato eliminato utente <@' + message.author.id + '>');
  }

});

client.on('raw', event => {
  //console.log('\nRaw event data:\n', event);
});

client.login(config.token);

function addFile(name_file,url,id_folder,status){
  connection_async.query("INSERT INTO file_manager(name_file,url,id_folder,status) VALUES ('"+name_file+"','"+url+"','"+id_folder+"','"+status+"')", function (err, result, fields) {
  if (err) throw err;
  });
}

function addFolder(foldername){
  connection_async.query("INSERT INTO folder_manager(foldername) VALUES ('"+foldername+"')", function (err, result, fields) {
  if (err) throw err;
  });
}

function getFolders(callback){
  connection_async.query("SELECT * FROM folder_manager ORDER BY id_folder DESC", function (err, result, fields) {
  if (err) throw err;
  var data = Object.values(JSON.parse(JSON.stringify(result)));
  return callback(data);
  });
}

function getFolder(id_folder,callback){
  connection_async.query("SELECT * FROM file_manager WHERE id_folder = '"+id_folder+"' ORDER BY id_file DESC", function (err, result, fields) {
  if (err) throw err;
  var data = Object.values(JSON.parse(JSON.stringify(result)));
  return callback(data);
  });
}

function delfolder(foldername){
  connection_async.query("DELETE FROM `folder_manager` WHERE foldername = '"+foldername+"'", function (err, result, fields) {
  if (err) throw err;
  });
}

function delfile(name_file){
  connection_async.query("DELETE FROM `file_manager` WHERE name_file = '"+name_file+"'", function (err, result, fields) {
  if (err) throw err;
  });
}
