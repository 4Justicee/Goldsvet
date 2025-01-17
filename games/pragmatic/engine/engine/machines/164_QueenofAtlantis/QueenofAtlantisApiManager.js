var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "3,5,4,8,1,10,6,10,5,7,8,9,6,9,8,6,7,8,9,10",
        balance: "100,000.00",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        reel_set_size: "3",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1;14~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1",
        gmb: "0,0,0",
        stime: "1646354418879",
        sc: "5, 10,20,40,50,100,250,500,1000,2000",
        defc: "40",
        pos: "0,0,0,0,0",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "40",
        sver: "5",
        n_reel_set: "0",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,50,25,5,0;75,50,25,0,0;75,50,25,0,0;75,30,15,0,0;75,30,15,0,0;50,25,10,0,0;50,25,10,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,0,0;50,10,5,2,0;0,0,0,0,0",
        l: "50",
        rtp: "96.42",
        reel_set0: "7,6,9,8,12,6,3,3,3,3,3,3,3,3,7,4,11,13,7,13,13,8,10,10,10,8,6,11,9,6,12,11,4,7,8,13,4,11,13,5,13,13,6,7,1,9,7,6,8,8,9,11,12,5,11,1,10,10,5,5,10,12,7,4,6,13,4,8,4,5,9,13,11,13,13,12,12,10,9,13,10,9,10,8,8,10,11,13,10,8,13,12,12,6,4,7,6,6,4,9,8,1,8,5,13,13,10,13,7,10,10,7,9,4,13,13,10,13,8,4,6,4,11,5,9,6,5,5,7,11,8,9,1,9,11,11,10,11,13,6,7,8,11,11,7,11,12,10,7,10,7,5,5,13,10,13,1,8,5,10,4,7,5,6,10,5,8,12,9,12,12,10,4,11,13,10,13,7,3,3,3,3,3,3,3,3,9,8,4,8,11,13,10,6,5,4,11,1,7,6,8,8,12,6,12,5,10,7,10,6,8,13,6,9,4,8,12,11,4,6,10,5,7,9,11,5,6,5,7,1,4,8,11,11,6,7,5,8,4,5,11,8,8,10,7,4,9,8,5,1,4,12,10,8,4,5,4,13,8,13,10,4,10,12,8,9,11,9,4,8,11,5,13,4,11,11,12,7,10,13~6,11,6,8,4,11,3,3,3,3,3,3,3,3,11,6,7,9,6,11,8,2,6,10,10,13,6,6,13,7,13,6,10,12,2,5,13,7,4,5,6,5,5,4,1,5,7,9,4,10,9,9,8,5,12,1,12,5,13,13,8,7,9,13,6,6,11,8,2,5,8,7,6,11,8,4,11,4,8,12,7,11,10,13,13,10,2,10,9,5,12,7,8,9,5,9,12,7,9,6,6,1,8,12,12,10,10,5,4,11,4,4,11,11,12,5,2,12,4,7,4,8,9,12,10,12,5,8,11,5,12,6,1,11,6,13,13,12,13,7,5,10,12,2,12,7,4,10,5,11,9,6,11,6,9,11,1,9,11,13,5,7,4,13,5,13,13,2,8,5,7,13,11,11,9,13,10,10,3,3,3,3,3,3,3,3,6,4,10,8,5,13,4,6,13,8,13,1,12,13,13,12,11,2,11,5,7,6,9,2,10,8,12,10,4,12,8,11,13,13,11,2,9,9,8,13,9,4,10,1,5,9,10,12,5,4,2,9,7,13,6,13,7,9,5,10,5,6,11,1,12,11,9,11,6,11,5,2,4,4,9,8,4,11,11,9,5,4,12,2,6,9,13,4,6,10,4,7,5,13~10,8,13,10,12,4,3,3,3,3,3,3,3,3,12,6,8,13,13,12,12,2,7,5,10,13,9,5,9,6,13,5,10,8,2,13,13,4,11,4,8,12,12,13,1,12,8,9,13,6,7,5,9,13,7,1,11,12,10,10,12,11,11,6,9,4,6,6,2,11,5,13,13,9,11,9,7,4,12,5,10,4,10,11,11,13,2,12,13,12,7,11,7,13,8,7,13,13,13,8,5,1,12,12,4,9,9,9,7,11,6,4,6,8,4,7,2,11,5,10,8,11,12,12,6,6,5,9,9,10,7,5,1,6,10,6,9,12,7,13,12,4,5,2,5,10,9,4,5,4,7,5,12,10,12,11,1,11,12,6,6,12,6,6,4,6,11,2,9,10,8,7,11,11,13,9,10,13,3,3,3,3,3,3,3,3,7,6,13,12,11,13,4,7,11,13,13,1,4,13,4,7,12,2,9,7,10,12,7,2,5,10,12,5,10,12,6,11,7,11,6,2,7,7,9,12,5,8,5,1,13,11,6,12,9,6,2,8,10,8,10,11,12,10,8,8,12,7,10,1,13,5,4,12,6,11,12,2,12,10,5,8,9,9,7,6,8,7,5,2,7,10,12,12,6,9,8,11,10,13~13,9,8,13,12,6,3,3,3,3,3,3,3,3,7,7,8,7,10,10,4,2,11,11,9,10,13,10,5,7,4,10,8,13,2,4,11,6,5,11,8,12,10,12,1,9,11,8,8,12,11,7,9,9,10,1,6,7,13,13,7,8,4,12,5,8,13,13,8,7,9,6,9,9,11,11,12,6,6,12,8,4,11,7,12,6,2,5,11,12,12,13,8,8,5,10,6,6,12,8,10,1,8,11,9,9,9,13,10,9,13,12,11,7,13,13,2,11,7,6,6,11,5,12,11,10,8,4,4,12,4,8,1,8,10,7,6,7,9,7,6,5,4,2,7,8,7,5,12,11,9,7,4,6,6,9,1,11,10,8,6,12,12,10,10,4,10,2,13,12,7,4,10,6,13,13,4,13,3,3,3,3,3,3,3,3,10,11,4,5,9,13,5,6,5,4,5,1,13,9,6,12,12,2,9,9,13,13,5,2,13,13,8,11,10,9,12,10,9,13,7,2,5,5,8,10,7,9,13,1,13,5,12,10,7,4,2,4,13,5,4,12,8,7,10,10,5,11,12,1,11,11,5,13,12,11,12,2,8,13,6,13,11,11,4,10,5,4,5,2,6,10,13,12,6,5,4,11,10,13~13,4,9,6,6,12,3,3,3,3,3,3,3,3,5,7,13,4,7,11,10,12,12,5,6,5,5,8,12,11,6,5,4,8,5,7,12,7,9,6,11,9,11,12,9,13,8,8,13,10,7,13,6,5,9,14,7,12,6,7,4,6,8,10,12,13,7,12,7,12,9,13,12,10,6,7,10,4,5,8,8,9,13,5,5,10,13,11,6,11,9,7,4,13,7,10,12,8,12,13,13,8,11,13,5,6,6,6,13,12,10,9,11,12,13,8,12,7,12,10,6,13,5,8,9,12,9,12,12,6,10,5,13,13,4,12,6,4,8,9,6,12,10,11,11,10,10,12,6,5,13,11,7,8,13,11,1,10,6,12,9,10,10,9,4,5,11,13,10,6,8,5,5,10,12,8,4,9,3,3,3,3,3,3,3,3,9,9,6,13,12,12,9,11,10,4,13,12,11,9,13,10,13,6,13,8,10,11,5,11,13,7,8,8,4,8,12,8,13,11,8,9,6,4,9,6,12,5,13,7,7,11,8,13,13,9,8,12,11,12,7,7,9,10,8,12,7,11,5,1,9,10,7,4,11,5,10,4,12,11,8,12,13,10,7,13,10,11,13,8,11,9,13,4,11,10,4,11,10,13",
        s: "3,5,4,8,1,10,6,10,5,7,8,9,6,9,8,6,7,8,9,10",
        reel_set2: "7,6,9,8,12,6,3,3,3,3,3,3,3,3,3,4,11,5,7,4,13,3,3,3,3,3,3,8,5,10,4,8,5,11,4,6,12,11,4,7,8,13,4,3,3,3,3,3,3,3,3,3,3,11,13,5,13,13,6,7,1,9,3,3,3,3,3,3,3,5,3,1,10,10,5,5,10,12,7,4,6,13,4,8,4,5,9,13,11,13,13,12,12,10,9,13,10,9,10,8,8,10,3,11,13,10,8,13,12,12,6,4,7,6,6,4,9,8,1,8,5,13,13,3,3,3,3,3,3,3,10,10,7,9,4,13,13,10,13,8,4,6,4,11,5,3,3,3,3,3,7,11,8,9,1,9,11,11,10,11,13,6,7,8,3,11,11,7,11,12,10,7,10,7,5,5,13,10,13,1,8,5,10,4,7,5,6,10,3,5,8,12,9,12,12,10,4,11,13,10,13,7,3,3,3,3,3,3,3,3,3,9,8,4,8,11,13,10,6,5,4,3,3,11,3,3,3,1,3,3,7,6,8,8,12,6,12,5,10,7,10,6,8,13,6,3,3,3,3,3,3,3,3,3,4,6,10,5,7,9,11,5,6,5,7,1,4,8,11,11,6,7,5,8,4,5,11,8,3,3,3,3,3,3,3,3,3,3,8,3,10,3,7,4,9,8,5,1,4,12,10,8,4,5,4,13,8,13,10,4~6,11,6,8,4,11,3,3,3,3,3,3,3,3,11,3,3,9,6,11,8,3,3,3,3,3,3,3,6,10,10,13,6,6,13,7,13,6,10,12,7,3,5,3,3,3,3,13,3,3,3,3,7,3,4,5,6,5,5,4,1,3,3,3,3,3,3,9,3,3,8,5,12,1,12,5,13,13,8,7,9,3,13,3,3,6,11,8,13,5,8,7,6,11,8,4,11,4,8,12,7,11,10,13,13,10,13,10,9,5,12,7,8,9,5,9,12,7,9,6,6,1,3,3,3,3,3,3,3,4,11,4,4,11,11,12,5,3,12,4,7,4,8,3,3,3,3,3,3,5,8,11,5,12,6,1,11,6,13,13,12,13,7,5,10,12,7,12,7,4,10,5,11,9,6,11,6,9,11,1,9,11,13,5,7,4,13,5,13,13,3,8,5,7,13,11,11,9,13,10,10,3,3,3,3,3,3,3,3,3,3,3,3,6,4,10,8,5,13,4,6,13,8,3,13,1,12,3,13,13,12,11,3,11,5,7,6,9,3,10,8,12,10,4,12,8,3,3,3,3,3,3,3,3,9,9,8,13,9,4,10,3,1,5,9,10,3,3,3,3,3,3,3,7,13,6,13,3,7,3,3,3,3,3,3,3,3,3,3,9,5,10,5,6,11,1,12,11,9,11,6,11,5,2,5,4,9,8,4,11~10,8,13,10,12,4,3,3,3,3,3,3,3,3,3,6,8,13,13,12,12,3,3,3,3,3,3,8,7,5,10,13,9,5,9,6,13,5,10,8,6,13,3,3,3,3,3,13,3,3,3,3,4,3,11,4,8,1,12,13,3,3,3,3,3,3,9,13,6,7,5,9,13,7,1,11,12,10,10,12,11,6,9,11,6,9,4,6,6,13,11,5,13,13,9,11,9,7,4,12,5,3,10,4,10,3,3,3,3,3,6,12,13,12,7,11,7,13,8,7,3,13,3,3,3,3,3,3,3,3,4,9,9,9,7,11,6,4,6,8,4,11,3,3,3,3,3,3,11,12,12,6,6,5,9,9,10,7,5,1,6,10,6,9,12,7,3,3,3,3,13,12,4,5,5,5,10,9,4,5,4,3,7,5,12,3,10,12,11,1,11,12,6,6,12,6,6,4,6,3,3,9,10,8,7,11,11,13,9,10,13,3,3,3,3,3,3,3,3,7,6,13,12,11,13,3,4,7,11,13,13,1,4,13,4,7,12,9,9,7,10,12,3,3,5,10,12,5,10,3,3,3,3,3,3,3,7,7,9,3,3,3,3,3,5,1,13,11,6,12,9,6,7,8,10,8,3,10,3,3,3,3,3,3,3,3,3,3,11,3,3,12,10,8,8,12,7,10,1,13,5,4,12,6,11,12,2,12,3,5~13,9,8,13,12,6,3,3,3,3,3,3,3,3,7,3,8,7,10,10,4,3,3,3,3,3,3,7,11,11,9,10,13,10,5,7,4,10,8,13,3,3,7,3,3,3,3,4,3,3,3,3,3,11,6,5,11,8,12,10,12,1,9,11,3,3,3,3,3,3,11,7,9,9,10,1,6,7,13,13,7,8,4,12,6,5,8,13,13,3,8,7,9,6,9,9,11,11,12,6,6,12,8,4,11,7,5,12,6,5,5,11,12,12,13,8,8,5,10,6,6,12,8,10,1,8,11,9,9,9,13,10,9,13,12,11,7,13,13,11,3,3,3,3,3,3,3,12,11,10,8,4,4,12,4,8,1,8,10,7,6,7,9,7,6,5,4,3,7,7,8,7,5,12,11,9,7,4,6,6,3,9,1,11,10,8,6,12,12,10,10,4,10,6,13,12,7,4,10,6,13,13,4,13,3,3,3,3,3,3,3,3,3,10,11,4,5,9,13,5,6,5,4,5,1,13,3,3,3,9,6,12,12,8,9,9,13,13,5,3,3,13,8,11,10,9,12,10,9,13,7,9,5,5,8,10,7,3,3,3,3,3,3,3,12,10,3,3,7,4,8,4,13,5,4,12,8,3,7,3,3,3,3,3,3,3,3,3,3,10,3,10,5,11,12,1,11,11,5,13,12,11,3,2,8,13,6,13,11,11~13,4,9,6,6,12,3,3,3,3,3,3,3,3,3,7,13,4,7,11,10,3,3,3,3,3,3,12,12,5,6,5,6,8,12,11,6,5,4,8,5,7,3,3,3,3,3,3,3,3,3,3,12,7,9,1,11,9,11,12,9,3,3,3,3,3,3,3,7,13,6,5,9,4,7,12,6,7,4,6,8,10,12,13,7,12,7,12,9,13,12,10,6,7,10,4,5,8,8,9,13,5,3,3,3,3,3,11,6,11,9,7,4,13,7,10,12,8,12,13,13,8,11,13,5,5,10,13,11,6,13,12,10,9,11,12,13,8,12,7,12,10,6,13,6,5,8,9,3,12,9,12,12,6,10,5,13,13,4,12,3,3,6,4,8,9,6,12,10,11,11,10,10,12,6,5,13,11,7,8,13,11,3,3,3,1,10,6,3,12,9,10,10,9,4,5,11,13,10,6,8,5,5,3,10,3,3,12,3,8,4,9,3,3,3,3,3,3,3,3,9,3,9,3,6,13,3,12,12,9,11,10,4,13,12,11,9,13,10,13,6,13,8,10,11,5,11,13,7,8,8,4,8,12,8,13,11,8,9,6,4,9,6,12,5,13,7,3,3,11,8,13,13,9,8,12,11,12,3,3,3,3,3,3,3,3,3,3,7,3,7,9,10,8,12,7,11,5,1,9,10,7,4,11,5,10,4,12,11,8",
        t: "243",
        reel_set1: "7,6,9,8,12,6,3,3,3,3,3,3,3,3,7,4,11,13,7,13,13,8,10,10,10,8,6,11,9,6,12,11,4,7,8,13,4,11,13,5,13,13,6,7,1,9,7,6,8,8,9,11,12,5,11,1,10,10,5,5,10,12,7,4,6,13,4,8,4,5,9,13,11,13,13,12,12,10,9,13,10,9,10,8,8,10,11,13,10,8,13,12,12,6,4,7,6,6,4,9,8,1,8,5,13,13,10,13,7,10,10,7,9,4,13,13,10,13,8,4,6,4,11,5,9,6,5,5,7,11,8,9,1,9,11,11,10,11,13,6,7,8,11,11,7,11,12,10,7,10,7,5,5,13,10,13,1,8,5,10,4,7,5,6,10,5,8,12,9,12,12,10,4,11,13,10,13,7,3,3,3,3,3,3,3,3,9,8,4,8,11,13,10,6,5,4,11,1,7,6,8,8,12,6,12,5,10,7,10,6,8,13,6,9,4,8,12,11,4,6,10,5,7,9,11,5,6,5,7,1,4,8,11,11,6,7,5,8,4,5,11,8,8,10,7,4,9,8,5,1,4,12,10,8,4,5,4,13,8,13,10,4,10,12,8,9,11,9,4,8,11,5,13,4,11,11,12,7,10,13~6,11,6,8,4,11,3,3,3,3,3,3,3,3,11,6,7,9,6,11,8,2,6,10,10,13,6,6,13,7,13,6,10,12,2,5,13,7,4,5,6,5,5,4,1,5,7,9,4,10,9,9,8,5,12,1,12,5,13,13,8,7,9,13,6,6,11,8,13,5,8,7,6,11,8,4,11,4,8,12,7,11,10,13,13,10,13,10,9,5,12,7,8,9,5,9,12,7,9,6,6,1,8,12,12,10,10,5,4,11,4,4,11,11,12,5,2,12,4,7,4,8,9,12,10,12,5,8,11,5,12,6,1,11,6,13,13,12,13,7,5,10,12,7,12,7,4,10,5,11,9,6,11,6,9,11,1,9,11,13,5,7,4,13,5,13,13,2,8,5,7,13,11,11,9,13,10,10,3,3,3,3,3,3,3,3,6,4,10,8,5,13,4,6,13,8,13,1,12,13,13,12,11,2,11,5,7,6,9,2,10,8,12,10,4,12,8,11,13,13,11,2,9,9,8,13,9,4,10,1,5,9,10,12,5,4,2,9,7,13,6,13,7,9,5,10,5,6,11,1,12,11,9,11,6,11,5,2,4,4,9,8,4,11,11,9,5,4,12,2,6,9,13,4,6,10,4,7,5,13~10,8,13,10,12,4,3,3,3,3,3,3,3,3,12,6,8,13,13,12,12,2,7,5,10,13,9,5,9,6,13,5,10,8,6,13,13,4,11,4,8,12,12,13,1,12,8,9,13,6,7,5,9,13,7,1,11,12,10,10,12,11,11,6,9,4,6,6,13,11,5,13,13,9,11,9,7,4,12,5,10,4,10,11,11,13,6,12,13,12,7,11,7,13,8,7,13,13,13,8,5,1,12,12,4,9,9,9,7,11,6,4,6,8,4,7,2,11,5,10,8,11,12,12,6,6,5,9,9,10,7,5,1,6,10,6,9,12,7,13,12,4,5,5,5,10,9,4,5,4,7,5,12,10,12,11,1,11,12,6,6,12,6,6,4,6,11,2,9,10,8,7,11,11,13,9,10,13,3,3,3,3,3,3,3,3,7,6,13,12,11,13,4,7,11,13,13,1,4,13,4,7,12,2,9,7,10,12,7,2,5,10,12,5,10,12,6,11,7,11,6,2,7,7,9,12,5,8,5,1,13,11,6,12,9,6,7,8,10,8,10,11,12,10,8,8,12,7,10,1,13,5,4,12,6,11,12,2,12,10,5,8,9,9,7,6,8,7,5,2,7,10,12,12,6,9,8,11,10,13~13,9,8,13,12,6,3,3,3,3,3,3,3,3,7,7,8,7,10,10,4,8,11,11,9,10,13,10,5,7,4,10,8,13,7,4,11,6,5,11,8,12,10,12,1,9,11,8,8,12,11,7,9,9,10,1,6,7,13,13,7,8,4,12,5,8,13,13,8,7,9,6,9,9,11,11,12,6,6,12,8,4,11,7,12,6,5,5,11,12,12,13,8,8,5,10,6,6,12,8,10,1,8,11,9,9,9,13,10,9,13,12,11,7,13,13,2,11,7,6,6,11,5,12,11,10,8,4,4,12,4,8,1,8,10,7,6,7,9,7,6,5,4,7,7,8,7,5,12,11,9,7,4,6,6,9,1,11,10,8,6,12,12,10,10,4,10,2,13,12,7,4,10,6,13,13,4,13,3,3,3,3,3,3,3,3,10,11,4,5,9,13,5,6,5,4,5,1,13,9,6,12,12,2,9,9,13,13,5,2,13,13,8,11,10,9,12,10,9,13,7,2,5,5,8,10,7,9,13,1,13,5,12,10,7,4,2,4,13,5,4,12,8,7,10,10,5,11,12,1,11,11,5,13,12,11,12,2,8,13,6,13,11,11,4,10,5,4,5,2,6,10,13,12,6,5,4,11,10,13~13,4,9,6,6,12,3,3,3,3,3,3,3,3,5,7,13,4,7,11,10,12,12,5,6,5,5,8,12,11,6,5,4,8,5,7,12,7,9,6,11,9,11,12,9,13,8,8,13,10,7,13,6,5,9,1,7,12,6,7,4,6,8,10,12,13,7,12,7,12,9,13,12,10,6,7,10,4,5,8,8,9,13,5,5,10,13,11,6,11,9,7,4,13,7,10,12,8,12,13,13,8,11,13,5,6,6,6,13,12,10,9,11,12,13,8,12,7,12,10,6,13,5,8,9,12,9,12,12,6,10,5,13,13,4,12,6,4,8,9,6,12,10,11,11,10,10,12,6,5,13,11,7,8,13,11,1,10,6,12,9,10,10,9,4,5,11,13,10,6,8,5,5,10,12,8,4,9,3,3,3,3,3,3,3,3,9,9,6,13,12,12,9,11,10,4,13,12,11,9,13,10,13,6,13,8,10,11,5,11,13,7,8,8,4,8,12,8,13,11,8,9,6,4,9,6,12,5,13,7,7,11,8,13,13,9,8,12,11,12,7,7,9,10,8,12,7,11,5,1,9,10,7,4,11,5,10,4,12,11,8,12,13,10,7,13,10,11,13,8,11,9,13,4,11,10,4,11,10,13"
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
        tw: player.machine.winMoney,
        balance: "100,116.81",
        index: "10",
        balance_cash: "100,116.81",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,9,6,9,4",
        sb: "7,3,9,8,10",
        sh: "4",
        c: player.betPerLine,
        sver: "5",
        counter: "20",
        l: "50",
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view),
    };

    //          ,                          
    var screenAbove = Util.view2String(player.machine.virtualReels.above);
    var screenBelow = Util.view2String(player.machine.virtualReels.below);
    result["sa"] = screenAbove;
    result["sb"] = screenBelow;
    //                                 
    var winLines = player.machine.winLines;
    for (var i = 0; i < winLines.length; i++) {
        result[`l${i}`] = winLines[i];
    }
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    // multiPositions
    // multiValues
    if (player.machine.isSecondChance) {
        result["bgid"] = 0;
        result["bgt"] = 9;
        result["bw"] = 1;
        result["coef"] = 0.50;
        result["end"] = 0;
        result["level"] = 0;
        result["lifes"] = 1;
        result["n_reel_set"] = 0;
        result["rw"] = 0.00;
        result["status"] = '0,0,0';
        result["wins_mask"] = 'h,h,h';
        result["wins"] = '0,0,0';
        result["wp"] = 0;
        result["na"] = "b";
    }

    if (player.machine.multiPositions.length > 0) {
        result["gwm"] = player.machine.multiValues.join();
        result["wdrm_v"] = `2~${player.machine.multiPositions.join()}~${player.machine.multiValues.join()}`;
        result["wdrm_m"] = 's~p~m';
    }

    if (prevGameMode == "BASE") {
        //                                   ,                    
        if (player.machine.currentGame == "FREE") {
            result["fs"] = 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fsres"] = 0.0;
            result["fswin"] = 0.0;
            result["na"] = "s";
            if (player.machine.isSuperFreeSpin) {
                result["fstype"] = 'sfs';
            }
        }
    } //                       
    else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;
        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            if (player.machine.fsMore != 0) {
                result["fsmore"] = player.machine.fsMore;
            }
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    return result;
};

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        balance_cash: player.balance,
        balance: player.balance,
        index: param.index,
        na: "b",
        stime: new Date().getTime(),
        sver: "5",
        bgid: 0,
        bgt: 9,
        bw: 1,
        coef: 0.50,
        end: 1,
        level: 1,
        lifes: 0,
        na: "c",
        rw: 0.00,
        wp: 0
    };

    result["status"] = player.machine.bonusChanceStatus;
    result["wins_mask"] = player.machine.bonusChanceWinsMask;
    result["wins"] = player.machine.bonusChanceWins;

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
        counter: "2",
    };

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["stime"] = new Date().getTime();
    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

module.exports = ApiManager;
