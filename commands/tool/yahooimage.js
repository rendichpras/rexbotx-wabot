const axios = require("axios");

module.exports = {
    name: "yahooimage",
    aliases: ["yimage"],
    category: "tool",
    permissions: {
        coin: 10
    },
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${formatter.quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            formatter.quote(tools.msg.generateCmdExample(ctx.used, "rei ayanami"))
        );

        try {
            const apiUrl = tools.api.createUrl("archive", "/api/search/yahooimg", {
                query: input
            });
            const result = tools.cmd.getRandomElement((await axios.get(apiUrl)).data.result).url;

            return await ctx.reply({
                image: {
                    url: result
                },
                mimetype: tools.mime.lookup("jpeg"),
                caption: formatter.quote(`Kueri: ${input}`),
                footer: config.msg.footer,
                buttons: [{
                    buttonId: `${ctx.used.prefix + ctx.used.command} ${input}`,
                    buttonText: {
                        displayText: "Ambil Lagi"
                    }
                }]
            });
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, true);
        }
    }
};