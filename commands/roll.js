module.exports = {
    name: 'roll',
    description: 'Roll dice',
    execute(message, args) {
        
        console.log(args);

        if (args.length == 0) post(message, '1d6', roll(1, 6));
        else if (args.length == 1) {
            let match = args[0].match(/(\d*)d(\d*)/);
            if (match[1] && match[2]) {
                post(message, args[0], roll(match[1], match[2]));
            }
            else {
                message.reply("Something went wrong. Be sure to enter a valid argument. For example: `+roll 2d6`");
            }
        }
        else {
            message.reply("The `+roll` command currently only takes one argument. For example: `+roll 2d6`");
        }

        message.delete(); // Delete the user's message.

    }
};

function roll(amount, sides) {

    rolls = [];

    if (amount > 100) amount = 100;

    for (let i = 0; i < amount; i++) {
        rolls.push(Math.floor((Math.random() * sides) + 1));
    }

    return rolls;

}

function post(message, arg, rolls) {
    message.reply(`\`${arg}\` rolls: \`${rolls.join(', ')}\``);
}