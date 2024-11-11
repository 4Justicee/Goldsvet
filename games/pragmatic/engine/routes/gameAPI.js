require("rootpath")();
let MD5 = require("md5.js");
const axios = require("axios");
const machine = require("engine/machine");
const replayer = require("engine/replayer");
const promo = require("engine/promo");
const generator = require("engine/generator");
const ASSET_HOST = process.env.ASSET_HOST || "http://onlinecasino0001.com:8989";
let mini_lobby_games = require("./Json/mini_lobby_games");
let game243 = [];

async function gameRun(req, res) {
    var gameCode = req.query.gameSymbol;
    var token = req.query.mgckey;
    if(!gameCode || !token) {
        return res.render("game/maintenancing.ejs");
    }
    const { Game } = req.app.db;
    const game = await Game.findOne({ where: { g_name: gameCode } });
    if (!game) {
        return res.render("game/maintenancing.ejs");
    }

    res.render(`gs2c/index`, {
        title: gameCode,
        gameName: gameCode,
        resourceName: ASSET_HOST,
        serviceApi: (process.env.GAME_HOST || "http://pragmatic.kro.kr:8940") + "/gs2c/v3/gameService",
        gameHost: process.env.GAME_HOST || "http://pragmatic.kro.kr:8940",
        replayHost: process.env.REPLAY_HOST || "http://pragmatic.kro.kr:8940",
        token: token,
        lang: req.query.lang || "ko",
        currency: "KRW"
    });
}

async function miniLobbyGameRun(req, res) {
    const gameCode = req.query.gameSymbol;
    const token = req.query.mgckey;
    const { Game, User } = req.app.db;
    const user = await User.findOne({ where: { token: token } });
    if (user.agentCode == "justslot") {
        const agentCode = user.userCode.split("#JS#")[0];
        const userCode = user.userCode.split("#JS#")[1];
        const url = "http://justslot.kro.kr:2422/api";
        const jsonBody = {
            method: "game_launch",
            agent_code: agentCode,
            agent_token: "token",
            user_code: userCode,
            provider_code: "PRAGMATIC_OLD",
            game_code: gameCode,
            rtp: user.targetRtp
        };
        try {
            const ret = await axios.post(url, jsonBody);
            if (ret.data.status == 1) {
                return res.redirect(ret.data.launch_url);
            } else {
                return res.render("game/maintenancing.ejs");
            }
        } catch (error) {
            console.log(error.message);
            return res.render("game/maintenancing.ejs");
        }
    } else {
        const game = await Game.findOne({ where: { gameCode: gameCode } });
        if (game.status == 1) {
            gameRun(req, res);
        } else {
            return res.render("game/maintenancing.ejs");
        }
    }
}

async function gameDemo(req, res) {
    var gameCode = req.query.game;
    var token = req.query.token;

    const { Game } = req.app.db;
    const game = await Game.findOne({ where: { gameCode } });
    if (!game) {
        return res.render("game/maintenancing.ejs");
    }

    res.render(`gs2c/index`, {
        title: gameCode,
        gameName: gameCode,
        resourceName: ASSET_HOST,
        serviceApi: (process.env.GAME_HOST || "http://pragmatic.kro.kr:8940") + "/gs2c/v3/gameService",
        gameHost: process.env.REAL_GAME_HOST || "http://pragmatic.kro.kr:8940",
        replayHost: process.env.REPLAY_HOST || "http://pragmatic.kro.kr:8940",
        token: token,
        lang: "ko",
        currency: "KRW"
    });
}

async function gameList(req, res) {
    
}

async function gamesWithPattern(req, res) {
    const { Game } = req.app.db;
    let results = await Game.findAll();
    let games = results.map(item => ({
        id: item.id,
        banner: item.banner,
        status: item.status,
        gameCode: item.gameCode,
        gameName: item.gameName,
        enName: item.enName,
        memo: item.memo
    }));

    var dto = {};
    dto.draw = Number(req.body.draw);
    dto.recordsTotal = games.length;
    dto.recordsFiltered = games.length;
    dto.data = games;
    return res.json(dto);
}

function gameMaintenance(req, res) {
    res.render(`game/maintenancing.ejs`);
}

async function changeGameStatus(req, res) {
    const { id, status } = req.body;
    const { Game } = req.app.db;
    const game = await Game.findOne({ where: { id: id } });
    const retObj = await game.update({ status: Number(status) });
    res.json({
        status: !!retObj,
        msg: !!retObj ? "      " : "      "
    });
}

