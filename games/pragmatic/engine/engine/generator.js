//                         index.js, pragmatic.js     02      /models/jsons                                                     .
require("rootpath")();
const fs = require("fs");
const queryString = require("query-string");
const JSON5 = require("json5");
const { execSync } = require("child_process");
let token = "JackSon,Andrew@pattern_generation";
const multiValues = [1500, 3000, 5000];
// const multiValues = [11000];
const dataPatternCount = 12;
const bpl = 10;
$gameUrl = "http://www.aesop@hickory.net/gameService";
$patternList = [];
initObj = {};
$purchaseKey = "none"; // pur, fsp       
$isPurchase = false; //                                              

const isEmpty = value => value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);
const rand = function (min, max) {
    var result = min + Math.floor(Math.random() * (max - min));
    return result;
};
const max = function (num1, num2) {
    return num1 < num2 ? num2 : num1;
}

module.exports.OnRequest_Generate = async (req, res) => {
    const { User, Player } = req.app.db;
    let { gameCode, patCount } = req.body;
    let startTime = Date.now();

    patCount = Number(patCount) >= 10 ? Number(patCount) : dataPatternCount;
    //                                                              .
    await req.app.db.Player.destroy({ where: { agentCode: "lobby", userCode: "genUser" } });
    await req.app.redis_client.set(`player_lobby__genUser`, "{}");

    const [user] = await User.findOrCreate({ where: { agentCode: "lobby", userCode: "genUser" } });
    await user.update({ token: token, balance: 1000000, realRtp: 0, targetRtp: 80, totalDebit: 0, totalCredit: 0 });

    let [player, created] = await Player.findOrCreate({ where: { gameCode, userCode: user.userCode, agentCode: user.agentCode } });
    player.gameMode = 1;
    player.token = token;
    //                 Init                     gen                                                .
    player.Init({ balance: user.balance, totalCredit: 0, totalDebit: 0 }, { c: bpl }, 1);
    const totalBet = bpl * player.machine.lineCount;

    if (player.machine.buyMulti) {
        $isPurchase = true;
    } else {
        $isPurchase = false;
    }

    player.fsStack.push(player.machine.SpinForBaseGen(bpl, totalBet, totalBet));
    player.viewStack.push(player.machine.SpinForBaseGen(bpl, totalBet, totalBet));

    for (let i = 0; i < multiValues.length; ++i) {
        const maxLimit = totalBet * multiValues[i];
        //              1500                                                      defBottomLimit     bottomLimit                                                            .
        let defBottomLimit = maxLimit * 0.9;
        let bottomLimitArr = [0];
        
        for (let j = 0; j < patCount; ++j) {
            let pattern = {};
            let calcCount = 0;
            let bottomLimit = max(Math.max.apply(null, bottomLimitArr), defBottomLimit);
            
            while (true) {
                if ($isPurchase) {
                    pattern = player.machine.SpinForBuyBonus(bpl, totalBet);
                } else {
                    pattern = player.machine.SpinForJackpot(bpl, totalBet, maxLimit, false, "RANDOM");
                }

                ++calcCount;
                if (calcCount >= 100 && calcCount % 200 == 0) {
                    bottomLimit > 0 ? bottomLimit -= defBottomLimit * 0.1 : 0;
                    console.log("      :", multiValues[i], "   \tbottomLimit:", bottomLimit / totalBet, "   \tdefBottomLimit:", defBottomLimit / totalBet);
                }
                if (pattern.win <= maxLimit && pattern.win >= bottomLimit) {
                    bottomLimitArr.push(max(bottomLimit, Math.floor(pattern.win / totalBet) * totalBet));
                    console.log(`       ${i + 1} - ${j + 1}:\tbottomLimit:`, bottomLimit / totalBet, "   \tdefBottomLimit:", defBottomLimit / totalBet, "   \t      :", pattern.view.viewList ? pattern.view.viewList.length : pattern.view.length ? pattern.view.length : null, `\t${pattern.win / totalBet}   `);
                    break;
                } else if (calcCount >= 200 && calcCount % 200 == 0){
                    defBottomLimit = max(defBottomLimit - maxLimit * 0.1, totalBet * 800);
                }
            }

            if (pattern.win / totalBet > 300) {
                if ($isPurchase) {
                    player.fsStack.push(pattern);
                } else {
                    player.viewStack.push(pattern);
                }
            }
        }
    }
    let nPatterns = $isPurchase ? player.fsStack.length - 1 : player.viewStack.length - 1;
    player.viewStack.push({});
    let isFinished = false;
    let index = 1;
    let prevResObj = { na: "i" };
    while (true) {
        let reqObj;
        let isPurchasing = false;

        switch (prevResObj.na) {
            case "i":
                reqObj = getDoInitObj(token, gameCode);
                break;
            case "s":
                reqObj = getDoSpinObj(token, gameCode, index);
                break;
            case "c":
                reqObj = getDoCollectObj(token, gameCode, index);
                break;
            case "b":
                reqObj = getDoBonusObj(token, gameCode, index, prevResObj);
                break;
            case "cb":
                reqObj = getDoCollectBonusObj(token, gameCode, index);
                break;
            case "fso":
                reqObj = getDoFSOptionObj(token, gameCode, index, prevResObj);
                break;
            case "m":
                reqObj = getDoMysteryScatterObj(token, gameCode, index);
                break;
            case "go":
                reqObj = getDoGamebleOptionObj(token, gameCode, index);
                break;
            case "g":
                reqObj = getDoGamebleObj(token, gameCode, index);
                break;
            case "pur":
            case "fsp":
                reqObj = getDoPurchaseObj(token, gameCode, index);
                break;
            default:
                break;
        }

        await Auto_Service(queryString.parse(reqObj.data), player, user);

        if (prevResObj.na.includes("c") || prevResObj.na == "i") {
            player.totalBet = bpl * player.machine.lineCount;
        } else {
            player.totalBet = 0;
        }

        if (prevResObj.na == "i") {
            $initObj = player.lastPattern;
            if ($initObj.purInit) {
                $purchaseKey = "pur";
            }
            if ($initObj.fspps) {
                $purchaseKey = "fsp";
            }
            if ($isPurchase) {
                isPurchasing = true;
            }
        } else if (prevResObj.na == "c" || prevResObj.na == "cb") {
            if ($isPurchase) {
                isPurchasing = true;
            }
        }

        $patternList.push({
            Type: "POST",
            Url: $gameUrl,
            Request: reqObj.data,
            Response: Util.Result4Client(player.lastPattern)
        });
        ++index;
        prevResObj = { ...player.lastPattern };
        if (isPurchasing) {
            prevResObj.na = $purchaseKey;
        }

        if (isFinished && (player.viewStack.length == 1 || player.fsStack.length == 0)) {
            break;
        }

        if (player.lastPattern.na.includes("c") && ($isPurchase == false && player.viewStack.length == 1 || $isPurchase == true && player.fsStack.length == 0)) {
            isFinished = true;
        }
    }
    let fileName = "";
    try {
        if (!fs.existsSync("models/jsons")) {
            fs.mkdirSync(`models/jsons`);
        }
        fileName = await GetNewFileName(gameCode) + ".json";
        fs.writeFileSync(`models/jsons/${fileName}`, JSON.stringify($patternList, null, 3));
        console.log(`[      ] ${fileName}              `);
    } catch (e) {
        await player.destroy();
        res.json({ status: 0, msg: "Write File Error" });
        console.log("[      ] Write File Error");
        console.log(e.stack);
        return;
    }

    try {
        const result = execSync(`node ./models/jsons/index.js ./models/jsons ${fileName}`);
        // const resStr = String.fromCharCode.apply(null, result);
        const resStr = result.toString();
        console.log("[                    1]       ");
        console.log(resStr);
        console.log("[                    1]    ");
    } catch (e) {
        const resStr = e.stdout.toString();
        if (resStr.includes("                    ")) {
            //     catch                                                                                                                                              .
            console.log("[                    2]       ");
            console.log(resStr);
            console.log("[                    2]    ");
        } else {
            console.log("[                   ]       ");
            console.log(e.stack);
            console.log(resStr);
            console.log("[                   ]    ");
            res.json({ status: 0, msg: `${fileName}                    ` });
            await player.destroy();
            return;
        }
    }

    await player.destroy();
    res.json({ status: 1, msg: `${fileName}                    `, nPatterns });
    console.log(((Date.now() - startTime) / 1000).toFixed(), "          ");
}

