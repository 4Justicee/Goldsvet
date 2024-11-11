var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        def_s: "13,4,8,9,13,5,10,3,6,7,4,8,10,7,6,12,8,9,11,4",
        balance: "100,000.00",
        nas: "13",
        cfgs: "1",
        ver: "2",
        index: "1",
        balance_cash: "100,000.00",
        def_sb: "4,12,4,7,8",
        reel_set_size: "12",
        def_sa: "10,3,5,3,7",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        scatters: "1~0,0,0,0,0~8,8,8,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: '{rtps:{regular:"96.55"},props:{max_rnd_sim:"1",max_rnd_hr:"1000612",max_rnd_win:"5000"}}',
        wl_i: "tbm~5000",
        stime: "1645524774330",
        sa: "10,3,5,3,7",
        sb: "4,12,4,7,8",
        reel_set10: "12,10,3,11,9,8,5,7,4,6,4,8,9,8,10,8,10,3,10,3,5,7,9,3,9,8,10,7,8,7,8,10,4,8,4,6,4,10,8,6,4,6,8,10,9,7,9,8,5,10,3,10,7,4,5,9,3,5,8,4,8,4,9,3,10,4,9,10,4,8,4,3,4,7,4,6,4,8,3,8,4,8,4,3,6,10,3,10,8,4,8,4,8,9,6,10,8,4,10,11,3,4,8,3,4,6,8,3,8,4,8,9,4,3,8,9,8,9,8,4,8,4,3,4,9,8,4,10,6,4,9,10,9,8,10,4,10,8,11,3,4,8,9,8,3,4,10,6,10,4,11,8,3,10,9,8,3,9,11,4,8,10,6,10,6,3,6,8,4~7,4,10,12,11,9,6,8,3,5,8,11,3,11,5,3,11,6,9,11,5,11,4,9,10,11,4,11,5,3,10,11,12,9,10,6,3,5,4,3,8,9,11,8,11,6,5,4,5,11,12,6,5,11,10,6,3,12,9,10,5,11,3,11,5,11,9,8,11,5,3,11,10,9,11,9,10,8,11,6,3,10,6,10,6,11,6,4,3,6,12,3,11,9,6,12,4,9,8,9,10,9,3,9,4,9,12,3,9,10,11,4,10,11,9,4,11,4,3,11,9,4,9,10,4,9,8,12,8,5,3,9,5,8,9,4,9~8,3,4,10,12,9,11,6,5,7,4~11,5,9,3,12,10,4,8,7,6,9,12,4,12,9,8,4,3,4,8,4,12,4,12,4,12,9,4,6,4,8,10,4,12,9,12,4,9,6,4,5,12,7,8~10,9,8,4,5,7,6,11,3,12,6,11,6,3,11",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        reel_set11: "11,7,4,9,8,5,10,3,12,6,9,6,9,10,9,10,6,8,7,10,12,9,4,9,8,10,8,10,9,10,9,12,9,10,8,6,10,8,6,10,8,6,10,9,8,10,6,10,9,10,4,9,6,8,5,10,9,10,12,6,9,4,10,6,10,4,8,9,6,12,9,6,4,10,9,10,12,8,10,9,7~11,5,4,10,12,6,9,7,3,8,7,6,4,12,9,7,10,7,4,3,7,5,7,12,9,7,9,7,12,5,9,6,7,12,8,4,9,7,9,4,9,7,9,7,3,4,3,4,3,4,7,8,12,4,9,6,9,4,9,7,9,10,12,9,3,4,12,9,12,3,5,4,9,12,4,9,12,3,4,8,9,5,4,9,12,7,6,9,12,5,7,3,9,6,5,9,4,9,4,7,3,4,7,9,4,7,9,6,9,4,9,7,3,9,7,3,4,7,8,12,7,3,4,7,9,3,7,8,9,4,8,9,7,9,4,9,5,4,6,7,9,7,3,9,6,4,7,4,3,4,9,10,3,7,12,7,9~5,3,10,7,8,9,11,4,6,12,4,9,4,9,11,9,4,6,4,11,4,9,4,7,4,6,11,4,9,7,9,3,9,11,7,4,9,4,11,4,6,9,8,4,11,8,4,11,8,6,9,4,11,4,9,11,6,11,4,6,9,4,9,11,7,4,9,11,4,8,7,11,8,11,7,9,4,6,4,9,4,3,8,3,8,4,11,8,4,11,4,8,4,3,11,8,11,4,11,8,6,11,6,4,8,4,11,9,4,11,8,12,11,9,8,9,11,9,3,4,9,8,11,4,11,9,11,9,6,11~8,12,7,3,6,10,4,9,11,5,12,4,7,12,3,4~12,9,6,3,8,7,5,10,4,11,10,9,11,10,11,3,10,11,4,7,3",
        sh: "4",
        wilds: "2~0,0,0,0,0~1,1,1,1,1;14~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        counter: "2",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;100,20,5,0,0;60,12,4,0,0;50,12,4,0,0;40,10,3,0,0;30,10,3,0,0;25,7,2,0,0;25,7,2,0,0;20,5,1,0,0;20,5,1,0,0;20,5,1,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        rtp: "96.55",
        reel_set0: "11,7,8,15,10,5,9,6,4,3,12,15,12,8,15,12,3,6,3,6,4,15,6,15,10,15,3,8,15,4,15,3,4,8,6,8,6,12,4,15,12,15,8,15,5,8,6,3,8,6,3,8,15,6,15,4,3,8,3,8,5,8,4,15,8,12,3,6,8,12,3,6,5,8,15,5,12,8,6,3,6,8,15,6,15,8,6,4,5,6,8,4,6,12,8,6,9,6,8,15,3,5,6,4,6,15,4,15,8,3,6,8,15,4,15,8,6,10,5~9,3,12,7,8,1,4,6,10,5,11,7,5,12,8,10,8,10,8,7,8,11,1,12,8,3,12,1,11,8,3,12,10,7,12,8,12,8,10,12,7,8,12,8,12,7,12,8,12,3,12,3,7,8,4,10,11,12,6,12,8,11,8,7,12,5,12,8,10,7,11,5,6,11,4,12,8,1,8,12,7,1,8,3,8,1,7,12,6,8,10,12,7,10,11,12,1,6,1,3,1,6,8,6,11,12,10,5,10,12,7,6,8,7~8,1,4,12,7,9,3,6,5,11,10,9,4,9,11,9,11,9,10,9,1,6,11,9,11,4,10,9,12,7,9,4,9,12,10,9,4,9,12,9,12,10,9,4,9,10,12,4,11,1,4,9,4,9,10,11,10,4,10,4,9,10,1,6,10,9,11,9,10,11,1,4,10,11,9,11,4,11,9,11,9,4,9,4,9,11,9,4,1,4,10,9,11,9,11,5,12,1,12~12,7,11,8,6,9,3,5,10,1,4,7,6,7,1,9,3,6,7,3,1,7,11,4,3,7,6,3,1,6,7,3,6,3,9,1,11,3,6,3,10,4,6,8,6,8,7,9,11,10,5,7,10,6,4,3,4,3,6,3,7,6,10,4,3,11,6,4,10,11,8,4,11,1,3,11,6,11,9,4,10,3,9,4,6,10,7,3,7,6,7,10,9,6,7,3~5,3,9,12,7,6,15,10,11,8,4,11,7,11,10,4,10,15,6,11,9,4,11,6,9,3,6,11,10,15,11,15,10,9,15,4,3,9,15,4,10,4,9,11,10,11,10,15,6,4,11,6,3,9,10,4,9",
        s: "13,4,8,9,13,5,10,3,6,7,4,8,10,7,6,12,8,9,11,4",
        reel_set2: "7,10,8,15,12,3,11,9,5,4,6,11,3,15,4,8,11,3,5,11,8,4,15~7,5,9,1,3,11,5,1,9,1,3,1,11,5,11,5,11,5,3,5,3,9,3~4,12,1,8,6,10,8,6,8,6,8,6,8,6,12,6,8,12,8,6,8,12,6,12,6,12,6,1,12,8,1,8,6,1,6,1,12,6,1,8,6,12,8,1,8,1,8,6,1,6,8,12,1,8,12,1,8,6,12,8,1,8,6,8,12,8,6,1,6,8,12,6,1,12,1,6,8,1,8,1,12,6,1,6,12,6,12,1,6,8,12,6,12,6,8,10,8,6,12,6,8,6,1,12,6,8,6,12,1,12,8,6,8,12,6,8,1,8,12,6,12,8,6,1,6,12,6,8,12,8,6,8,1,8,1,6,8,12,1,6,8,6,10,1,6,8,1,8,1,6,8,12,6,8,6,12,6,8,10,1,8,12,6,8,1,6,8,1,12,1,6,12,8,1,12,6,8,1,6,1,6,8,1,6,1,8,6,1,6~1,12,3,6,10,11,7,8,4,9,5,3,10,12,11,6,3,7,12,6,8,6,12,11,10,11,3,12,3,8,12,11,10,3,8,11,3,12,6,8,11,7,3,11,10,5,11,10,6,12,3,11,7,3,12,8,10,5,9,11,8,3,11,3,9,3,10,12,10,6,11,8,3,11,9,11,12~8,9,10,4,7,12,5,3,6,11,3,11,10,12",
        t: "243",
        reel_set1: "3,11,7,4,10,5,6,15,12,9,8,4,10,11,12,11,8,4,7,5,10,9,11,6,4,10,11,9,7,5,8,11,4,11,4,10,6,10,6,11,8,11,10,5,9,6,4,11,5,6,8,4,9,6,7,5,6,9,8,4,9,5,12,4,11,7,4,5,10,4,6,11,10,11,9,15,8,4,11,10,5,4,9,6,11,6,10,4,7,10,11,10,11,6,5,9,4,6,4,7,11,4,11,7,10,6,11,5,10,11,5,10,11,5,15,11,10,6,11,10,8,6,5,12,6,11,6,5,11,8,11,15,10,9,11,8,11,10,11,5,11,6,4,5,7,6,4,6,5,6,9,11,6,4,11,5,11,6,7~6,8,10,1,4,12,8,12,8,10,1,12,8,1,8,1,10,1,8,1,10,12,8,1,8,12,8,10,1,12,10,8,1,10,8,12,10,1,12,10,12,8,1,10,1,12,1,10,12,8,10,1,12,10,1,10,12,1,12,10,12,10,1,12,1,12,10,1,10,1,8,10,12,1,8,4,10,1,12,1,10,1,10,1,12,1,4,12,1,12~7,9,5,1,11,3,11,5,9,5,3,5,9,11,9,3,11,9,5,9,3,5,9,11,3,5,1,3,9,11,9,11,3,11,9,3,9,1,11,3,11,9,5,9,3,11,3,11,9,3,9,5,3,5,3,11,9,3,9,11,3,5,9,11,9,3,9,3,5,3,5,3,11,9,3,9,3,9,3,1,3,11,3,11,5,9,3,11,3,9,11,3,11,9,5,1,9,11,9,5,3,9,5,3,9,1,11,9,3,9,5,11,9,11,5,3,9,11,9,3,9,3,11,5,3,5,11,3,5,3,11,3,11,5,3,9,3,9,3,9,3,5,3,9,11,9,5,3,9,1,3,9,3,9,5,1,11,9,5,3,5,11,1,5,11,5,11,1,3,5,9,1,5,3,9,11,5,9,11,3,1,5,11,9,3,5,11,3,9,11,3,9,3,1,5,9,5,11,3,9,1,3,5,11,3,5,3,5,11,9,3,11,3,5,11~9,5,3,10,12,6,1,4,11,7,8,3,10,4,6,1,3,4,12,1,3,11,6,7,3,6,12,7,6,1,3,12,1,6,7,3,6,12,6,7,6,12,6,3,1,12,1,7,1,12,3,4,3,7,6,3,1,7,10,4,6,3,1,4,1,4,12,1,6,7,12,6,1,12,6,1,4,1,6,3,12,7,1,7,1,7,3,11,12,3,12,1,7,1,6,1,7,4,8,4~3,8,5,9,6,11,12,10,7,4,12,7,5,10,5,10,8,9,8,10,6,8,10,8,10,5,8,10,6,10,6,7,10,9,12,10,7,10,12,6,7,9,5,8,10,12,10,8,7,4,9,12,6,8,10,7,12,9,10,8,5,10,9,12,10,6,10,8,7,4,10,12,10,6,12,5,11,8,5,6,10,6,7,10,8,12,5,10,12,5,7,5,10,8,12,10,8,12,9,7,10,8,9,8,9,5,8,9,10,9,10,5,12,5,8,5,8,7,10,5,10,8,12,8,12,10,6,8,6,5,10,8,10,7,10,5,8,10,7,9,10,5,10",
        reel_set4:
            "9,5,4,8,10,15,11,6,3,7,12,3,7,15,7,10,7,15,12,15,11,3,5,10,12,15,12,4,15,7,4,3,4,7,12,7,4,5,12,7,5,11,12,7,11,15,7,5,7,5,7,5,3,7,4,8,4,5,3,4,5,7,12,5,12,8,7,12,15,5,4,7,3,7,12,7,15,5,6,8,7,15,5,7,8,15,7,11,7,4,7,4,11,5,7,12,4,7,12,15,5,12,6,7,5,8,4,11,15,12,8,4,15,4,3,7,15,4,15,5,15,7,8,11,12,4,12,15,8,7,5,7,5,7,5,12,10,8,12,15,7,15,12,11,8,7,11,12,4,5,15,5,7,8,12,5,7,4,15,6,5,12,4,15,12,5,12,8,4,5,12,3,12,8,7,5,12,8,12,5,15~4,11,5,10,6,8,12,9,7,3,9,3,12,8,5,3,6,3,9,12,9,10,9,5,12,8,9,8,3,6,8,12,8,9,12,9,6,8,9,6,8,9,12,6,8,9,12,6,8,9,10,6,8,3,12,8,11,6,10,5,8,12,8,10,5,11,10,12,10,9,6,10,3,7,10,11,6,12,9,6,10,6,8,6,10,9,11,12,10,6,3,7,9,8,11,8,9,8,12,8,6,11,8,9,8,11,8,12,10,11,9,8,6,8,9,10,11,8,11,9,11,8,9,8,9,8,9,10,8,12,6,8,10,8,11,6,12,7,9,11,8,12,11,8,12,3,10,5,10,12,3,11,10,6,8,3,12,8,10,6,3,6,5,8,9,11,9,12,6,3,8,6,12,11,7,8,12,11,7,8,10,9,6,8,12,10,8,6,8,6,5,11,12,8,6,10,8,9,10,8,12,3,7,10,5,11,10,3,8,10,6,12,3,8,3,6,8,6,8,11,10,12,6,12,10,12,6,10,3,8,10,8,6,12,7,10,3,10,12,9,10,9,11,10~5,12,6,3,10,11,9,4,7,8,10,6,10,6,10,6,11,10,6,11,6,3,9,10,3,10,11,6,3,10,3,11,10,11,12,10,11,9,3,10,3,9,12,11,6,10,11,6,11,10,6,10,9,3,10,12,6,10,3,6,3,9,12,10,7,4,10,6,3,12,10,3,11,12,11,9,12,11,3,11,3,10,12,6,9,4,10,12,9,11,12,3,10,9,12,10,6,12,8,3,6,10,9,6,3,12,3,11,9~12,3,5,11,6,8,9,4,7,10,6,10,8,4,6,10,4,10,7,10,6,11,6,4,6,7,8,4,6,4,6,8,6,4,8,6,4,6,4,6,7,4,10,8,10,6,4,5,9,4,6,9,10,4,10,6,4,7,10,6,4,11,6,10,6,10,6,8,6,10,6,10,6,8,6,4,6,10,4,6,8,9,6,7,6,4,7,6,10,4,7,6,8,4,6,7,8,4,6,4,6,7,9,4,6,7,8,6,9,4,8,9,6,8,4,5,9,6,9,10,4,9,6,4,5,6,10,6,10,7,4,8,9,5,4,6,9,6,4,10,4,8,5,6,9,10,6,8,11,10,4,6,4,6,9,6,8,7,4,8,10,4,5,4,7,4,9,10,6,10,6,4,6,4,9~5,6,11,9,8,3,12,15,7,4,10,15,6,3,4,8,3,8,3,12,10,12,7,4,12,15,12,10,12,8,3,4,7,4,3,12,3,7,15,3,10,6,10,12,3,6,15,4,7,3,12,3,7,6,9,3,8,4,8,7,12,15,3,12,15,7,12,3,4,9,15,6,8,6,9,15,4,8,12,7,6,3,12,3,12,15,12,8,3,12,3,12,3,9,4,3,8,7,15,7,6,8,3,11,3,12,8,6,12,3,11,8,15,9,3,12,7,15,3,8,3,15,3,12,7,11,7,12,9,8,6,4,7,10,3,4,9,15,3,9,7,15,4,6,15,11,3,15,6,8,3,8,7,12,4,9,10,6,3,12,4,7,15,6,3,7,6,9,7,11,8,10,12,15,4,8,12,8,7,12,3,8,15,4,8,3,6,3,12,9,10,9,8,7,8,3,7,15,4,11,15,7,12",
        reel_set3: "3,6,12,5,10,8,7,4,11,9,15,6,8,6,7,6,4,10,5,12,15,8,5,8,5,10,15,5,8,12,5,8,9,5,7,10,5,12~7,9,1,11,10,4,12,3,6,8,5,11,12,1,3,11,12,4,12,8,12,4,12,5,9,12,9,12,8,12,3,1,5,12,6,12,3,9,12,3,9,12,6,12,3,12,3,12,3,9,3,5,12,1,4,12,5,12,1,3,12,6,10,4,12,3,8,9,12,10,8,1,10,1,3,9,12,4,6,8,12,6,8,9,5,3,5,12,1,9,8,5,4,5,12,5~4,7,10,6,9,5,12,3,8,11,1,3,11,3,7,3,1,7~9,7,6,11,5,10,3,8,12,4,1,6,1,12,7,5,8,10,4,5,1,11,7,11,10,5,10,4,11,5,4,1,5,8,12,6,5,1,11,6,11,10,5,1,11,4,6,1,8,1,5,8,1,10,1,11,5,1,4,7,5,4,1,11,6,5,10,4,1,4,1,10,11,1,12,11,5,8,5,8,5,8,1,11,1,6,5,11,5,10,5,6,7,4,11,12,4,7,10,5,10,1,8,6,5,1,6,5,1,12,10,11,1,5,11,1,8,5,1,7,1,5,6,5,6,12,6,8,5,6,1,8,5,10,5,4,5,10,5,10,8,1,6,7,4,11,5,12,8,11,1,8,4,5,8,5,1,5,8,11,8,5,1,4,1,11,1,5,12,8,11,1,7,4,6,10,5,11,1,5,6,11,6,7,1,11,1,7,5,1,11,1,5,12,4,6,5,11,8,5,7,1,7,4,5,1,5,10,5,11~4,7,15,12,11,3,6,10,9,5,8,12,5,8,5,3,6,3,12,6,12,9,12,3,6,3,12,3,12,3,9,3,12,6,12,3,9,10,3,6,12,6,8,3,6,8,12,9,3,6,12,8,3,8,6,3,12,3,9,6,3,9,12,9,6",
        reel_set6: "11,15,12,8,9,10,4,6,5,3,7,15,8,6,10,15,12,4,6,3,8,15,3,5,6,4,3,15,7,8,15,12,3,8,6,12,6,4,15,5,6,5,3,6,15,3,6,4,6,15,8,15,8,15,5,15,8,4,6,3,8~3,11,5,7,9,5,9,5,9,11,9,5,9,11,9,5,9,11,9,5,11,5,9,5,9,11,5,9,5,9,11,5,9,11,5,11,5,9,5,9,5,9,11,7,5,7,11,5,9,11,9,5,9,5,7,5,11,5,9,11,5,9,11,9,11,9,5,9,5,9,11,9,11,5,9,5,9,11,9,11,9,11,5,9,5,9,11,9,5,11,5,9,11,9,11,9,11,5,7,11,9,11,5,11,9,5,9,5,11,9,11,5,9,7,9,5,11,9,5,11,7,5,9,11,9,11,5,11,5,9,11,5,11,9,11,9,11,5,7,9,11,5~4,10,6,12,8,10,8,10,12,10,6,8,10,8,10,8,6,10,8,10,6,8,6,10,8,6,10,8,6,8,6,10,8,10,6,8,10,6,10,12,10,6,12,8,10,8,10~6,5,3,11,4,7,8,12,10,9,8,5,7,3,12~5,4,7,9,10,11,8,12,6,3,6,4,8,4,8,3,10,6,10,6,3,12,10,6,10,3,4,6,12,10,6,10,12,4,6,8,3,4,10,12,6,10,3,10,6,3,12",
        reel_set5: "9,10,3,8,4,11,15,5,12,6,7,5,7,15,10,15,5,10,5,12,8,6,10,11,12,8,10,5,6,10,5,12,8,10,5,15,5,15,12,10,8,5,6,5,15,12,7,15,11,15,8,15,6,5,15,8,11,12,11,12,15,12,15,8,3,12,10,11,5,8,15,5,6,5,10,8,10,15,5,10,5,12,8,12,8,6~6,12,8,4,10,8,4,8,10,4,10,4,8,4,12,8,4,12,8,10,4,8,4,8,4,12,4,8,12,8,4,8,10,4,8,4,8,4,8,4,12,8,4,12,8,12,4,8~5,3,7,11,9,7,9,7,3,11,3,9,3,7,3,7,9,3,7,9,3,7,3,7,3,9,7,3,11,9,3,9,11,7,3,7,9,7,3,7,3,7,11,3,9,7,9,7,9,3,7,9,7,9,3,9,7,9,7,3,7,3,7,9,7,9,7,9,3,7,9,7,9,3,7,9,7,9,7,3,9,3,9,3,7,3,7,9,3,9,7,9,7,9,11,9,7,3,9,7,3,9,7,3,9,3,9,11,3,9,3,9,7,9,7,9,3,7,9,7,11,7,9,7,9,7,3,9,3,9,7,9,7,3,7,9,11,3,7,3,9,7,9,7,3,7,3,7,3,7,3,9,3,7,9,3,9,7,9~9,3,6,5,4,12,7,11,8,10,4,6,5,3,6,11,6,3,6,11,8,4,8,11,7,4,6,7,11,6,8,6,4,8,3,8,4,3,11,6,4,11,3,8,3,8,7,11,3,7,4,3,6,4,3,6,3,11,8,11,6,4,11,8,3,11,3,8,4,3,5,11,6,7,6,4,7,6,10,6,3,4,3,11,7,4,11,3,8,12,8,11,4,3,4,11,3,11,4,8,11,3,4,11,3,8,11,4,3,4,3,11,6,3,11,4,11,3,4,3,8,6,3,8,7,3,8,3,6,4,3,11,4,11,4,10,4,8,3,8,4,6,4,3,4,11,8,4,8,11,7,3,11,4,7,4,11,8,10,3,5,7,6,11,6,11,3,4,6,3,4,3,6,8,4,5,11,4,8,4,7,8,11,3,4,3,6,3,6,4,3,11,3,6,4,3,8,6,7,4,8,11,6,10,3,11,4,8,4,6,3,6,3,11,4~10,8,4,6,11,12,5,7,3,9,7,9,5,4,5,12,11,5,4,12,5,6,4,12,11,12,9,4,5,12,5,4,12,4,11,12,9,12,4,11,12,11,12,7,4,12,4,9,12,5,11,6,11,7,5,4,11,9,11,12,3,5,12,4,12,11,9,3,12,6,12,11,5,9,6,12,9,6,9,4,12,11,9,12,5,12,5,9,5,12,11,12,7,5,11,5,6,9,4,12,11,5,4,12,9,12,11,12,9,6,12,6,12,9,12,9,12,4,12,11,5,4,7,5,11,5",
        reel_set8: "11,9,15,6,7,8,12,10,3,4,5,12,5,6~3,12,4,6,9,11,7,8,5,10,11,8,11,4,10,12,7,10,4,7,6,12,10,12,5,12,6,7,12,4,6,7,8,10,7,4,7,12,4,10,11,7,5,4,7,4,12,7,4,10,4,7,10,4,12,8,5,10,7,8,4,11,6,11,4,7,4,10,12,6,12,4,12,4,10,11,5,4,7,10,7,10,5,9,11,7,11,9,12,7,11,4,7,11,6,5,4,11,7,5,7,10,12,10,11,5,10,4,11,6,7,12,11,12,11,10,12,8,7,6,10,5,10,7,10,11,12,5~6,3,9,5,7,12,8,11,10,4,10,3,11,10,3,9,5,9,11,3,10,11,9,11,5,3,5,3,5,3,8,10,11,12,11,10,3,5,3,11,3,8,11,5,11,8,10,8,10,9,5,12,8,7,11,8,9,8,5,11,3,11,5,11,4,5,8,3,11,3,9,5,10,7,12,10,11,3,5,3,8,11,10,11,12,7,9,5,9,10,9,8,5,3,11,3,8,10,8,3,9,7,11,8,10,11,7,5,12~11,6,9,3,8,7,12,4,5,10,12,9,8,4,3,7,12,3,12,5,3,8,6,12,3,6,5,6,3,12,9,5,6,12,5,3,4,3,4,5,12,6,12,5,12,3,4,7,12,5,4,12,5,6,5,10~3,15,7,8,4,9,11,6,12,10,5,15,4,12,9,4,5,11,4,7,8,9,15,10,15,12,5,7,11,10,7,4,8,6,9,5,11,7,9,7,4,12,11,7,11,10,7,15,7,9,4,5,7,5,7,5,6,5,6,8,15,9,12,15,6,4,5,9,5,11,5,7,5,7,5,4,8,7,9,15,4,15,9,12,4,7,11,9,7,6,7,4,12,5,4,7,15,7,6,7,10,7,12,6,10,5,15,4,15,4,7,11,12,6,4,5,4,8,7,11,5,11,6,5,10,12,7,5,11,4,5,9,8,5,15,5,15,7,11,7,9,5,15,10,5,12,10,5,9,11,8,5,7,8,12,11,7,4,5,10,7,5,10,4,6,8,15,5,10,11,12,8,5,7,5,8,12,6,9,11,10,15,5,10,5,11,9,8,4,6,5,15,8,12,6,4,5,10,7,9,8,12,7,9,8,7,11,10,4,11,9,4,11,9,10,6,12,7,4,6,10,4,9,6,7,11,4,8,7,15,4,12,10,11,10,8,11,9,4,5,15,9,4,11,15",
        reel_set7: "10,12,15,8,4,6,9,5,3,11,7,6,9,3,7,4,15,7,9,7,9,4,7,8,12,6,12,6,7,15,9,11,7,8,9,7,15,9,12,9,7,4,12,15,8,4,6,9,6,8,3,7,9,4,7,4,7,9,6,9,6,12,8,6,9,8,4,6,9,6,3,8,15,7,12,9,7,8,9,8,4,12,7,9,5,12,7,9,7,4,9,7,8,6,4,9,8,7,4,15,8,7,3,4,6,12,8,7,12,7,11,4,7,9,3,7,4,9,7,3,6,12,6,7,5,4,9,3,9,8,9,3,8,4,6,7,6,3,4,9,6,4,3,8,4,15,4,7,6,3,8,7,4,9,8,3,9,6,4,9,3,9,3,7,8,9,4,7,12,4,8,6~12,10,8,6,9,11,5,4,3,7,11,6,11,4,11,8,10,3,6,3,11,9,11,4,3,11,3,9,3,7,6,11,4,3,4,5,11,3,4,11,3,6,11,9,11,9,11,6,11,4,9,11,4,11,6,11,3,11,4,10,11,3,4,10,11,4,3,6,11,4,5,8,11,5,11,10,4,3,11,6,3,4,11,9,8,11,10,11,4,3,6,9,3,9,11,3,11,6,11,6,11,4,10,4,3,11,6,11,9,11,9,6,11,3,10,8,6,9,5,3,11,10,3,6,11,6,4,11,7,6,11,10,4,6,3,11,9,11,3,10,4,9,11,3,4,7,11,6,9,3,11,3,11,3,6,11,3,7,6,4,6,4,7,4,6,8,4,7,3,7,3,10,11,4,9,4,9,6,11~5,9,11,4,10,3,6,12,7,8,3,9,3,11,9,3,7,10,9,7,10,3,10,3,8,10,3,7,9,11,3,6,11,3,10,3,8,9,10,9,7,6,9,3,9,12,7,12,11,9,12,10,3,11,3,8,3,11,3,7,9,12,11,7,3,10,8,11,9,3,9,12,9,3,11,3,8,9,11,10,3,11,10,3,9,3,10,9,10,7,3,10,11,9,3,11,9,10,3,11,8,7,3,4,9,7,10,3,9,7,11,9,12,11,3,7,10,3,12,10,8,9,11,10,11,10,7,9,11,3~3,9,8,11,10,12,4,5,7,6,5,8,11,5,6,11,12,6,8,5,10,9,6,9,6,5,6,9,7,12,11,6,9,8,9,12,9,11,4,12,6,11,12,6,5,8,5,8,4,8,10,7,11,8,12,6,9,12,6,5,12,11,12,5,6,9,8,12,6,7,12,8,11,9,12,4,6,12,7,11,7,6,7,12,6,7,6,8,7,5,11,10,4,7,5,9,12,11,7,11,12,5,11,9,11,6,5,8,5,6,7,9,6,12,7,6,11,6,11,5,11,8,12,5,7,10,5,7,6,12,7,5,7,4,12,5,6,4,9,7,12,4,8,12,7,12,6,8,6,12,10,12,8,5,12,5,8,4,5,11,9,11,6,9,12,4,11,5,6,12,8,11,5,11,4,12,4,12,11,12,5,8,5,6,11,10,8,12,7,5,4,11,8,6,11,9,11,12,10,12,9,7,6,7,12,7,5,7,5,9,5,8,11,12,11,5,12,4,8,9,6,10,11,5,6,9,12,7,12,7,6,4,9,6,11,12,11,5,7,10,12,5,12,8,7,12,7,4,8,12,11,7,12~4,3,8,9,15,5,10,7,11,12,6,3,7,11,10,15,7,5,15,3,5,7,6,5,15,3,8,15,3,11,8,5,3,11,15,5,7,6,5,11,8,11,8,15,11,3,7,15,5,15,3,5,15,10,5,7,15,10,11,6,8,11,7,8,15,8,15,5,11,6,7,5,8,11,7,5,15,11,15,5,3,11,10,15,3,5,3,15,5,7,5,15,5,8,6,3,15,11,3,10,11,15,11,7,5,7,5,11,5,11,3,5,11,15,5,15,6",
        reel_set9: "6,5,4,9,11,12,3,8,7,10,9,10,5,10,9,7,5,10,9,10,7,9,7,5,10,12,5,7,10,4,5,9,7,10,7,9,7,10,11,7,10,11,8,9,5,7,11,5,9,5,9,7,5,9,7,5,9,11,10,5,11,9,7,10,9,7,10,5,10,7,10,9,5,9,4,9,10,9,5,7,12,7,10,11,4,12,5,11,7,9,10,5,7,10,5,9,11,12,10,9,12,11,5,7,9,10,9,7,11,9,10,11,4,10,3,9,10,7,10,9,10,5,9,7,10,9,11,10,7,10,11,10,7,9,5,9,7,5,7,9,5,9,7,9,7,10,7,5,9,3,7,11,5,9,10,9,11,5,9,7,9,10,9,5,11,9,10,9~10,6,5,12,4,8,9,11,7,3,12,11,9,11,5,9,3,5,9,4,3,12,11,6,11,5,9,3,6,12,9,11,3,9,8,7,9,8,9,3,5,3,11,12,6,9,5,6,9,5,8,12,3,5,6,8,11,3,9,12,5,11,3,8,5,6,8,3,5,8,12,3,6,3,8,12,7,6,9,5,3,4,12,3,8,12,9,3,11,6,3,6,11,3,9,5,3,6,8,6,5,12,6,3,6,11,8,9,3,5,3,5~8,11,10,3,6,4,12,7,9,5,10~5,8,9,4,6,7,10,11,3,12,3,6,3,7,6,9,11,6,12,6,8,12,6,11,6,7,12,6,3,7,6,3,12,9,6,12,6,7,6,11,7,4,6,7,9,8,6,10,4,6,9,6,8,9,11,6,7,6,9,11,6,9,4,6,8,6,4,6,10,12,7,4,9,8,3,6,9,6,4,3,4,3,4,6,11,10,8,3,4,12,4,8,9,3,11,10,9,8,6,12~9,11,3,12,7,4,5,8,6,10,5,7,12,8,7,10,3,7,3,7,10,6,8,12,11,7,3,8,3,10,7,3,4,7,11,7,8,7,10,7,10,4,8,7,4,7,5,7,10,5,4,7,10,3,6,7,12,3,7,3,7,3,7,11,7,5,11,10,5,11,7,11,7",
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
        balance: "98,000.00",
        index: "2",
        balance_cash: "98,000.00",
        reel_set: "0",
        balance_bonus: "0.00",
        na: "s",
        stime: new Date().getTime(),
        sa: "11,7,7,10,12",
        sb: "11,8,3,5,11",
        sh: "4",
        c: player.betPerLine,
        sver: "5",
        counter: "4",
        l: "20",
        s: Util.view2String(player.machine.view),
        tw: player.machine.winMoney,
        w: player.machine.winMoney,
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

    //                                           
    var nextAction = "s";
    if (player.machine.winMoney > 0) {
        nextAction = "c";
    }
    result["na"] = nextAction;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.baseType == "WILD") {
        result["wmt"] = "pr";
        result["wmv"] = player.machine.expandMulti;
        result["gwm"] = player.machine.expandMulti;
        result["is"] = Util.view2String(player.machine.maskView);
        result["ep"] = `14~${player.machine.expandWildPos}~${player.machine.wildsArr.join()}`;
        result["trail"] = `reel${player.machine.wildReelIndex + 1}_mul~${player.machine.expandMulti}`;
    } else if (player.machine.baseType == "BONUS") {
        var wilds = [];
        for (var i = 0; i < player.machine.wildsArr.length; i++) {
            var pos = player.machine.wildsArr[i];
            wilds.push(`${player.machine.maskView[pos]}~2~${pos}`);
        }
        result["is"] = Util.view2String(player.machine.maskView);
        result["stf"] = `rw:${wilds.join(";")}`;
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
        }
    } else if (prevGameMode == "FREE") {
        result["tw"] = player.machine.freeSpinWinMoney;

        if (player.machine.freeSpinMore > 0) {
            result["fsmore"] = player.machine.freeSpinMore;
        }

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        } //                                     ->                       
        else if (player.machine.currentGame == "BASE") {
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney - player.machine.freeSpinBeforeMoney;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    return result;
};

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
};

module.exports = ApiManager;