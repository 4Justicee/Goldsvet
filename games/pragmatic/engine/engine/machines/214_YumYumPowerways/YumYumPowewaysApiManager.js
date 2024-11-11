var Util = require("../../../utils/slot_utils");

function ApiManager() { }

/*
stf:                      -               -      4x4                   

g:
{
    s0:{reel_set:"0",s:"10,13,12,12",sa:"8",sb:"11",sh:"4",st:"rect",sw:"1"},
    s1:{reel_set:"1",s:"9,11,11,11",sa:"9",sb:"8",sh:"4",st:"rect",sw:"1"},
    s2:{reel_set:"2",s:"13,7,7,3",sa:"12",sb:"3",sh:"4",st:"rect",sw:"1"},
    s3:{reel_set:"3",s:"9,9,13,13",sa:"8",sb:"12",sh:"4",st:"rect",sw:"1"},
    s4:{s:"13,5,3,9,12,8,13,8,3,6,10,9,3,3,11,10",sa:"14,14,14,14",sb:"14,14,14,14",sh:"4",st:"rect",sw:"4"}
}

gwm, wmv:          
wlc_v:             ~         ~            ~                        ~      ,      ...,      ~      (r,l,b,t)~      
*/

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "14,11,8,8,12,14,8,3,5,10,9,10,11,5,4,6,5,10,11,9,4,5,7,11,6,7,10,8,6,11,14,13,13,11,11,14",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "17",
        reel_set: "12",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{rtps:{purchase:"96.67",regular:"96.43"},props:{gamble_reg_8_10:"44.46%",max_rnd_sim:"0",gamble_pur_6_8:"42.94%",gamble_pur_10_12:"45.49%",max_rnd_hr:"178571428",gamble_reg_4_6:"50.14%",max_rnd_win:"5000",gamble_pur_4_6:"50.46%",gamble_reg_6_8:"42.88%",gamble_pur_8_10:"44.50%",gamble_reg_10_12:"45.47%"}}',
        wl_i: "tbm~5000",
        stime: "1645607880962",
        reel_set10: "12,13,3,3,3,6,6,8,13,8,8,8,11,10,3,7,9,9,9,9,10,6,11,7,7,7,8,13,12,10,10,10,10,11,11,7,11,11,11,8,12,11,12,12,12,12,8,5,10,7,6,6,6,8,13,5,13,13,13,9,6,4,9,5,5,5,7,13,4,5,4,4,4,4,9,9,1,12",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        reel_set11: "10,1,1,5,8,13,13,12,8,3,8,11,1,7,1,8,8,8,1,13,1,1,5,13,11,1,10,11,11,12,1,5,11,13,1,5,5,5,4,9,6,13,9,6,1,7,11,6,4,5,12,1,1,7,9,4,4,4,13,12,10,1,10,6,9,3,7,8,1,10,7,1,8,12,12,11",
        reel_set12: "11,3,3,3,6,7,6,8,8,8,4,13,10,9,9,9,8,3,12,7,7,7,7,6,10,10,10,4,10,11,11,11,11,11,9,10,12,12,12,13,5,5,6,6,6,1,12,13,13,13,12,11,8,5,5,5,13,7,12,4,4,4,9,9,8,13~10,3,3,3,4,6,8,8,8,9,8,9,9,9,8,7,7,7,7,5,10,10,10,10,7,12,11,11,11,11,12,11,12,12,12,12,5,6,6,6,11,3,13,13,13,6,13,5,5,5,1,13,4,4,4,13,8,4,9~9,3,3,3,13,11,5,8,8,8,12,10,6,9,9,9,9,9,1,7,7,7,5,8,10,10,10,7,11,4,11,11,11,12,11,7,12,12,12,8,3,12,6,6,6,13,8,13,13,13,12,10,10,5,5,5,6,13,11,4,4,4,13,6,7,4~11,11,4,8,6,4,3,3,3,11,4,5,10,1,10,9,7,8,8,8,12,9,11,12,9,7,11,8,9,9,9,11,12,8,13,7,13,13,3,7,7,7,11,8,13,13,10,13,6,10,10,10,10,8,13,6,13,11,6,11,7,11,11,11,12,7,11,9,10,5,3,8,12,12,12,12,7,9,5,7,12,6,12,6,6,6,8,5,10,12,13,9,9,12,13,13,13,6,13,8,9,7,6,8,8,5,5,5,6,5,10,7,4,13,13,9,4,4,4,12,4,11,10,11,10,5,9,1",
        reel_set13: "7,7,12,6,8,13,6,8,13,8,3,3,3,12,11,9,12,6,11,9,9,13,5,12,10,8,8,8,6,10,7,4,10,3,8,7,6,11,12,4,9,9,9,12,7,4,8,13,13,10,9,12,10,13,7,7,7,7,4,11,4,12,13,13,9,5,11,11,9,10,10,10,5,3,5,13,13,6,12,6,8,7,9,10,11,11,11,12,11,8,8,9,11,7,1,8,5,7,6,12,12,12,3,8,11,10,11,11,12,9,7,9,10,12,6,6,6,13,12,13,8,10,11,5,10,7,9,13,13,13,13,5,11,6,8,11,12,5,10,13,11,1,8,5,5,5,7,4,10,9,13,13,10,11,8,12,6,11,4,4,4,12,10,6,9,7,12,12,5,12,6,8,13,10",
        sh: "6",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        st: "rect",
        c: "100.00",
        sw: "6",
        sver: "5",
        g: '{s0:{def_s:"12,8,8,11",def_sa:"14",def_sb:"14",reel_set:"0",s:"12,8,8,11",sa:"14",sb:"14",sh:"4",st:"rect",sw:"1"},s1:{def_s:"8,11,11,6",def_sa:"14",def_sb:"14",reel_set:"1",s:"8,11,11,6",sa:"14",sb:"14",sh:"4",st:"rect",sw:"1"},s2:{def_s:"13,13,11,11",def_sa:"14",def_sb:"14",reel_set:"2",s:"13,13,11,11",sa:"14",sb:"14",sh:"4",st:"rect",sw:"1"},s3:{def_s:"11,11,10,10",def_sa:"14",def_sb:"14",reel_set:"3",s:"11,11,10,10",sa:"14",sb:"14",sh:"4",st:"rect",sw:"1"},s4:{def_s:"3,5,10,9,5,4,6,5,9,4,5,7,7,10,8,6",def_sa:"14,14,14,14",def_sb:"14,14,14,14",s:"3,5,10,9,5,4,6,5,9,4,5,7,7,10,8,6",sa:"14,14,14,14",sb:"14,14,14,14",sh:"4",st:"rect",sw:"4"}}',
        counter: "2",
        reel_set14: "10,13,9,12,10,13,12,4,6,3,9,5,5,4,6,10,13,7,3,3,3,11,6,4,12,12,11,11,3,8,5,13,8,8,11,11,13,10,9,10,8,8,8,13,9,12,10,7,12,12,10,9,8,5,6,11,6,13,10,10,6,5,9,9,9,11,11,9,8,5,6,10,11,9,13,12,9,11,13,7,7,12,11,7,7,7,7,7,4,7,11,7,4,9,13,8,9,7,7,13,8,9,10,8,13,11,13,10,10,10,9,12,12,10,13,8,12,9,12,11,7,11,5,9,6,7,12,13,8,11,11,11,10,7,8,12,5,12,11,6,11,3,1,6,13,9,7,10,9,13,8,12,12,12,6,5,9,8,9,8,10,10,9,8,12,12,6,10,6,7,6,7,9,5,6,6,6,7,13,11,12,10,4,7,13,13,6,4,7,12,5,13,11,13,12,6,13,13,13,12,3,11,8,8,6,5,11,12,5,12,9,13,1,10,4,5,12,11,5,5,5,4,6,12,10,13,8,10,11,10,10,9,11,7,9,7,11,1,6,12,4,4,4,3,7,8,11,8,13,7,13,4,8,13,12,12,9,10,11,11,7,12,12,13",
        paytable: "0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;30,15,10,0,0,0;18,12,8,0,0,0;12,9,6,0,0,0;10,7,4,0,0,0;8,5,3,0,0,0;5,3,2,0,0,0;5,3,2,0,0,0;5,3,2,0,0,0;4,2,1,0,0,0;4,2,1,0,0,0;4,2,1,0,0,0;0,0,0,0,0,0",
        l: "20",
        reel_set15: "13,5,12,4,8,3,3,3,6,5,7,9,9,7,10,8,8,8,10,6,6,8,1,11,10,9,9,9,9,5,10,8,10,12,12,7,7,7,8,8,10,6,7,7,4,10,10,10,4,9,13,8,11,11,13,11,11,11,11,9,13,5,8,12,13,12,12,12,9,12,11,9,6,4,6,6,6,6,13,10,13,11,13,11,7,13,13,13,3,3,13,12,12,8,12,5,5,5,12,11,7,5,9,7,9,4,4,4,6,11,10,8,7,13,12,11",
        reel_set16: "13,10,11,13,8,9,1,6,7,11,8,13,3,12,5,7,12,13,9,10,9,3,3,3,9,12,5,12,7,9,13,12,5,13,6,11,11,12,13,8,12,13,10,6,7,11,8,8,8,7,10,8,12,5,4,11,13,8,12,7,10,10,11,13,10,13,3,9,12,8,10,9,9,9,13,7,6,9,3,6,12,10,11,13,8,8,10,7,9,4,9,6,1,9,4,6,7,7,7,8,6,13,8,12,10,5,5,10,5,12,4,8,11,12,11,6,5,13,11,11,13,10,10,10,4,9,10,11,11,13,4,5,6,13,6,13,9,7,9,9,1,6,8,11,12,9,11,11,11,12,13,5,7,11,5,11,5,8,11,11,12,10,9,9,13,13,12,13,3,13,7,12,12,12,10,12,6,4,5,8,9,6,4,7,12,11,12,12,11,13,12,12,8,7,12,13,6,6,6,7,8,10,6,10,6,6,10,11,10,8,13,5,12,11,8,5,6,4,13,6,9,13,13,13,8,10,9,12,7,10,11,5,4,7,8,9,13,11,4,12,9,7,10,11,8,11,5,5,5,9,3,6,7,4,7,11,7,11,6,11,6,7,11,13,10,11,13,12,12,4,8,4,4,4,4,13,8,12,7,13,8,10,7,9,5,10,9,9,3,11,10,10,8,9,12,12,7,7",
        total_bet_max: "10,000,000.00",
        reel_set0: "5,3,3,3,7,10,9,8,8,8,8,11,12,9,9,9,13,13,6,7,7,7,10,7,10,10,10,5,13,13,11,11,11,4,11,12,12,12,12,3,4,12,6,6,6,6,8,13,13,13,6,8,11,5,5,5,12,1,9,4,4,4,9,10,11,7",
        s: "14,11,8,8,12,14,8,3,5,10,9,10,11,5,4,6,5,10,11,9,4,5,7,11,6,7,10,8,6,11,14,13,13,11,11,14",
        reel_set2: "11,3,3,3,7,7,8,8,8,11,8,11,9,9,9,10,13,7,7,7,4,13,9,10,10,10,1,13,11,11,11,12,6,12,12,12,7,5,8,6,6,6,10,10,13,13,13,4,12,3,5,5,5,6,8,4,4,4,5,12,9,9",
        t: "243",
        reel_set1: "11,12,3,3,3,6,3,5,11,8,8,8,10,13,8,12,9,9,9,7,1,4,7,7,7,4,5,7,7,10,10,10,12,9,5,6,11,11,11,11,7,13,12,12,12,10,6,10,8,6,6,6,11,12,6,10,13,13,13,12,13,13,5,5,5,9,8,9,11,4,4,4,12,9,8,13,10",
        reel_set4: "8,11,6,12,13,11,3,3,3,6,4,11,10,4,7,5,8,8,8,11,10,5,13,13,11,12,8,9,9,9,9,10,13,11,1,7,3,7,7,7,8,5,9,11,10,5,12,8,10,10,10,12,3,4,10,13,9,8,11,11,11,4,13,9,7,6,7,9,12,12,12,8,10,12,10,12,7,8,11,6,6,6,4,6,13,5,12,12,9,13,13,13,9,10,6,12,11,8,8,6,5,5,5,13,10,7,13,12,5,11,4,4,4,6,13,6,9,7,12,7,13,11",
        purInit: '[{type:"d",bet:2000}]',
        reel_set3: "6,7,13,10,4,11,5,6,7,13,3,3,3,11,12,5,12,7,7,5,5,10,13,12,8,8,8,7,13,9,7,3,12,13,9,10,6,7,9,9,9,5,11,9,10,9,12,10,13,13,11,8,10,7,7,7,4,10,8,12,13,9,5,6,11,4,7,10,10,10,5,8,11,11,13,13,12,10,13,4,13,11,11,11,12,1,7,1,13,10,9,8,12,8,6,12,12,12,11,7,5,8,9,8,12,11,4,11,12,6,6,6,6,10,13,11,8,10,11,9,13,9,12,5,13,13,13,6,7,6,4,6,9,13,3,9,13,11,5,5,5,10,9,8,6,10,11,1,7,4,3,8,4,4,4,6,12,12,9,11,10,8,12,11,12,11,12,7",
        reel_set6: "4,9,10,13,11,10,12,3,3,3,7,8,11,5,9,11,12,13,8,8,8,11,13,9,6,6,8,7,12,9,9,9,12,11,10,4,11,5,12,10,7,7,7,4,13,13,6,8,13,12,5,10,10,10,9,11,13,10,5,11,9,8,11,11,11,13,6,12,9,11,6,3,13,12,12,12,9,5,4,9,11,10,4,8,6,6,6,12,8,9,7,3,13,8,7,13,13,13,12,8,13,6,5,10,12,8,5,5,5,11,1,7,6,10,13,7,9,4,4,4,7,8,12,10,6,7,12,7,11",
        reel_set5: "12,5,5,12,13,10,8,10,8,13,6,9,13,12,7,11,4,10,6,3,3,3,3,13,9,12,12,13,9,13,8,12,8,9,10,4,11,6,10,7,8,10,8,8,8,11,12,4,7,12,9,6,7,13,8,11,5,6,11,7,12,6,6,12,9,9,9,9,6,13,8,7,11,13,11,9,8,3,9,12,7,3,12,7,8,5,11,5,12,7,7,7,11,4,5,10,13,7,11,13,8,8,13,5,12,9,4,12,10,1,8,10,10,10,10,10,8,12,10,11,1,7,5,12,11,11,12,9,6,13,7,13,12,7,8,11,11,11,13,11,12,7,13,6,10,8,6,11,6,4,6,9,8,13,13,9,5,13,12,12,12,4,12,4,10,5,10,10,9,11,9,13,13,12,6,9,10,8,4,6,12,11,6,6,6,8,7,7,12,9,5,6,11,13,8,10,7,13,9,11,9,6,8,9,7,13,13,13,12,6,9,5,7,10,3,10,9,4,12,7,10,10,4,13,13,11,11,9,5,5,5,4,12,10,11,11,10,11,13,12,6,5,11,5,3,8,1,7,12,13,11,4,4,4,7,13,13,6,10,9,7,13,4,11,9,11,7,10,12,9,7,7,11,8,5,11",
        reel_set8: "1,13,12,11,11,6,7,10,1,11,1,8,6,10,8,1,12,1,8,13,12,11,1,10,13,3,1,3,8,8,8,1,10,13,9,1,5,10,5,7,7,13,11,1,11,6,9,4,8,1,4,7,1,5,8,1,1,3,1,13,5,5,5,9,9,11,11,6,10,7,1,12,1,10,1,1,4,6,1,13,12,8,9,1,5,11,1,1,6,12,1,8,4,4,4,5,7,7,11,12,1,12,12,13,9,5,4,1,1,8,10,1,12,1,13,1,12,13,9,13,8,7,7,10,13,11",
        reel_set7: "13,7,12,3,7,11,9,12,10,11,13,3,3,3,9,11,3,13,13,5,4,7,10,7,6,5,12,8,8,8,13,7,13,7,7,5,12,10,11,11,8,8,4,9,9,9,5,7,4,5,12,11,11,7,9,1,6,10,5,7,7,7,12,8,10,5,11,4,12,9,9,6,12,7,9,10,10,10,8,9,13,9,10,13,13,12,10,5,12,11,11,11,11,11,9,6,13,11,5,6,7,9,8,11,8,5,12,12,12,6,4,12,13,12,13,11,10,6,11,13,9,8,6,6,6,7,11,8,10,10,8,4,10,12,13,9,11,6,13,13,13,12,12,10,12,8,13,11,8,1,4,6,6,12,5,5,5,3,8,12,11,7,10,13,8,4,9,10,3,13,4,4,4,6,8,6,9,7,10,9,6,9,10,13,11,13,12",
        reel_set9: "1,13,10,7,3,10,1,11,1,12,9,12,8,13,1,13,1,1,7,7,9,11,12,5,11,10,1,10,8,12,4,13,8,8,8,6,7,13,11,10,1,12,5,1,7,13,1,10,11,11,3,5,8,9,11,1,6,1,8,12,12,1,6,1,13,3,9,1,11,5,5,5,1,1,13,1,8,1,1,4,13,9,13,4,13,5,4,12,1,4,9,1,11,9,1,13,12,7,11,11,6,1,1,10,12,1,4,4,4,1,5,1,8,5,7,8,6,8,11,8,1,7,1,12,10,6,1,1,9,1,13,9,10,6,11,7,1,7,12,5,10,8,12,13",
        total_bet_min: "10.00",
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
    result["stime"] = new Date().getTime();

    if (player.betPerLine > 0) {
        result["c"] = player.betPerLine;
        result["defc"] = player.betPerLine;
    }
    return result;
};

