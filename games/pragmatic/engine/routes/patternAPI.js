require('rootpath')();
let MD5 = require("md5.js");
const errcode = require("err-code");
const Op = Sequelize.Op;

const PatternServer = {
    checkAvailable: async (req, res, next) => {
        const { agentCode, userCode, gameCode } = req.body;
        const { Agent, User, Player } = req.app.db;

        req.user = await User.findOne({ where: { agentCode: agentCode, userCode: userCode } });
        req.agent = await Agent.findOne({ where: { code: agentCode } });

        req.player = await Player.findOne({ where: { agentCode, userCode, gameCode } });

        if (!req.player || !req.user || !req.agent) {
            return next(errcode(new Error("not found"), { status: 404 }));
        }

        req.player.Init(req.user, {});
        next();
    },

    regenPattern: async (req, res) => {
        const cmd = Number(req.body.cmd);
        const player = req.player;

        logger.info(`\n================================== ${cmd == 1 ? "         " : "               "}                           ==================================\n`);
        try {
            res.json({
                status: 1,
                msg: "PATTERN_REGEN_SUCCESS",
                patterns: cmd == 1 ? await player.RegenPatterns(req.user) : await player.RegenBuyPatterns(req.user),
            });
        } catch (e) {
            console.log(e);
            player.logHist(`${cmd == 1 ? "         " : "               "}                          `);

            return res.json({
                status: 0,
                msg: "PATTERN_REGEN_FAILED"
            })
        }
    },

    generateCall: async (req, res) => {
        logger.info("\n==================================                         ==================================\n");
        const player = req.player;
        const param = req.body;

        let call = player.machine.SpinForJackpot(player.virtualBet / player.machine.lineCount, player.virtualBet, Number(param.call_money), true, "RANDOM");
        call.totalBet = player.virtualBet;
        player.logHist(`\t                   :\t${call.win},          :\t${call.totalBet}`);
        res.json({ call: call });
    },

    aliveServer: async (req, res) => {
        return res.json({ status: true });
    }
};

module.exports = app => {
    app.post('/api/regen_pattern', PatternServer.checkAvailable, PatternServer.regenPattern);
    app.post('/api/call_generate', PatternServer.checkAvailable, PatternServer.generateCall);
    app.get('/api/alive', PatternServer.aliveServer);
};