async function gameHistory(req, res) {
    const { Player, History } = req.app.db;
    const { mgckey: token, symbol: gameSymbol, recordId } = req.query;
    let mainCode = getMainCode(gameSymbol);
    const lang = "ko";

    const player = await Player.findOne({ where: { token } });
    if (!player) {
        res.send("                     .");
    }

    if (game243.indexOf(gameSymbol) != -1) {
        let histData = await History.findAll({
            where: { agentCode: player.agentCode, userCode: player.userCode, gameCode: gameSymbol },
            limit: 100,
            order: [["createdAt", "DESC"]]
        });

        res.render("gs2c/lastGameHistory243", { assetHost: ASSET_HOST, mgckey: token, lang: lang, records: histData, symbol: gameSymbol, mainCode });
    } else {
        res.render("gs2c/lastGameHistory", { assetHost: ASSET_HOST, mgckey: token, lang: lang, recordId: recordId, mainCode });
    }
}

function generalGameHistory(req, res) {
    let mgckey = req.query["mgckey"];
    let gameSymbol = req.query["gameSymbol"];
    res.json({
        language: "en",
        jurisdiction: "99",
        jurisdictionRequirements: [],
        brandRequirements: []
    });
}

async function detailGameHistory(req, res) {
    const { Player, History } = req.app.db;
    const { mgckey: token, symbol: gameSymbol, playSessionId: recordId } = req.query;
    let lang = "ko";

    const player = await Player.findOne({ where: { token } });
    if (!player) {
        res.send("                     .");
    }

    const histData = await History.findOne({
        where: { id: recordId, agentCode: player.agentCode, userCode: player.userCode, gameCode: gameSymbol }
    });

    let data = JSON.parse(histData.data);
    res.render("gs2c/gameHistoryDetailsPage", { assetHost: ASSET_HOST, mgckey: token, symbol: gameSymbol, lang: lang, data: data.response, gameName: gameSymbol });
}

async function lastItemsHistory(req, res) {
    const { Player, History } = req.app.db;
    const { token, symbol: gameSymbol, recordId } = req.query;

    //                      
    if (recordId != null) {
        //logger.info('############### rcodeId ' + recordId);
    }

    const player = await Player.findOne({ where: { token } });
    if (!player) {
        res.send("                     .");
    }
    let histData = await History.findAll({
        where: { agentCode: player.agentCode, userCode: player.userCode, gameCode: gameSymbol },
        limit: 100,
        order: [["createdAt", "DESC"]]
    });

    let resData = [];
    resData = histData.map(item => ({
        roundId: item.roundID,
        dateTime: item.createdAt,
        bet: item.bet,
        win: item.win,
        balance: item.balance,
        roundDetails: null,
        currency: "KRW",
        currencySymbol: "   ",
        hash: "485cc8fe0b9a7a0ed599eba9c64665f2"
    }));

    res.json(resData);
}

async function childrenHistory(req, res) {
    const { Player, History } = req.app.db;
    const { token, symbol: gameSymbol, id } = req.query;

    const player = await Player.findOne({ where: { token } });
    if (!player) {
        res.send("                     .");
    }

    const histData = await History.findOne({
        where: { roundID: id, agentCode: player.agentCode, userCode: player.userCode, gameCode: gameSymbol }
    });
    let resData = [];
    let childData = JSON.parse(histData.dataValues.data);
    delete childData["request"]["UID"];
    delete childData["request"]["mgckey"];
    delete childData["request"]["l"];

    childData["roundId"] = histData["id"];
    childData["currency"] = "KRW";
    childData["currencySymbol"] = "   ";
    childData["configHash"] = "485cc8fe0b9a7a0ed599eba9c64665f2";
    resData.push(childData);
    res.json(resData);
}