const GetNewFileName = async (gameCode) => {
    const idx_arr = (await EUtil.getFiles("models/jsons")).filter(e => e.name.includes(gameCode)).map(e => e.name.slice(e.name.lastIndexOf("\\") + 1, e.name.lastIndexOf("."))).map(e => Number(e.split("__")[1])).map(e => isNaN(e) ? 1 : e);
    return gameCode + (idx_arr.length ? "__" + (Math.max.apply(null, idx_arr) + 1) : "");
}

async function Auto_Service(param, player, user) {
    var action = param.action;

    switch (action) {
        case "doInit": player.HandleInit(param); break;
        case "doSpin": await player.HandleSpin(param, user); break;
        case "doCollect": player.HandleCollect(param); break;
        case "doBonus": player.HandleBonus(param); break;
        case "doCollectBonus": player.HandleCollectBonus(param); break;
        case "doMysteryScatter": player.HandleMystery(param); break;
        case "doFSOption": player.HandleFSOption(param); break;
        case "doGambleOption": player.HandleGambleOption(param); break; //                                        (         )
        case "doGamble": player.HandleGamble(param); break; //                                       (         )
        default: break;
    }
};

function getDoInitObj(token, gameCode) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doInit",
            symbol: gameCode,
            cver: 2422,
            index: 1,
            counter: 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoSpinObj(token, gameCode, index) {
    var data = {
        action: "doSpin",
        symbol: gameCode,
        c: $initObj.c,
        l: $initObj.l,
        index: index,
        counter: index * 2 - 1,
        repeat: 0,
        mgckey: token
    };
    if ($initObj.bl) {
        data.bl = 0;
    }

    if (gameCode == "vs10chkchase") {
        if (prevResObj.trail) {
            data.ind = Number(prevResObj.trail.slice(prevResObj.lastIndexOf("~") + 1));
        }
    }

    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify(data),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoCollectObj(token, gameCode, index) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doCollect",
            symbol: gameCode,
            index: index,
            counter: index * 2 - 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoBonusObj(token, gameCode, index, prevResObj) {
    var data = {
        action: "doBonus",
        symbol: gameCode,
        index: index,
        counter: index * 2 - 1,
        repeat: 0,
        mgckey: token,
    };

    if (gameCode == "vs243mwarrior" || gameCode == "vs10egypt" || gameCode == "vs50aladdin" || gameCode == "vs3train" || gameCode == "vs13g" || gameCode == "vs10chkchase") {
        if (prevResObj.status) {
            const statusArray = prevResObj.status.split(",");

            let totalSum = 0;
            for (const i in statusArray) {
                totalSum += Number(statusArray[i]);
            }

            if (totalSum == 0) {
                data.ind = rand(0, statusArray.length);
            }
        }
    } else if (gameCode == "vs15diamond" || gameCode == "vs20kraken" || gameCode == "vs243fortune" || gameCode == "vs20santa" || gameCode == "vs10amm" || gameCode == "vs243queenie") {
        if (prevResObj.status) {
            const statusArray = prevResObj.status.split(",");

            while (true) {
                let randIndex = rand(0, statusArray.length);
                if (statusArray[randIndex] == 0) {
                    data.ind = randIndex;
                    break;
                }
            }
        }
    } else if (gameCode == "vs20hburnhs" || gameCode == "vs5ultra" || gameCode == "vs5drhs") {
        if (prevResObj.g) {
            data.ind = 0;
        }
    } else if (gameCode == "vs243lionsgold") {
        if (prevResObj.status == "0,0") {
            data.ind = 0;
        } else if (Number(prevResObj.bgt) == 18) {
            const statusArray = prevResObj.status.split(",");

            while (true) {
                let randIndex = rand(0, statusArray.length);
                if (statusArray[randIndex] == 0) {
                    data.ind = randIndex;
                    break;
                }
            }
        }
    } else if (gameCode == "vs243fortseren") {
        data.ind = 0;
    } else if (gameCode == "vs243caishien") {
        if (prevResObj.status) {
            if (Number(prevResObj.bgt) == 21) {
                data.ind = 0;
            } else if (Number(prevResObj.bgt) == 15) {
                const statusArray = prevResObj.status.split(",");

                while (true) {
                    let randIndex = rand(0, statusArray.length);
                    if (statusArray[randIndex] == 0) {
                        data.ind = randIndex;
                        break;
                    }
                }
            }
        }
    } else if (gameCode == "vs20honey") {
        if (prevResObj.status) {
            const statusArray = prevResObj.status.split(",");

            while (true) {
                let randIndex = rand(0, statusArray.length);
                if (statusArray[randIndex] == 0) {
                    data.ind = randIndex;
                    break;
                }
            }
        } else if (Number(prevResObj.bgt) == 40 && isEmpty(prevResObj.bw)) {
            data.ind = 0;
        }
    } else if (gameCode == "vs20leprechaun" || gameCode == "vs20leprexmas") {
        if (prevResObj.bw && Number(prevResObj.bgt) == 9) {
            data.ind = 0;
        } else if (Number(prevResObj.bgt) == 24) {
            if (prevResObj.status) {
                const statusArray = prevResObj.status.split(",");

                while (true) {
                    let randIndex = rand(0, statusArray.length);
                    if (statusArray[randIndex] == 0) {
                        data.ind = randIndex;
                        break;
                    }
                }
            }
        }
    } else if (gameCode == "vs9aztecgemsdx") {
        if (prevResObj.wof_status) {
            if (prevResObj.wof_status) {
                const statusArray = prevResObj.wof_status.split(",");

                let totalSum = 0;
                for (const i in statusArray) {
                    totalSum += Number(statusArray[i]);
                }

                if (totalSum == 0) {
                    data.ind = 0;
                }
            }
        }
    } else if (gameCode == "vs20ekingrr") {
        if (prevResObj.g) {
            const gData = JSON5.parse(prevResObj.g);
            let statusData;
            if (gData.eb) statusData = gData.eb.status;
            if (gData.rrb) statusData = gData.rrb.status;

            if (statusData) {
                const statusArray = statusData.split(",");

                while (true) {
                    let randIndex = rand(0, statusArray.length);
                    if (statusArray[randIndex] == 0) {
                        data.ind = randIndex;
                        break;
                    }
                }
            }
        }
    } else if (gameCode == "vs243chargebull") {
        if (prevResObj.status) {
            if (Number(prevResObj.bgt) == 21 && prevResObj.bw) {
                data.ind = 0;
            } else if (Number(prevResObj.bgt) == 18) {
                const statusArray = prevResObj.status.split(",");

                while (true) {
                    let randIndex = rand(0, statusArray.length);
                    if (statusArray[randIndex] == 0) {
                        data.ind = randIndex;
                        break;
                    }
                }
            }
        }
    } else if (gameCode == "vs1024temuj") {
        if (prevResObj.bgid) {
            data.ind = 0;
        }
    } else if (gameCode == "vs40madwheel") {
        if (prevResObj.status) {
            if (Number(prevResObj.bgt) == 39 && prevResObj.bw) {
                data.ind = 0;
            } else if (Number(prevResObj.bgt) == 30) {
                const statusArray = prevResObj.status.split(",");

                while (true) {
                    let randIndex = random(0, statusArray.length);
                    if (statusArray[randIndex] == 0) {
                        data.ind = randIndex;
                        break;
                    }
                }
            }
        }
    } else if (gameCode == "vs5spjoker") {
        if (!prevResObj.wof_wi) {
            data.ind = 0;
        }
    } else if (gameCode == "vs20bl") {
        if (prevResObj.status && !prevResObj.bw) {
            const statusArray = prevResObj.status.split(",");

            while (true) {
                let randIndex = random(0, statusArray.length);
                if (statusArray[randIndex] == 0) {
                    data.ind = randIndex;
                    break;
                }
            }
        }
    } else if (gameCode == "vs10spiritadv") {
        data.ind = random(0, 2);
    } else if (gameCode == "vs25peking" || gameCode == "vs4096mystery" || gameCode == "vs20hercpeg" || gameCode == "vs10vampwolf" || gameCode == "vs1024atlantis" || gameCode == "vs40streetracer" || gameCode == "vs10goldfish" || gameCode == "vs40voodoo" || gameCode == "vs4096magician" || gameCode == "vs40cleoeye") {
        const statusArray = prevResObj.status.split(",");
        let randIndex = rand(0, statusArray.length);
        data.ind = randIndex;
    } else if (gameCode == "vs7776secrets" || gameCode == "vs20doghouse" || gameCode == "vs20tweethouse" || gameCode == "vs20amuleteg" || gameCode == "vs10egrich") {
        data.ind = 0;
    }

    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify(data),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        },
    };

    return postObj;
}