ApiManager.prototype.GameApi = function (player, prevGameMode, param) {
    var result = {
        balance: "100,400.00",
        index: "6",
        balance_cash: "100,400.00",
        reel_set: "12",
        balance_bonus: "0.00",
        na: "s",
        sh: "6",
        st: "rect",
        c: player.betPerLine,
        sw: "6",
        sver: "5",
        g: '{s0:{reel_set:"0",s:"5,13,13,13",sa:"3",sb:"5",sh:"4",st:"rect",sw:"1"},s1:{reel_set:"1",s:"12,10,11,12",sa:"8",sb:"7",sh:"4",st:"rect",sw:"1"},s2:{reel_set:"2",s:"8,7,9,9",sa:"11",sb:"11",sh:"4",st:"rect",sw:"1"},s3:{reel_set:"3",s:"11,11,8,7",sa:"11",sb:"7",sh:"4",st:"rect",sw:"1"},s4:{s:"10,7,6,9,9,13,9,9,4,5,9,10,8,3,4,11",sa:"14,14,14,14",sb:"14,14,14,14",sh:"4",st:"rect",sw:"4"}}',
        counter: "12",
        l: "20",
        s: Util.view2String(player.machine.view),
        stime: new Date().getTime(),
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
    };

    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["g"] = Buffer.from(player.machine.viewSTR, "base64").toString("ascii");

    if (player.machine.winLines.length > 0) {
        result["wlc_v"] = player.machine.winLines.join(";");
    }

    if (player.machine.prevTumbleStatus == "NOTUMBLE" && player.machine.tumbleStatus == "TUMBLE") {
        result["rs_c"] = 1;
        result["rs_m"] = 1;
        result["rs_p"] = 0;
        result["rs"] = "mc";
    }
    if (player.machine.prevTumbleStatus == "TUMBLE") {
        result["na"] = "s";
        result["tw"] = player.machine.tmb_res;
        result["rs_win"] = player.machine.tmb_win;
        result["wmt"] = "pr";
        result["wmv"] = player.machine.tmb_multi;
        result["gwm"] = player.machine.tmb_multi;
        result["stf"] = player.machine.tumbleSTR;

        if (player.machine.tumbleStatus == "TUMBLE") {
            result["rs_c"] = 1;
            result["rs_m"] = 1;
            result["rs_p"] = player.machine.tumbleIndex - 1;
            result["rs"] = "mc";
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["rs_t"] = player.machine.tumbleIndex;
            result["w"] = 0;
            result["na"] = "c";
        }
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = "0.00";
            result["fsres"] = "0.00";
            result["na"] = "s";
        } else if (player.machine.currentGame == "BONUS") {
            result["bgid"] = 1;
            result["bgt"] = 35;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["end"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
            result["puri"] = 0;
            result["purtr"] = 1;
            result["status"] = "0,1,0,0,0";
            result["wins_mask"] = "nff,nff,nff,nff,nff";
            result["wins"] = "4,6,8,10,12";
            result["wp"] = 0;
            result["na"] = "b";

            var status = [0, 0, 0, 0, 0];
            status[player.machine.bonusLevel] = 1;
            result["status"] = status.join();
        }
    } else if (prevGameMode == "FREE") {
        //                       
        if (player.machine.tumbleStatus == "TUMBLE") {
            result["tw"] = player.machine.freeSpinWinMoney + player.machine.tmb_res;
        } else if (player.machine.tumbleStatus == "NOTUMBLE") {
            result["tw"] = player.machine.freeSpinWinMoney;
        }
        if (player.machine.freeSpinMore != 0) {
            result["fsmore"] = 5;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    return result;
};

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance_bonus: "0.0",
        balance_cash: player.balance,
        balance: player.balance,
        counter: ++param.counter,
        index: param.index,
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
    };

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        tw: "0.00",
        bgid: "1",
        wins: "4,6,8,10,12",
        coef: player.virtualBet,
        balance_bonus: "0.00",
        bgt: "35",
        wins_mask: "nff,nff,nff,nff,nff",
        wp: "0",
        sver: "5",
        end: 0,
        lifes: 1,
        na: "b",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["level"] = player.machine.bonusLevel > 0 ? player.machine.bonusLevel - 1 : 0;

    var status = [0, 0, 0, 0, 0];
    status[player.machine.bonusLevel] = 1;
    result["status"] = status.join();

    if (player.machine.bonusEnd) {
        if (player.machine.bonusLevel >= 0) {
            result["na"] = "s";
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["rw"] = player.machine.freeSpinWinMoney;
            result["end"] = 1;
        } else {
            result["na"] = "s";
            result["rw"] = player.machine.freeSpinWinMoney;
            result["status"] = "1,0,0,0,0";
            result["end"] = 1;
            result["level"] = 1;
            result["lifes"] = 0;
        }
    } else {
        result["na"] = "b";
    }

    return result;
};

module.exports = ApiManager;
