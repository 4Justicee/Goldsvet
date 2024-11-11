require('rootpath')();

exports.WinningList = async (req, res) => {
    const { Player, Replay } = req.app.db;
    const token = req.query.mgckey;
    const player = await Player.findOne({ where: { token }, order: [["updatedAt", "DESC"]], limit: 1 });
    const replays = (await Replay.findAll({ where: { agentCode: player.agentCode, userCode: player.userCode, gameCode: player.gameCode } })).map(e => {
        e.base_bet = e.bet;
        e.sharedLink = "";
        return e;
    });

    res.json({
        "error": 0,
        "description": "OK",
        "topList": replays
    });
}

exports.ShareLink = async function (req, res) {
    const roundID = req.query.roundID;
    logger.info(`              roundID = ${roundID}`, 'ALL');
    const replay = await req.app.db.Replay.findOne({ where: { roundID } })
    const sharedLink = Date.now();
    replay.update({ sharedLink });
    var result = { "error": 0, "description": "OK", "sharedLink": `${process.env.REPLAY_HOST}/w7ZsIhI9oQ/${sharedLink}` };
    res.json(result);
}

exports.ReplayData = async function (req, res) {
    const roundID = req.query.roundID;
    const replay = await req.app.db.Replay.findOne({ where: { roundID } });

    res.json({
        "error": 0,
        "description": "OK",
        "init": require('routes/Json/replay_init.json')[replay.gameCode],
        "log": JSON.parse(replay.data).map(e => {
            return {
                cr: Buffer.from(e.cr, 'base64').toString('utf8'),
                sr: Buffer.from(e.sr, 'base64').toString('utf8')
            }
        })
    });
}

exports.DoReplay = async (req, res) => {
    logger.info("replayGame.do       ", 'ALL');
    const roundID = req.query.roundID;
    const replay = await req.app.db.Replay.findOne({ where: { roundID } });

    res.render('gs2c/replay', {
        gameName: replay.gameCode,
        resourceName: process.env.ASSET_HOST || "http://onlinecasino0001.com:8989",
        envID: req.query.envID,
        roundID: req.query.roundID,
        replayHost: process.env.REPLAY_HOST,
        token: req.query.token,
        lang: "ko",
        currency: "KRW"
    });
}

exports.SharedReplay = async (req, res) => {
    const sharedLink = req.params.url;
    const replay = await req.app.db.Replay.findOne({ where: { sharedLink } });

    res.render('gs2c/replay', {
        gameName: replay.gameCode,
        resourceName: process.env.ASSET_HOST || "http://onlinecasino0001.com:8989",
        envID: "13",
        roundID: replay.roundID,
        replayHost: process.env.REPLAY_HOST,
        token: "token",
        lang: "ko",
        currency: "KRW"
    });
}