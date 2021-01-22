const Discord = require('discord.js');
const client = new Discord.Client();
const nodemailer = require('nodemailer');
const conf = require('./conf.json');
const fs = require('fs');
const assets = require('./assets');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: conf.email,
      pass: conf.password
    }
});

client.on('ready', () => {
  console.log('MailBot is online!');
});

client.on("guildCreate", guild => {
  guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0).send(assets.joinGuild(guild.name, guild.iconURL() + '?size=1024'));
})

client.on('message', message => {

  if (!message.content.toLowerCase().startsWith(conf.prefix) || message.author.bot ) return;
  let args = message.content.slice(conf.prefix.length).trim().split(' ');
  let command = args.shift().toLocaleLowerCase();

  if ( command == 'help' || command == 'h' ) {
    if ( args[0] == undefined ) {
      message.channel.send(assets.help(message.guild.name, message.guild.iconURL() + '?size=1024'));
    } else {
      if ( args[0] == 'mail' || args[0] == 'm' ) { message.channel.send('```' + conf.prefix + 'mail <EXAMPLE@EXAMPLE.COM> <EMAIL CONTENT>```'); }
      else { message.channel.send('**Error**: `' + args[0] + '` command unknown, use `' + conf.prefix + 'help` to see all commands!'); }
    }
  } else if ( command == 'mail' || command == 'm' ) {
      if ( args[0] == undefined || args[1] == undefined ) {
          message.channel.send('**Index Error**, please use: `' + conf.prefix + 'mail <EXAMPLE@EXAMPLE.COM> <EMAIL CONTENT>`!');
      } else {
          let to = args.shift();
          let cont = args.join(' ');

        transporter.sendMail({ from: conf.email, to: to, subject: message.author.tag + ' | ' + message.guild.name, text: cont }, function(error, info){
            if (error) {
              console.log(error);
              message.react('🟥');
              message.channel.send('**Error**: Invalid Email!');
            } else {
              console.log('Email sent: ' + info.response);
              message.react('📨');
            }
        });

      }
  } else {

  }
});

client.login(conf.token);