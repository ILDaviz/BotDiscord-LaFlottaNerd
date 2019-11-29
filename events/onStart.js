const bot = require('../bot.js').default;

bot.on("ready", () => {
    //bot.user.setActivity(`^start se vuoi sapere come usarmi ;D`);
    bot.user.setActivity(`!start`);
});