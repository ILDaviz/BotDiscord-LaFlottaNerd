const bot = require('../bot.js').default;

bot.on('error', (err) => {
//TODO: Log errors to a file in the future
console.log(err);
});