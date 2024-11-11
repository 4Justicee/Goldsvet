var Util = require('../../../utils/slot_utils');

function ApiManager() {

}

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "9,3,2,3,9,10,4,1,4,10,9,3,2,3,9",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "2",
        def_sb: "8,10,8,11,7",
        def_sa: "8,9,10,11,12",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,5,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        mbri: "1,2,3",
        rt: "d",
        stime: "1648280647144",
        sa: "8,9,10,11,12",
        sb: "8,10,8,11,7",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;750,150,50,0,0;500,100,35,0,0;300,60,25,0,0;200,40,20,0,0;150,25,12,0,0;100,20,8,0,0;50,10,5,0,0;50,10,5,0,0;25,5,2,0,0;25,5,2,0,0;25,5,2,0,0",
        l: "20",
        reel_set0: "9,8,12,8,10,7,5,11,4,1,3,7,10,13,1,6,9,13,6,11,12~3,6,8,13,7,10,9,11,10,9,6,5,12,2,4,8,11,12,13,7~4,9,13,12,13,7,8,12,6,1,2,10,11,7,5,11,3,10,8,9,6~2,6,10,7,11,13,12,5,9,3,6,7,12,9,13,8,10,11,4,8~8,11,7,6,13,9,10,5,1,12,6,3,8,4,7,10,13,12,11,9",
        s: "9,3,2,3,9,10,4,1,4,10,9,3,2,3,9",
        reel_set1: "12,5,11,9,13,8,13,3,3,3,10,12,11,10,13,11,8,8,9,6,9,10,12,6,3,7,4,7,5~13,11,7,9,4,12,7,3,10,9,8,13,11,10,13,5,6,9,2,7,6,10,12,8,11~6,12,10,13,7,12,5,10,8,7,2,13,3,6,9,8,11,8,5,12,9,4,11,10,9,13~13,9,5,7,13,6,12,11,6,10,13,12,9,7,8,10,4,2,8,7,5,9,11,3,12,8,6,10,11~13,12,11,7,10,11,7,13,4,9,12,6,10,3,3,3,8,6,11,8,9,13,7,9,5,8,12",
        mbr: "1,1,1"
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
        na: "s",
        n_reel_set: "0",
        stime: new Date().getTime(),
        s: Util.view2String(player.machine.view),
        sa: Util.view2String(player.machine.virtualReels.above),//          ,                          
        sb: Util.view2String(player.machine.virtualReels.below),//          ,                          
        sh: "3",
        sver: "5",   
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    //                                           
    if (player.machine.winMoney > 0) {
        result["na"] = "c";
    }

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }



    result['mbri'] = "1,2,3";
    result['mbr'] = "3,2,3";
    if (player.machine.multiPositions.length > 0) {
        result['mbp'] = player.machine.multiPositions.join();
        result['mbv'] = player.machine.multiValues.join();
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["bgid"] = 0;
            result["bgt"] = 32;
            result["bw"] = 1;
            result['end'] = 0;
            result['na'] = 'b';
            result['psym'] = `1~${player.machine.scatterWin}~${player.machine.scatterPositions.join()}`;
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = 0.00;
            result["fsres"] = 0.00;
            result['win_fs'] = 0;
            result['wins_mask'] = 'h,h,h,h,h,h,h,h,h';
            result['wins'] = '0,0,0,0,0,0,0,0,0';
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["n_reel_set"] = 1;
        if (player.machine.maskView.length > 0) {
            result["is"] = Util.view2String(player.machine.maskView);
        }
        if (player.machine.freeSpinSticky.length > 0) {
            result["sty"] = player.machine.freeSpinSticky;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
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
        n_reel_set: "1",
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