function getMainCode(gameSymbol) {
    const mainCode = {
        "7559f21d": [
            "vs243mwarrior",
            "vs20doghouse",
            "vs40pirate",
            "vs20rhino",
            "vs25pandagold",
            "vs4096bufking",
            "vs25pyramid",
            "vs5ultrab",
            "vs5ultra",
            "vs25jokerking",
            "vs10returndead",
            "vs10madame",
            "vs15diamond",
            "vs25aztecking",
            "vs10bbbonanza",
            "vs10cowgold",
            "vs25mustang",
            "vs25hotfiesta",
            "vs243dancingpar",
            "vs576treasures",
            "vs20hburnhs",
            "vs20emptybank",
            "vs20midas",
            "vs20olympgate",
            "vswayslight",
            "vs20fruitparty",
            "vswaysdogs",
            "vs50juicyfr",
            "vs25pandatemple",
            "vs40wildwest",
            "vs20sbxmas",
            "vs10fruity2",
            "vs5drhs",
            "vs12bbb",
            "vs20tweethouse",
            "vswayssamurai",
            "vs50pixie",
            "vs10floatdrg",
            "vs20fruitsw",
            "vs20rhinoluxe",
            "vs432congocash",
            "vswaysmadame",
            "vs1024temuj",
            "vs40pirgold",
            "vs25mmouse",
            "vs10threestar",
            "vs243lionsgold",
            "vs10egyptcls",
            "vs25davinci",
            "vs7776secrets",
            "vs25wolfgold",
            "vs50safariking",
            "vs25peking",
            "vs25asgard",
            "vs25vegas",
            "vs75empress",
            "vs25scarabqueen",
            "vs20starlight",
            "vs10bookoftut",
            "vs5drmystery",
            "vs20eightdragons",
            "vs1024lionsd",
            "vs25rio",
            "vs10nudgeit",
            "vs10bxmasbnza",
            "vs20santawonder",
            "vs20terrorv",
            "vs10bblpop",
            "vs20bermuda",
            "vs10starpirate",
            "vs20daydead",
            "vs20wildboost",
            "vswayshammthor",
            "vs243lions",
            "vs5super7",
            "vs1masterjoker",
            "vs20kraken",
            "vs10firestrike",
            "vs243fortune",
            "vs4096mystery",
            "vs20aladdinsorc",
            "vs25chilli",
            "vs20leprexmas",
            "vs243caishien",
            "vs5joker",
            "vs25gladiator",
            "vs25goldpig",
            "vs25goldrush",
            "vs25kingdoms",
            "vs20hercpeg",
            "vs20honey",
            "vs20chicken",
            "vs20wildpix",
            "vs15fairytale",
            "vs20santa",
            "vs10vampwolf",
            "vs50aladdin",
            "vs5trdragons",
            "vs25newyear",
            "vs40frrainbow",
            "vs20godiva",
            "vs9madmonkey",
            "vs9chen",
            "vs5hotburn",
            "vs20leprechaun",
            "vs7monkeys",
            "vs18mashang",
            "vs5spjoker",
            "vs20egypttrs",
            "vs9hotroll",
            "vs243crystalcave",
            "vs75bronco",
            "vs9aztecgemsdx",
            "vs25walker",
            "vs20goldfever",
            "vs25bkofkngdm",
            "vs1024dtiger",
            "vs20xmascarol",
            "vs10mayangods",
            "vs25gldox",
            "vs10eyestorm",
            "vs10amm",
            "vswaysyumyum",
            "vs10luckcharm",
            "vswaysaztecking",
            "vs20phoenixf",
            "vs576hokkwolf",
            "vs20trsbox",
            "vs243chargebull",
            "vs20pbonanza",
            "vs243empcaishen",
            "vs25tigeryear",
            "vs20amuleteg",
            "vswaysxjuicy",
            "vs20smugcove",
            "vswayscryscav",
            "vs5aztecgems_jp",
            "vs40spartaking",
            "vswaysrhino",
            "vs20candvil",
            "vs7pigs",
            "vs20bonzgold",
            "vs20mustanggld2",
            "vs243discolady",
            "vs10bookazteck",
            "vs40voodoo",
            "vswaysbankbonz"
        ],
        "56f51456": ["vs10runes", "vs20fparty2"],
        "6c8ff85f": ["vs25wolfgold", "vswayshive"]
    };

    let retCode = null;
    for (const code in mainCode) {
        let gameSymbols = mainCode[code];
        for (const symbol of gameSymbols) {
            if (symbol === gameSymbol) {
                retCode = code;
                break;
            }
        }
        if (retCode) break;
    }

    return retCode || "7559f21d";
}

