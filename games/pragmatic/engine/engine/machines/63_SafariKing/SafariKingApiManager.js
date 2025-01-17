var Util = require('../../../utils/slot_utils');

function ApiManager() { };

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "5,6,7,8,6,5,6,7,8,6,10,3,4,11,5,11,8,9,3,11",
        prg_m: "cp,lvl,tp",
        balance: "100,000.00",
        cfgs: "2752",
        ver: "2",
        prg: "0,0,1",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "21",
        def_sb: "10,11,8,1,7",
        def_sa: "8,3,2,3,13",
        prg_cfg_m: "lvl",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~4,4,4,0,0~8,8,8,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        stime: new Date().getTime(),
        sa: "8,3,2,3,13",
        sb: "10,11,8,1,7",
        reel_set10: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,12,2,3,9,2,4,10,6,7,13,2,9,2,2,2,2,2,10,2,2,6,9,11,4,8,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,2,6,9,2,2,2,10,12,11,4,13,2,1,5,2,11,7,9,2,11,5,2,2,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,2,2,2,2,12,4,2,2,2,13,11,5,13,8,12,5,10,2,2,13,4,9,2,6,11,5~10,3,3,10,4,11,5,10,7,1,12,4,10,2,2,2,8,2,2,13,6,2,8,2,2,10,5,13,9,7,10,12,5,1",
        sc: "5.00,10.00,20.00,50.00,100.00,250.00,500.00,1000.00,3000.00,5000.00",
        defc: "100.00",
        prg_cfg: "0",
        reel_set11: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,9,12,8,3,2,2,2,3,4,2,2,10,6,2,7,13,10,2,2,6,11,9,4,8,2,6,2,2,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,2,2,2,2,10,12,11,4,2,2,13,1,12,2,2,9,5,11,7,9,4,11,5,13,4,9,7,10,4,9,11~3,3,3,3,3,10,4,8,6,11,9,2,2,7,2,12,4,13,11,2,2,13,8,12,5,10,2,2,13,2,2,4,9,2,2,6,11,5~10,3,3,10,4,11,5,10,7,1,2,2,2,2,2,6,2,8,4,10,2,2,2,2,6,10,5,13,2,2,9,7,8,10,12,5,1",
        reel_set12: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,9,12,2,2,2,2,8,3,3,4,10,6,7,13,10,2,9,2,6,11,4,8,13,2,2,9,2,2,10,6,13,5,2,2,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,10,12,11,2,2,2,2,4,13,2,2,2,2,1,5,2,2,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,2,2,2,2,2,2,2,2,11,5,13,8,12,5,10,2,2,13,4,2,2,9,6,11,5~10,8,3,3,10,4,11,5,2,2,2,2,10,7,2,2,2,1,12,4,8,10,2,13,6,10,5,13,9,7,2,2,2,2,10,12,5,1",
        reel_set13: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,9,5,12,8,3,3,2,2,2,2,4,10,2,2,2,6,7,13,10,2,2,9,6,11,2,2,2,2,4,8,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,1,6,9,2,2,10,2,12,11,2,2,2,4,13,1,2,2,2,5,11,2,2,2,7,9,2,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,2,2,2,2,11,2,5,13,8,12,5,10,2,2,13,4,2,2,2,9,6,2,2,2,11,2,2,2,8,5~10,3,3,10,8,4,11,5,10,7,1,12,4,2,2,2,8,2,2,2,10,2,13,6,10,2,2,2,5,13,2,2,2,9,7,10,12,5,1",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        reel_set18: "3,3,3,3,3,9,5,8,4,10,6,9,7,11,5,12,6,9,4,11,5,10,12,9,4,12,6,10,7,9,11,5,10,1,12,4,13,6,9,10,7,11~3,3,3,3,3,8,4,10,6,13,5,12,8,4,10,6,8,7,13,9,5,10,2,2,2,2,2,2,2,2,2,2,6,11,4,8,2,2,2,2,13,6,2,2,2,2,13,8,7,10,6,13,5,10,7,8,4,9,7,10,6,13~3,3,3,3,3,13,6,8,7,12,5,11,4,1,8,6,9,2,2,2,2,2,2,2,2,2,2,2,2,10,7,12,2,2,2,2,5,11,4,2,2,2,2,13,11,5,13,4,9,7,8,6,11,12,7,10,4,9,5,11,7,13,8~3,3,3,3,3,10,4,8,6,11,5,9,7,12,4,13,2,2,2,2,11,2,2,2,2,5,13,2,2,2,2,7,2,8,4,2,2,12,5,10,2,2,2,13,4,9,6,11,5,12~3,3,3,3,3,8,6,9,10,4,11,5,10,7,1,12,4,10,2,2,2,2,2,2,8,2,2,2,13,6,10,2,2,2,2,5,2,2,2,2,2,13,9,7,10,12,5,11",
        n_reel_set: "0",
        reel_set19: "3,3,3,3,3,9,5,8,4,10,6,9,11,5,12,6,9,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,10,1,12,4,13,6,9,10,7,11~3,3,3,3,3,8,4,10,6,13,5,12,8,4,10,6,8,7,13,5,9,10,2,2,2,2,2,2,2,2,2,2,2,6,11,4,8,13,6,13,2,2,2,2,8,7,2,2,2,2,10,6,13,5,10,7,8,4,9,7,10,6,13~3,6,8,7,12,5,11,4,8,6,9,2,2,2,2,2,2,2,2,2,10,7,12,5,11,4,13,1,12,6,9,5,13,2,2,2,2,2,2,2,2,11,7,9,2,2,4,11,5,13,4,9,7,1,6,11,12,7,10,4,9,5,11,7,13,8~3,3,3,3,3,10,4,8,6,11,5,9,7,12,4,2,2,2,2,2,2,2,2,2,2,13,11,5,13,7,8,4,12,5,10,2,2,2,2,13,4,2,2,2,2,9,2,6,11,5,12~3,3,3,3,3,8,6,9,10,4,11,5,10,2,2,2,2,2,2,2,2,2,1,12,4,10,8,2,2,2,2,13,6,10,5,13,2,2,2,2,9,7,2,2,10,12,5,11",
        counter: "2",
        reel_set14: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,9,2,2,2,12,8,2,2,2,3,3,4,2,2,2,10,6,7,13,10,2,2,6,11,9,4,8,2,2,13,10,6,13,2,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,2,2,2,2,2,2,2,2,2,2,2,10,12,11,4,13,2,2,2,1,5,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,7,10,4,8,6,11,9,2,2,2,2,4,13,11,5,2,2,2,13,7,8,2,2,2,12,5,2,2,7,10,2,2,13,4,9,6,11,5~10,3,3,10,4,11,5,2,2,2,8,2,2,2,2,8,10,7,9,1,12,4,10,2,13,6,10,2,2,2,5,13,9,7,2,2,2,10,2,2,2,12,5,1",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,200,40,10,0;500,150,40,4,0;500,150,40,4,0;400,125,25,0,0;400,100,20,0,0;400,75,20,0,0;300,50,20,0,0;200,40,10,0,0;200,30,10,0,0;150,20,10,0,0;150,20,10,0,0",
        l: "50",
        reel_set15: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,9,5,12,8,3,3,4,10,6,7,13,10,2,2,6,11,4,8,2,2,2,13,2,2,2,10,6,2,9,2,2,2,2,2,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,1,9,2,2,10,12,11,4,13,2,1,5,11,2,2,2,7,9,4,11,5,13,4,2,2,2,9,2,2,2,2,2,2,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,2,2,2,2,2,2,2,2,2,13,11,2,2,2,5,13,2,8,12,5,10,2,2,13,4,9,6,11,5~10,3,3,10,4,11,5,10,7,1,12,4,10,2,8,13,6,10,5,13,9,2,2,2,2,2,5,2,2,2,7,10,2,2,2,12,2,2,2,5,1,8",
        reel_set16: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,12,8,3,3,4,9,10,6,7,13,10,2,2,6,11,4,2,2,2,9,2,2,2,2,2,2,2,9,2,2,13,10,2,2,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,2,2,2,2,2,2,2,6,9,2,2,10,12,11,4,13,1,5,11,7,9,4,11,5,13,4,9,2,2,2,2,2,2,7,10,2,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,2,2,2,2,2,2,12,4,13,11,5,13,8,12,5,10,2,2,2,2,2,2,2,2,2,2,13,4,9,6,11,5~10,3,3,10,4,11,5,10,7,1,12,2,2,2,2,2,2,2,4,8,10,2,13,8,6,2,2,2,2,2,5,13,9,7,10,12,5,1",
        reel_set17: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,12,8,3,3,9,4,10,2,2,2,2,2,2,2,2,7,13,9,10,2,2,6,11,4,8,2,2,2,13,9,2,2,2,10,2,2,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,1,4,6,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,12,11,4,13,1,5,11,7,9,4,11,5,2,2,2,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,2,2,2,2,2,2,2,2,2,6,11,9,7,12,4,13,11,5,13,8,12,5,10,2,2,13,2,2,2,4,9,2,2,2,6,11,5~10,3,3,10,4,11,8,5,10,7,1,12,4,10,2,13,6,2,2,2,2,2,2,2,8,2,2,10,5,13,9,7,2,2,2,10,2,2,2,12,2,5,1",
        rtp: "96.37",
        reel_set0: "3,5,8,4,10,6,9,7,11,5,1,13,12,6,5,10,7,12,1,9,4,12,6,10,7,9,13,11,5,4,3,6,13,9,10,7,11~3,3,3,11,8,4,10,2,12,6,4,4,7,10,6,8,7,13,4,8,13,6,12,13,5,10,7,11,8,4,9,12,7,13~5,3,3,3,6,5,11,4,8,6,5,9,9,10,7,12,5,11,4,13,1,8,2,12,6,9,5,13,11,7,9,13,4,9,1,8,6,11,7,13,8~3,3,3,10,4,8,6,11,5,9,7,12,4,13,11,5,13,7,8,4,12,5,10,2,13,4,9,6,11,5,12,8~4,9,3,8,6,9,10,4,11,5,10,7,2,1,12,4,6,10,5,13,9,7,9",
        s: "5,6,7,8,6,5,6,7,8,6,10,3,4,11,5,11,8,9,3,11",
        reel_set2: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,9,10,6,13,5,12,8,3,3,4,10,6,7,13,2,10,5,2,9,6,11,4,8,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,3,10,12,11,4,13,1,5,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,11,2,5,13,8,12,5,10,9,2,13,4,9,6,11,5~10,3,3,10,4,11,5,8,10,7,1,12,4,10,2,2,13,6,8,10,5,13,9,7,10,12,5,1",
        reel_set1: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,2,12,8,3,3,4,10,6,7,13,10,9,4,7,6,11,4,8,9,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,8,10,12,11,4,13,1,5,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,11,5,13,8,12,5,10,5,2,13,4,9,6,11,5~10,3,3,10,4,11,5,10,7,1,8,12,4,10,9,13,6,2,10,5,13,9,8,7,10,12,5,1",
        reel_set4: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,12,8,3,3,4,2,4,10,9,6,7,13,10,7,2,6,9,11,4,2,2,8,13,9,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,6,2,10,12,11,4,13,1,5,2,2,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,11,2,13,8,12,5,10,2,2,13,4,9,6,2,11,5~10,3,3,10,4,11,5,10,7,1,8,12,4,10,2,8,13,6,2,2,2,10,5,8,13,9,7,10,12,5,1",
        reel_set3: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,12,8,3,3,2,4,10,6,9,7,13,10,2,2,6,11,4,8,9,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,9,10,12,2,2,11,4,13,1,5,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,11,5,2,13,8,12,5,10,2,2,13,4,9,6,11,5~10,3,3,10,4,11,5,10,7,1,12,4,8,10,2,13,6,10,5,13,9,7,2,2,10,8,12,5,1",
        reel_set20: "3,3,3,3,3,9,5,8,4,10,6,9,11,5,12,6,9,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,10,1,12,4,13,6,9,10,7,11~3,3,3,3,3,8,4,10,6,13,5,12,8,4,10,6,8,7,13,5,10,2,2,9,2,2,2,2,2,2,2,2,2,6,11,4,8,13,2,2,2,2,6,13,2,2,2,2,8,7,10,6,13,5,10,7,8,4,9,7,10,6,13~3,6,8,7,12,5,11,4,8,6,9,2,2,2,2,2,2,2,2,2,10,7,12,5,11,4,13,1,12,6,9,5,13,2,2,2,2,11,2,2,2,7,9,4,11,5,13,4,2,2,2,2,9,7,1,6,11,12,7,10,4,9,5,11,7,13,8~3,3,3,3,3,10,4,8,6,11,5,9,7,12,4,2,2,2,2,2,2,2,2,2,2,13,11,5,13,7,8,4,12,5,10,2,2,2,2,13,4,2,2,2,2,9,2,2,6,11,5,12~3,3,3,3,3,8,6,9,10,4,11,5,10,2,2,2,2,2,2,2,2,2,1,12,4,10,8,2,2,2,2,13,6,10,5,2,2,2,2,2,2,13,9,7,10,12,5,11",
        reel_set6: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,2,12,8,3,2,4,10,6,7,13,10,9,2,2,6,11,4,9,2,2,8,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,2,5,11,4,6,9,2,2,10,12,11,4,13,1,2,2,5,11,7,9,4,11,5,13,4,9,2,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,2,9,7,2,4,13,11,5,13,8,12,5,10,2,2,13,4,9,2,2,6,11,5~10,3,3,10,2,4,11,5,10,2,2,7,8,1,12,4,10,2,13,6,10,5,8,2,2,13,9,7,10,12,5,1",
        reel_set5: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,5,12,8,3,3,4,2,9,10,6,7,13,10,2,2,6,11,9,4,8,13,10,6,13,5,10,7,2,2,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,2,10,12,2,2,11,4,13,1,5,11,7,9,4,11,5,13,4,9,7,10,4,9,11,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,3,2,2,2,13,11,5,13,8,12,5,10,2,2,13,4,9,6,11,5~10,3,3,10,4,11,8,8,2,2,5,10,7,1,12,4,10,2,8,13,6,10,5,13,9,7,2,2,8,10,12,5,1",
        reel_set8: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,9,5,2,12,8,3,3,4,10,2,2,6,7,2,13,9,10,2,2,6,11,9,4,8,13,10,6,13,5,10,2,2,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,10,12,11,4,13,1,5,2,2,9,7,9,2,11,5,2,4,9,2,2,7,10,4,9,11,13~3,3,3,3,3,10,4,8,2,2,2,6,11,9,7,12,4,2,2,13,11,5,2,8,12,5,10,2,2,13,4,9,6,11,5~10,3,3,10,4,11,5,10,7,1,12,4,10,2,8,13,2,2,6,10,5,2,2,13,9,2,2,7,8,2,10,12,5,1",
        reel_set7: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,9,10,7,11~3,3,3,8,4,10,6,13,9,5,12,2,2,8,3,3,2,4,10,6,7,13,9,10,2,2,6,11,2,2,4,8,13,10,6,13,5,10,7,8,4,7,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,2,10,12,11,2,4,13,1,9,2,11,7,9,4,2,5,13,4,9,7,10,4,9,11,7~3,3,3,3,3,10,4,8,6,2,9,7,12,4,13,11,5,2,13,8,12,5,10,2,2,2,13,4,9,6,2,2,11,5~10,3,3,10,4,11,5,10,7,2,2,1,8,12,2,4,2,10,2,8,13,6,10,5,13,9,7,10,12,5,2,2,1",
        reel_set9: "3,3,9,5,8,4,3,3,3,10,6,9,7,11,12,6,4,11,5,10,7,12,9,4,12,6,10,7,9,11,5,1,12,4,13,6,10,7,11~3,3,3,8,9,4,10,6,13,5,12,8,2,3,2,5,3,4,10,6,9,7,13,10,2,2,6,11,4,8,2,2,2,13,10,2,6,13,5,10,7,8,4,2,10,6,13~4,8,11,3,3,13,6,8,7,12,5,11,4,6,9,2,2,10,2,2,12,11,4,13,1,2,2,5,11,2,7,9,4,11,5,13,4,2,2,9,7,10,4,9,7,13~3,3,3,3,3,10,4,8,6,11,9,7,12,4,13,11,5,13,8,12,5,10,2,2,2,2,13,4,9,6,11,2,2,2,2,2,5~10,3,3,10,4,11,5,10,7,2,1,8,12,4,10,2,13,6,2,2,10,5,13,2,2,9,7,8,10,12,5,12,2,2,2"
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
        sh: "4",
        sver: "5",
        c: player.betPerLine,
        counter: "1",
        index: "1",
        l: "50",
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
        prg_m: "cp,lvl,tp",
        prg: "0,0,1",
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

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0;
            result["fswin"] = 0;
            result["na"] = "s";
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["reel_set"] = Util.min(player.machine.freeSpinIndex - 1, 20);
        result["prg"] = `${Util.min(player.machine.freeSpinIndex - 1, 19)}~${Util.min(player.machine.freeSpinIndex - 1, 19)}~${Util.min(player.machine.freeSpinIndex, 19)}`;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            if (player.machine.freeSpinMore > 0) {
                result["fsmore"] = player.machine.freeSpinMore;
            }
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

module.exports = ApiManager;