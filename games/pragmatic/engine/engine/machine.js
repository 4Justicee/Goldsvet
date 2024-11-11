require("rootpath")();
const axios = require("axios");
axios.defaults.timeout = 5000;

module.exports.OnRequest_GameService = async (req, res) => {
    var param = req.body;
    var action = req.body.action;

    const { user, game, player } = await checkAvailable(req, res);
    if (!user || !game || !player) {
        return;
    } 
    switch (action) {
        case "doInit": player.HandleInit(param); break;
        case "doSpin":
            if (!player.machine) {
                return HandleError("Please Login!", res);
            }
            await player.HandleSpin(param, user);
            await SaveHistory(req, user, player);
            break;
        case "doCollect": player.HandleCollect(param); break;
        case "doBonus": player.HandleBonus(param); break;
        case "doCollectBonus": player.HandleCollectBonus(param); break;
        case "doMysteryScatter": player.HandleMystery(param); break;
        case "doFSOption": player.HandleFSOption(param); break;
        case "doGambleOption": player.HandleGambleOption(param); break; //                                        (         )
        case "doGamble": player.HandleGamble(param); break; //                                       (         )
        default: break;
    }

    await HandleBalance(param, player, user);

    var result = Util.Result4Client(player.currentApi);
    await SaveReplay(req.body, player, req.app.db.Replay);

    await player.Save(param);
    return res.send(result);
}

async function HandleBalance(param, player, user) {
    let action = param.action;

    if (action == "doSpin" || action == "doCollect" || action == "doCollectBonus") {
        let debit = 0, credit = 0;

        if (action == "doSpin") {
            debit = player.totalBet;
            credit = 0;
        } else {
            debit = 0;
            credit = player.balance - player.machine.prevBalance;
        }

        if (debit > 0 || credit > 0) {
            player.setBalance(debit, credit);

            var logStr = `(${player.curIndex}    - ${player.userCode}, ${player.gameCode}, ${user.balance})`;

            if (global.logConfig.show_index) {
                logStr += `, (   :${player.curIndex - player.lastJackpotIndex}/${player.nextJackpot},    :${player.callHistId})`;
            }
            if (global.logConfig.show_pattern) {
            }
            if (global.logConfig.show_rtp) {
                logStr += `, (${Math.floor(credit)}/${debit}, player:${player.totalCredit}/${player.totalDebit}, ${player.realRtp}%,    :${user.totalCredit}/${user.totalDebit}, RTP:${user.realRtp}/${user.targetRtp})`;
            }
            if (player.logInfo) {
                logStr += `, ${player.logInfo.type}: (${player.logInfo.range})`
            }
            if (player.machine.gameSort != "BASE" && player.machine.currentGame == "BASE") {
                logStr += `,              `;
            }
            player.logHist(logStr, 1);

            await user.setBalance(debit, credit, player.callHistId);
           
        }
    }   
}

async function SaveReplay(param, player, Replay) {
    if (param.action == "doInit" || param.action == "doFSOption") {
        return;
    }

    delete param.mgckey;

    let lastPattern = { ...player.lastPattern };
    if (lastPattern.na == "fso") {
        delete lastPattern.fs_opt_mask;
        delete lastPattern.fs_opt;
        lastPattern.na = "s";
    }

    player.replayLogList.push({
        cr: Buffer.from(Util.Result4Client(param), "utf8").toString("base64"),
        sr: Buffer.from(Util.Result4Client(lastPattern), "utf8").toString("base64")
    });

    let gameMode = !player.machine.currentGame ? player.machine.gameSort : player.machine.currentGame;

    if (gameMode == "BASE" && player.machine.winMoney == 0 && player.replayLogList.length == 1) {
        player.replayLogList = [];
    }

    if (param.action == "doCollect" || param.action == "doCollectBonus") {
        const totalWin = player.balance - player.machine.prevBalance;
        if (totalWin >= player.virtualBet * 2) {
            Replay.create({
                agentCode: player.agentCode,
                userCode: player.userCode,
                gameCode: player.gameCode,
                roundID: Date.now(),
                bet: player.virtualBet,
                win: totalWin,
                rtp: Math.floor((totalWin / player.virtualBet) * 100) / 100,
                playedDate: Math.floor(Date.now() / 1000) * 1000,
                data: JSON.stringify(player.replayLogList)
            });
        }
        player.replayLogList = [];
    }

    await player.Update({
        replayLogList: JSON.stringify(player.replayLogList)
    });
}

async function SaveHistory(req, user, player) {
    const { History } = req.app.db;
    const reqObj = req.body;
    let lastPattern = player.lastPattern;
    for (const key in lastPattern) {
        if (lastPattern.hasOwnProperty(key)) {
            const elem = lastPattern[key];
            if (Array.isArray(elem)) {
                lastPattern[key] = elem.toString();
            }
        }
    }

    if (reqObj.action === 'doSpin') {
        let apiObj = {
            request: reqObj,
            response: lastPattern
        };
        let histObj = {
            agentCode: player.agentCode,
            userCode: player.userCode,
            gameCode: player.gameCode,
            roundID: Date.now(),
            bet: player.virtualBet,
            win: player.machine.winMoney,
            balance: user.balance,
            data: JSON.stringify(apiObj)
        };
        await History.create(histObj);
    }
}

function HandleError(msg, res) {
    var obj = {
        action: "error",
        msg: msg
    }

    var result = Util.Result4Client(obj);
    return res.send(result);
}

async function checkAvailable(req, res) {
    const param = req.body;
    const gameCode = param.symbol;
    const token = param.mgckey;

    const { Game, User, Player } = req.app.db;
    const game = await Game.findOne({ where: { g_name:gameCode} });
    if (!game) { return HandleError("GAME_NOT_ALLOWED", res); }

    const user = await User.findOne({ where: { token } });
    if (!user) { return HandleError("INVALID_TOKEN", res); }

    let redis_str = await EUtil.getFromRedis(req.app, `player_${user.login}`);
    let redisObj = JSON.parse(redis_str ? redis_str : "{}");
    let player = redisObj[gameCode] ? Player.build(redisObj[gameCode]) : null;

    if (!(player instanceof Player)) {
        [player, created] = await Player.findOrCreate({ where: { gameCode, userCode: user.email } });
        if (created) {
            Object.assign(player, { nextJackpot: Math.floor(Math.random() * 20) * 7 + 60 });
        }
    }

    Object.assign(player, { token, connected: 1 });

    if (player.totalCredit >= player.totalDebit + 1000000) {
        logger.info(`[                             ]              `);
        logger.info(player.toJSON());
        logger.info(`[                             ]           `);
        return HandleError("GAME_CREDIT_ERROR", res);
    }

    await player.Init(user, param);
    const totalBet = player.SetTotalBet(param);

    if (req.body.action != "doInit" && player.machine.currentGame == "BASE" && player.machine.tumbleStatus != "TUMBLE") {
        if (Number(totalBet) > user.balance) {
            logger.info(`                             :         :${user.login}       :${user.balance},       : ${totalBet} `);
            if (user.lang == "en") {
                return HandleError("Please charge your cash to bet.", res);
            }
            return HandleError("                                                                                    .", res);
        }        
    }

    player.balance = user.balance;
    return { user, game, player };
}