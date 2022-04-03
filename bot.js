require('dotenv').config();
import fetch from 'node-fetch';

const Discord = new Discord.Client()
const { Client, Intents } = require('discord.js');
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function getQuote() {
    return fetch("https://zenquotes.io/api/random")
    .then(res => {
    return res.json()
    })
    .then(data => {
    return data[0]['q'] + "-" + data[0]['a']
    })
}

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag!}');
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.channel.send('pong!')
    }
});

// quotes feature
client.on('message', msg => {
    if (msg.author.bot) return
    if (msg.content === '$inspire') {
        getQuote().then(quote => msg.channel.send(quote))
    }
})


client.login(process.env.TOKEN);