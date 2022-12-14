const { MessageEmbed, Interaction } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Util",
    description: "Check the bot Latency.",
    args: false,
    usage: "",
    permission: [],
    aliases: ["ping", "pong", "latency"],

    run: async (message, args, client, prefix) => {

        let msg = await message.channel.send({
            embeds: [
              new MessageEmbed()
                .setDescription("🏓 | Fetching ping...")
                .setColor("#6F8FAF"),
            ],
          });

    let zap = "⚡";
    let green = "🟢";
    let red = "🔴";
    let yellow = "🟡";

    var botState = zap;
    var apiState = zap;

    let apiPing = client.ws.ping;
    let botPing = Math.floor(msg.createdAt - message.createdAt);

    if (apiPing >= 50 && apiPing < 250) {
      apiState = green;
    } else if (apiPing >= 250 && apiPing < 450) {
      apiState = yellow;
    } else if (apiPing >= 450) {
      apiState = red;
    }

    if (botPing >= 50 && botPing < 600) {
      botState = green;
    } else if (botPing >= 600 && botPing < 800) {
      botState = yellow;
    } else if (botPing >= 800) {
      botState = red;
    }

    msg.delete();
    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle("🏓 | Pong!")
          .addField(
            "API Latency",
            `\`\`\`yml\n${apiState} | ${apiPing}ms\`\`\``,
            true
          )
          .addField(
            "Bot Latency",
            `\`\`\`yml\n${botState} | ${botPing}ms\`\`\``,
            true
          )
          .setColor(client.config.embedColor)
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.avatarURL(),
          }),
      ],
    });
  }
}
