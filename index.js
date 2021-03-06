const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const TOKEN = process.env.TOKEN;
const PREFIX = '+';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) msgCommand(message);
});

function msgCommand(message) {

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
        message.reply('there was an error trying to execute that command.\n\n```' + error + '```')
        .then(msg => {
            msg.delete({timeout:60000}) // Delete reply after 10 seconds.
        })
        .catch();
	}
};

client.login(TOKEN);