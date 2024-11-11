var Util = require('../../../utils/slot_utils');

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: "100,000,000.00",
        balance: "100,000,000.00",
        bonuses: "0",
        c: "100.00",
        cfgs: "1",
        counter: "2",
        def_s: "7,7,8,8,7,5,5,3,3,9,7,7,8,8,7,7,7,9,9,3",
        def_sa: "8,9,6,10,10",
        def_sb: "5,8,8,8,8",
        defc: "100.00",
        fsbonus: "",
        gameInfo: '{props:{max_rnd_sim:"1",max_rnd_hr:"62500000",max_rnd_win:"5500"}}',
        gmb: "0,0,0",
        index: "1",
        l: "20",
        na: "s",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;150,75,20,0,0;125,60,20,0,0;100,50,10,0,0;80,40,10,0,0;50,20,5,0,0;40,10,3,0,0;40,10,3,0,0;40,10,2,0,0;40,10,2,0,0",
        reel_set_size: "2",
        reel_set: "0",
        reel_set0: "11,6,8,9,9,9,9,3,10,6,6,6,4,7,7,7,7,1,8,8,8,5,11,11,11,4,5~7,10,10,10,2,3,4,9,9,9,1,5,5,5,5,6,6,6,11,6,10,8,9,5,9,5,9,6,5,9,11,9,6,10,5,11,10,6,5,4,5,9,6,9,5,8,6,9,10,4,9,5,6,9~3,10,8,8,8,2,10,10,10,5,6,4,6,6,6,8,11,7,11,11,11,9,1,11,10,6,10,2,1,8,9,11,9,8,11,10,11,9,11,10,2,8,1,11,6,11,4,7,10,2,10,11,10,8,1,11,9,6,7,8,10,9,10,7,1~3,9,7,4,6,4,4,4,10,5,11,1,8,2,4,10,9,4,6,2,1,9,11,4,10,11,4,7,4,5,4~11,11,11,11,3,6,6,6,8,4,6,9,9,9,5,10,10,10,10,9,7,2,1,10,1,10,6,5,6,5,6,9,5,9,6,5,9,2,9,6,10,6,5,6,3,6,10,3,5,6,8,10,6,3,9,5,10,6,3,9,6,10,8,9,3,2,5,6,10,8,6,2,6,9,6,9,6,10,9,1,9,1,5,9,5",
        reel_set1: "11,11,11,4,9,1,5,8,3,7,10,11,6,8,3,9,8,10,1,3,4,8,1,8,7,1,4,3,1,10,3,1,5,3,1,3,10,9,3,1,3,1,3,7,9,1,3,8,1,3,1,4,1,7,9,10,3,1,10,5,8,10,7,10,7,9,3,8,1,10,3,1,10,8~9,8,5,5,5,10,11,3,10,10,10,5,6,6,6,1,4,7,6,10,6,5,11,6~11,11,11,4,10,11,7,5,8,3,9,6,1,8,6,5,10,6,3,1,8,3,5,8,5,3,7,8,5~8,9,4,4,4,5,1,7,11,6,3,4,10,1,3,6,7,4,1,5,11,1,4,3,7,3,1,3,10,3,4,11,7~5,1,11,11,11,6,10,6,6,6,9,7,11,8,3,4,10,6,11,6,11,9,11,6,11,3,6,8,11,6,11,6,8,6,11,6,11,4,6,4,7,11,6,11,4,11,6,3,11,6,11,6",
        rt: "d",
        rtp: "96.51",
        s: "7,7,8,8,7,5,5,3,3,9,7,7,8,8,7,7,7,9,9,3",
        sa: "8,9,6,10,10",
        sb: "5,8,8,8,8",
        sc: "10.00,20.00,30.00,40.00,50.00,80.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        scatters: "1~20,5,1,0,0~12,10,8,0,0~1,1,1,1,1,1",
        sh: "4",
        stime: new Date().getTime(),
        sver: "5",
        ver: "2",
        wilds: "2~200,100,20,0,0~1,1,1,1,1",
    };

    //              api            
    if (player.lastPattern) {
        for (var key in player.lastPattern) {
            result[key] = player.lastPattern[key];
        }
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }

    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        balance_bonus: "0",
        balance_cash: player.balance,
        balance: player.balance,
        bl: "0",
        c: player.betPerLine,
        counter: ++param.counter,
        index: param.index,
        l: "20",
        ls: "0",
        na: "s",
        reel_set: "0",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),
        sb: Util.view2String(player.machine.virtualReels.below),
        sh: "4",
        sver: "5",   
        tw: "0.00",
        w: "0.00",
    };

    //          ,                          
    result["tw"] = player.machine.winMoney;
    result["w"] = player.machine.winMoney;

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    if (player.machine.wildSheilds.length > 0) {
        result["rwd"] = `2~${player.machine.wildSheilds.join()}`;
        result["is"] = Util.view2String(player.machine.maskView);
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.00;
            result["fsres"] = 0.00;
            result['win_fs'] = 0;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = 1;
        if (player.machine.totalMulti > 1) {
            result["gwm"] = player.machine.totalMulti;
            result["wmt"] = "wb";
            result["wmv"] = player.machine.totalMulti;
            result["wnd"] = 0;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: "100,000.00",
        balance: "100,000.00",
        counter: "2",
        index: "3",
        na: "s",
        stime: "1629939208592",
        sver: "5",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
}

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: '0.00',
        balance_cash: '100,000.00',
        balance: '100,000.00',
        bgid: "0",
        bgt: "32",
        counter: '1',
        end: '1',
        fs: '1',
        fsmax: '10', //                       
        fsmul: '1',
        fsres: '0.00',
        fswin: '0.00',
        index: '1',
        reel_set: "1",
        na: 's',
        stime: "1629939208592",
        sver: '5',
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["fsmax"] = player.machine.freeSpinLength;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    result['win_fs'] = player.machine.freeSpinLength;
    result['wins_mask'] = 'nff,nff,nff,nff,nff,nff,nff,nff,nff';
    result['wins'] = player.machine.freeSpinCountArr.join();

    return result;
}

module.exports = ApiManager;