function getDoCollectBonusObj(token, gameCode, index) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doCollectBonus",
            symbol: gameCode,
            index: index,
            counter: index * 2 - 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };

    return postObj;
}

function getDoFSOptionObj(token, gameCode, index, prevResObj) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doFSOption",
            symbol: gameCode,
            ind: prevResObj.fs_opt ? rand(0, prevResObj.fs_opt.split("~").length) : 0,
            index: index,
            counter: index * 2 - 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoMysteryScatterObj(token, gameCode, index) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doMysteryScatter",
            symbol: gameCode,
            index: index,
            counter: index * 2 - 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoGamebleOptionObj(token, gameCode, index) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doGambleOption",
            symbol: gameCode,
            g_a: "gamble",
            g_o_ind: 0,
            index: index,
            counter: index * 2 - 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoGamebleObj(token, gameCode, index) {
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify({
            action: "doGamble",
            symbol: gameCode,
            g_a: "gamble",
            g_ind: 0,
            index: index,
            counter: index * 2 - 1,
            repeat: 0,
            mgckey: token
        }),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}

function getDoPurchaseObj(token, gameCode, index) {
    var data = {
        action: "doSpin",
        symbol: gameCode,
        c: $initObj.c,
        l: $initObj.l,
        index: index,
        counter: index * 2 - 1,
        repeat: 0,
        mgckey: token
    };
    if ($purchaseKey == "pur") {
        try {
            var purInit = JSON5.parse($initObj.purInit);
            data[$purchaseKey] = rand(0, purInit.length);
        } catch (e) {
            console.log(`[      ] JSON parse`, e);
            return;
        }
    } else {
        data[$purchaseKey] = 0;
    }
    const postObj = {
        method: "POST",
        url: $gameUrl,
        data: queryString.stringify(data),
        config: {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    };
    return postObj;
}