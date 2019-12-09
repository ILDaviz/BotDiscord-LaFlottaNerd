exports.run = async (message, bot) => {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latenza server ${m.createdTimestamp - message.createdTimestamp}ms. Latenza API ${Math.round(bot.ping)}ms`);
};

exports.conf = {
    name: "Ping",
    fullcmd: "ping",
    alias: "ping",
    description: "Mostra il tempo di risposta del Bot.",
    timer: 0,
    tokenCost: 0,
    subClass: 's_utility',
    displayHelp: 1
};