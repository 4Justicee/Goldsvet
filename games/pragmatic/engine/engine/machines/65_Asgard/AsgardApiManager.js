var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: "12",
        def_s: "10,5,9,3,9,3,6,11,11,6,9,8,5,5,10",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "6",
        def_sb: "6,7,7,9,7",
        def_sa: "8,10,4,10,3",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,2,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        base_aw: "n;tt~nlf;tt~msf;tt~rrf;tt~rwf",
        cpri: "1",
        stime: new Date().getTime(),
        sa: "8,10,4,10,3",
        sb: "6,7,7,9,7",
        sc: "10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "10.00",
        sh: "3",
        wilds: "2~500,100,25,0,0~1,1,1,1,1;13~500,100,25,0,0~1,1,1,1,1;14~500,100,25,0,0~1,1,1,1,1;15~500,100,25,0,0~1,1,1,1,1;16~500,100,25,0,0~1,1,1,1,1;17~500,100,25,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "10.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;250,75,15,0,0;200,60,15,0,0;150,50,15,0,0;100,40,15,0,0;50,20,10,0,0;50,20,10,0,0;50,20,10,0,0;50,20,5,0,0;50,20,5,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "25",
        rtp: "96.48",
        reel_set0: "11,10,7,9,4,5,11,10,6,4,8,7,5,3,8,9,2,2,10,6~3,8,6,9,7,4,8,10,1,9,4,11,5,10,6,11,2,2,7,5~4,9,11,5,6,8,1,9,11,5,10,7,4,8,6,3,2,2,7,10~10,3,11,5,9,6,5,10,1,8,3,7,9,4,8,7,2,2,6,11~3,9,6,10,7,4,8,5,11,3,8,4,9,5,11,7,2,2,10,6",
        s: "10,5,9,3,9,3,6,11,11,6,9,8,5,5,10",
        reel_set2: "5,2,9,8,4,12,12,12,11,6,12,12,12,3,8,12,12,12,10,7~12,12,12,5,4,6,12,12,12,7,2,11,3,5,12,12,12,10,8,9~11,12,12,12,4,5,9,12,12,12,3,10,5,12,12,12,7,6,2,8~8,11,12,12,12,10,9,2,5,10,6,12,12,12,7,3,12,12,12,4~3,2,10,4,12,12,12,7,5,11,9,12,12,12,6,8,12,12,12,5",
        reel_set1: "5,4,13,17,6,4,3,5,4,16,3,5,6,15,14,4,6,5,3,6~6,3,14,13,5,3,4,15,17,6,4,3,6,5,16,13,5,6,4,5~3,4,6,17,4,5,3,15,13,3,6,4,5,3,6,5,14,16,5,6~15,16,5,4,6,5,3,6,14,13,6,4,5,3,6,4,13,17,3,4~3,6,5,4,6,4,5,16,15,4,3,6,4,14,17,3,5,6,13,5",
        reel_set4: "8,4,11,9,5,7,10,3,9,4,7,11,6,8,9,3,6,8,10,5~10,9,6,5,10,8,4,11,3,7,11,3,10,9,4,11,6,8,7,5~9,4,9,3,7,8,5,10,11,6,3,11,9,4,10,5,7,8,6,7~8,3,7,11,5,3,9,4,8,10,3,6,9,4,11,10,6,5,7,11~3,4,8,6,5,7,9,4,9,11,6,10,5,11,4,7,8,3,10,6",
        reel_set3: "8,4,5,9,2,8,10,3,11,7,6,8,4,10,7,6,5,11,2,9~6,4,10,5,2,9,7,10,11,6,8,3,5,7,9,8,5,2,11,4~9,4,5,10,7,4,9,2,3,10,11,6,8,6,8,9,5,11,7,2~8,7,4,10,6,2,11,9,5,4,10,3,7,10,5,9,11,3,8,6~3,7,8,6,9,5,4,10,5,8,3,11,6,5,10,2,11,4,7,9",
        reel_set5: "5,4,2,2,6,4,3,5,4,6,3,5,6,2,2,4,6,5,3,6~6,3,2,6,5,3,4,2,2,6,4,3,6,5,2,2,5,6,4,5~3,4,6,2,4,5,3,2,2,3,6,4,5,3,6,5,2,2,5,6~2,2,5,4,6,5,3,6,2,2,6,4,5,3,6,4,2,3,6,4~3,6,5,4,6,4,5,2,2,4,3,6,4,2,2,3,5,6,4,5",
        cpri_mask: "tbw",
        awt: "rsf"
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
        balance: "100,000.00",
        balance_cash: "100,000.00",
        balance_bonus: "0",
        na: "s",
        reel_set: "0",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: "3",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "25",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        awt: "rsf",
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    //          ,                          
    result["sa"] = Util.view2String(player.machine.virtualReels.above);
    result["sb"] = Util.view2String(player.machine.virtualReels.below);

    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }

    if (player.machine.scatterWin > 0) {
        result["psym"] = `1~${player.machine.scatterWin}~${player.machine.scatterPosition}`;
    }

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;

    //                                               
    var spinType = player.machine.spinType;
    result["reel_set"] = spinType;
    result["aw"] = spinType;
    switch (spinType) {
        case 1: //       
            result["s"] = Util.view2String(player.machine.maskView);
            break;
        case 2: //             
            result["is"] = Util.view2String(player.machine.maskView);
            result["msr"] = player.machine.mystery;
            break;
        case 3: //       
            result["is"] = Util.view2String(player.machine.maskView);
            result["rwd"] = `2~${Util.view2String(player.machine.randomWildPosition)}`;
            break;
        case 4: //          
            result["is"] = Util.view2String(player.machine.maskView);
            result["rwd"] = `2~${Util.view2String(player.machine.randomWildPosition)}`;
            break;
        default: //          
            break;
    }
    if (spinType > 0 && player.machine.winLines.length == 0) {
        result["cprw"] = player.machine.winMoney;
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["bgid"] = 0;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = "0.00";
            result["wins_mask"] = "h,h,h,h";
            result["wins"] = "0,0,0,0";
            result["wp"] = 0;
            result["na"] = "b";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        var winsMaskArray = ['nlf', 'msf', 'rrf', 'rwf']; // nlf:       , msf:             , rrf:       , rwf:          
        result['fstype'] = winsMaskArray[spinType - 1];
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
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
            result["w"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    return result;
};

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: "100,000.00",
        index: "3",
        balance_cash: "100,000.00",
        balance_bonus: "0.0",
        na: "s",
        stime: "1629939208592",
        sver: "5",
        counter: "2"
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: '0.00',
        balance_cash: '100,000.00',
        balance: '100,000.00',
        bgid: '0',
        bgt: '21',
        coef: '0.25',
        counter: '1',
        end: '1',
        fs: '1',
        fsmax: '5',
        fsmul: '1',
        fsres: '0.00',
        fswin: '0.00',
        fstype: 'rrf',
        index: '1',
        level: '1',
        lifes: '0',
        reel_set: '0',
        na: 's',
        rw: '0.00',
        status: '1,0,0,0',
        stime: '1629939208592',
        sver: '5',
        tw: '0.50',
        wins_mask: 'rrf,rwf,msf,nlf',
        wins: '5,5,5,5',
        wp: '0'
    }

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["coef"] = player.virtualBet;
    result["fsmax"] = player.machine.freeSpinLength;
    result["stime"] = new Date().getTime();
    result["tw"] = player.machine.freeSpinBeforeMoney;
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    var spinType = player.machine.spinType;
    var winsMaskArray = ['nlf', 'msf', 'rrf', 'rwf'];   // nlf:       , msf:             , rrf:       , rwf:          
    result['fstype'] = winsMaskArray[spinType - 1];
    result['wins_mask'] = `${winsMaskArray[spinType - 1]},${Util.shuffle(winsMaskArray.splice(spinType - 1, 1)).join(',')}`;
    result["reel_set"] = spinType;

    return result;
};

module.exports = ApiManager;