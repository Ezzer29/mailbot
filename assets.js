const Discord = require('discord.js');
const conf = require('./conf.json');

module.exports = {
    joinGuild: function joinGuild(guild, icon) { 
        return new Discord.MessageEmbed()
            .setColor('#e1e8ed')
            .setTitle('MailBot')
            .setDescription('A simple mailbot made using nodemailer and discord.js')
            .setThumbnail('https://cdn.discordapp.com/attachments/762650678245589013/802100104672051212/mail.png')
            .addFields(
                { name: 'Prefix', value: '```' + conf.prefix + '\n ```', inline: true },
                { name: 'Author', value: '```' + conf.authorTag + '\n ```', inline: true },
                { name: 'Info Server', value: '```' + conf.srvInv + '```', inline: true }
            )
            .setTimestamp()
            .setFooter(guild, icon);
    },
    help: function help(guild, icon) { 
        return new Discord.MessageEmbed()
            .setColor('#e1e8ed')
            .setTitle('MailBot')
            .setDescription('Help Message')
            .setThumbnail('https://cdn.discordapp.com/attachments/762650678245589013/802100104672051212/mail.png')
            .addFields(
                { name: 'Prefix', value: '```' + conf.prefix + '```', inline: true },
                { name: 'Info Server', value: '```' + conf.srvInv + '```', inline: true },
                { name: 'Commands', value: '```' + conf.prefix + 'mail <EXAMPLE@EXAMPLE.COM> <EMAIL CONTENT>```', inline: false }
            )
            .setTimestamp()
            .setFooter(guild, icon);
    }
}