module.exports = app => {
    app.get("/game_start.do", gameRun);
    app.get("/game_demo.do", gameDemo);
    app.get("/game_list.do", gameList);
    app.get("/game_maintenance.do", gameMaintenance);
    app.post("/games_with_pattern.do", gamesWithPattern);
    app.post("/game_change_status", changeGameStatus);

    //                                                    API(models/jsons/generate.js                                     )
    app.post("/pattern_gen.do", generator.OnRequest_Generate);

    app.post("/gs2c/v3/gameService", machine.OnRequest_GameService);

    app.get("/isAlive", (req, res) => {
        res.json({
            status: "success"
        });
    });
    app.get("/gs2c/minilobby/games", (req, res) => {
        res.json(mini_lobby_games);
    });
    app.get("/gs2c/minilobby/start", miniLobbyGameRun);
    app.get("/gs2c/reloadBalance.do", async (req, res) => {
        let token = req.query.mgckey;
        let user = await req.app.db.User.findOne({ where: { token } });
        let resObj = {};

        if (!user) {
            resObj = {
                action: "error",
                msg: "Token not Verified"
            };
        } else {
            resObj = {
                balance_bonus: "0.00",
                balance: user.balance,
                balance_cash: user.balance,
                stime: new Date().getTime()
            };
        }

        res.send(Util.Result4Client(resObj));
    });
    app.post("/gs2c/stats.do", (req, res) => res.send('{"error":0,"description":"OK"}'));
    app.post("/gs2c/saveSettings.do", async (req, res) => {
        const token = req.body.mgckey;
        const method = req.body.method;

        try {
            const player = await app.db.Player.findOne({ where: { token } });

            res.send(method ? player.settings : req.body.settings);

            if (!method) {
                player.Update({ settings: req.body.settings });
            }
        } catch (e) {
            // console.error(e.stack);
        }
    });

    app.get("/gs2c/lastGameHistory.do", gameHistory);
    app.get("/gs2c/gameHistoryDetails", detailGameHistory);
    app.get("/gs2c/api/history/v2/play-session/last-items", lastItemsHistory);
    app.get("/gs2c/api/history/v2/settings/general", generalGameHistory);
    app.get("/gs2c/api/history/v2/action/children", childrenHistory);
    app.get("/gs2c/api/history/historyPlaySession.aspx", lastItemsHistory);
    app.get("/gs2c/api/history/historySetting.aspx", generalGameHistory);
    app.get("/gs2c/api/history/historyAction.aspx", childrenHistory);

    app.get("/gs2c/promo/active", promo.Promo_Active);
    app.get("/gs2c/promo/race/details", promo.Promo_Race_Details);
    app.get("/gs2c/promo/race/prizes", promo.Promo_Race_Prizes);
    app.post("/gs2c/promo/race/winners", promo.Promo_Race_Winners);
    app.post("/gs2c/promo/race/player/choice/OPTIN", (req, res) => res.send('{"success":1,"description":"OK"}'));
    app.post("/gs2c/promo/tournament/player/choice/OPTIN", (req, res) => res.send('{"success":1,"description":"OK"}'));
    app.get("/gs2c/promo/tournament/details", promo.Promo_Tournament_Details);
    app.get("/gs2c/promo/tournament/v2/leaderboard", promo.Promo_Tournament_v2_leaderboard);
    app.get("/gs2c/promo/tournament/v3/leaderboard", promo.Promo_Tournament_v3_leaderboard);
    app.get("/gs2c/promo/tournament/player/choice/OPTIN", (req, res) => res.send('{"error":0,"description":"OK"}'));
    app.get("/gs2c/promo/tournament/scores", (req, res) => res.send('{"error":0,"description":"OK"}'));
    app.get("/gs2c/promo/frb/available", promo.Frb_Available);

    app.get("/ReplayService/api/top/winnings/list", replayer.WinningList);
    app.get("/ReplayService/api/top/share/link", replayer.ShareLink);
    app.get("/ReplayService/api/replay/data", replayer.ReplayData);
    app.get("/ReplayService/replayGame.do", replayer.DoReplay);
    app.get("/w7ZsIhI9oQ/:url", replayer.SharedReplay);

    app.get("/verify/api/session", async (req, res) => {
        const { User, Player, History, Game } = req.app.db;
        const user = await User.findOne({ where: { token: req.query.mgckey } });
        const history = await History.findOne({ where: { agentCode: user.agentCode, userCode: user.userCode }, order: [["id", "DESC"]], limit: 1 });
        let result = {
            status: "SUCCESS",
            balance: user.balance,
            currency: "KRW",
            currencySymbol: "   ",
            rounds: [],
            settings: {
                displayRoundsEnabled: true
            }
        };

        if (history) {
            const game = await Game.findOne({ where: { gameCode: history.gameCode } });
            result.rounds = [{ id: history.roundID, name: game.enName, symbol: history.gameCode, date: new Date(history.createdAt).getTime(), betAmount: history.bet }];
        }

        res.json(result);
    });
    app.get("/gs2c/session/verify", async (req, res) => {
        const { User } = req.app.db;
        const user = await User.findOne({ where: { token: req.query.mgckey } });
        if (user.userCode.includes("smgzun002003_GS_")) {
            return res.send(`<html><body style="background: black;"></body></html>`);
        } else {
            return res.redirect(`http://pragmaticeplay.com/verify?mgckey=${req.query.mgckey}&sid=244`);
        }
    });
    app.get("/verify", (req, res) => res.render("verify/index"));
};
