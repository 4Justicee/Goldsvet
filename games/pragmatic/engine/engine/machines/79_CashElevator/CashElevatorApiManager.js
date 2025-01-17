var Util = require("../../../utils/slot_utils");

function ApiManager() { }

ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        reel_set29: "9,4,4,4,8,4,7,3,8,8,8,10,5,6,10,10,10,6,6,6,5,5,5,10,5,4,10,6,10,4,5,4,5,7,8,6,8,4,10,6,3,8,6,8,5,10,5,4,5,4,5~8,8,8,3,5,5,5,7,5,4,10,10,10,6,8,4,4,4,9,10,6,6,6,10,5,4,5,9,6~2,2,2,2~6,6,6,3,10,10,10,5,4,5,5,5,8,4,4,4,6,8,8,8,9,10,7,8,10,8,5,8,10,3,8,4,8,9,10,5,8,4,5,7,10,4,5,4,8~4,5,7,3,6,10,9,8,4,4,4,5,5,5,6,6,6,8,8,8,10,10,10,8,3,6,8,10,6,10,8,10,3,8,10,8,6,3,10,3,8",
        def_s: "3,6,12,4,11,5,13,11,8,7,9,11,10,13,11",
        reel_set25: "11,11,11,3,5,8,10,11,10,10,10,4,6,5,5,5,9,7,4,4,4,8,8,8,4,10,4,8,4,10,5,7,4,5,8,7,8~2,2,2,2~8,5,6,7,7,7,4,3,10,7,11,11,11,11,9,9,9,9,11,9,11,6,11,6,7,9,10,6,10,11,7,6,11,5,11~2,2,2,2~10,9,8,8,8,7,5,10,10,10,11,6,3,8,4,5,5,5,6,6,6,4,4,4,7,7,7,11,7,4,11,7,6,3,4,6,8,7,4,11,6,4,11,6",
        reel_set26: "5,5,5,8,10,10,10,7,4,8,8,8,6,11,11,11,10,4,4,4,11,3,5,9,10,11,10,8,11,4,10,4,8,11,6,11,10,8,4,8,10,11,10,4~3,11,9,6,8,8,8,7,5,5,5,5,4,8,10,6,6,6,4,4,4,7,7,7,10,10,10,8,11,5,4,11,5,11,4,10,5~2,2,2,2~4,9,8,3,11,5,6,11,11,11,7,4,4,4,10,8,8,8,10,10,10,5,5,5,9,10,5,7,5,3,5,11,9,8,10,11,10,5~5,4,4,4,6,3,9,7,7,7,10,5,5,5,4,11,8,8,8,8,7,10,10,10,6,6,6,7,4,10,3,6,10,3,10,8,10,3,7,4,7,10,4,10,7,6,9,6,4,6,10,7,3",
        reel_set27: "2,2,2,2~8,7,3,6,5,4,9,10,10,10,10,8,8,8,4,4,4,5,5,5,6,6,6,10,4,5,4,10,5~10,10,10,7,7,7,7,4,6,10,9,9,9,8,3,5,9,7,6,9,4,5,7,8,7,4,9,7,4,9,5,7,4,7,9,4,9,3,7,6,4,8,9,4,9,7,4~5,5,5,5,6,3,8,8,8,9,4,4,4,4,6,6,6,10,8,7,10,10,10,4,3,6~2,2,2,2",
        reel_set28: "7,3,4,10,10,10,5,9,10,4,4,4,6,6,6,6,8,8,8,8,5,5,5,10,5,8,10,5,6,5,4,6,8,10,8,4,10,6,4,6,8,10,9,8,6,10,6,4~2,2,2,2~10,10,10,5,6,7,7,7,3,10,8,9,9,9,4,7,9,7,8,4,7,9,7,9,7,9,7,9,7,9,7,4,6,7,4,9,7,6,4,7,9,6,7,4,9,4,5,4,9,3~2,2,2,2~3,8,8,8,8,7,5,6,10,4,9,10,10,10,4,4,4,6,6,6,5,5,5,6,4,10,8,9",
        reel_set32: "3,9,9,9,8,7,9,6,4,4,4,5,6,6,6,4,8,8,8,5,5,5,8,5,8,5,4,9,7,8,5,4,9,4,5,9,4,5,6,4,8,9,4,6,4,5,9,4,9,6,9,5,9,7,5~8,8,8,3,5,7,6,7,7,7,9,6,6,6,8,4,4,4,4,5,5,5,6,4,6,4,7,9,5,7,6,7,5,6,5,4,6,7,6,4,7,9,5,7,6,4,3,7,4,7,6,4,7,4,5,9,7,4~2,2,2,2~7,4,9,6,5,8,3,4,4,4,5,5,5,9,9,9,8,8,8,6,6,6,4,8,4,6,4,9,5,8,3,6,5,6~5,3,8,8,8,6,7,9,4,5,5,5,8,6,6,6,4,4,4,7,7,7,4,9,7,9",
        reel_set33: "2,2,2,2~5,7,4,5,5,5,3,6,4,4,4,8,7,7,7,6,6,6,8,8,8,6,4,3,4,6,3,8,7,4~4,6,5,7,8,8,8,8,3,7,7,7,5,5,5,8,7,8,7,8,5,7,8,5,8,5,8,7,5,8,5,8,7,5,8,5,3,5,8,7,8,5,7,5,8,6,5,6,8,6,5,7,5,6~4,4,4,8,4,6,6,6,5,7,5,5,5,3,6,7,7,7,8,8,8,6,7,5,6,8,7,3,7,5~2,2,2,2",
        reel_set34: "4,8,8,8,8,7,5,5,5,6,3,5,6,6,6,4,4,4,7,7,7,6,7,3,6,7,5,6,7~2,2,2,2~4,6,7,8,5,5,5,5,3,8,8,8,7,7,7,8,6,7,8,6,8,7,8,5,8,5,8,5,7,8,5,3,7,5,7,5,6,5,7,8,5,7,3,7,5,7,8,5,8,7~2,2,2,2~6,4,4,4,7,8,8,8,8,3,5,5,5,5,6,6,6,4,7,7,7,4,7,3,4,7,8,7,8,7,4,8,7,4,8,7,8,4,8,7",
        reel_set35: "4,7,3,4,4,4,8,5,6,6,6,6,8,8,8,7,7,7,5,5,5,7,3,8,6,8,6,3,8,5,6,7,6,8,5,8,7,5,7,8,6,3,7,6~7,7,7,3,5,7,6,8,4,5,5,5,8,8,8,5,8,5,4,5,8,5,4,8,5,8,5,8,4,5,8,5,4,8,5,8,3,8,4,5~2,2,2,2~7,3,6,5,4,8,8,8,8,6,6,6,5,5,5,7,7,7,4,4,4,8,6,4~3,7,7,7,8,7,4,6,5,8,8,8,4,4,4,5,5,5,6,6,6,8,4,7,4,7,5,4,8,5,4,6,7,6,4,5,6,8,6,4,8,4,6,4,8,6,8,6,8,6,4,8,4",
        balance: "0.00",
        reel_set30: "2,2,2,2~6,6,6,5,9,6,7,3,8,4,4,4,4,5,5,5,8,8,8,9,9,9,8,4,8,4,8,4,8,4,3,8,4,5,4,9,8,5,8,5~4,6,5,7,3,7,7,7,9,8,5,5,5,9,9,9,8,5,3,7,5,6,9,7,9,7,9,8,6,7,5,7,9,8,5,9,7~5,9,7,7,7,3,7,5,5,5,4,8,6,8,8,8,4,4,4,6,6,6,8,4,8,4,6,9,6,8,9,7,4,3,4,8,9,6,7,6,8,9,3,6,8,6,4,8,3,4,8,4,8,6,7,6,4,8~2,2,2,2",
        reel_set31: "6,6,6,9,7,3,8,8,8,8,5,5,5,6,4,5,4,4,4,9,9,9,8,5,7,3,7,9,7,8,4,7,8,3,4,7,4,8,3,4,7,4~2,2,2,2~8,7,7,7,4,9,9,9,6,5,5,5,3,7,5,9,6,7,3,7,9,7,9,6,5,6,5,7,9,5,9,5,6,3,9,4,7,9,3,5,9,6,9,3,9,7,5,9,5,3,9,6,9,5,3,6,7,5~2,2,2,2~6,6,6,6,9,8,7,7,7,5,5,5,5,4,4,4,4,3,8,8,8,7,8,4,7,3,9,3",
        cfgs: "5075",
        accm: "cp~tp~lvl~sc",
        ver: "2",
        mo_s: "19",
        acci: "0",
        index: "1",
        balance_cash: "0.00",
        def_sb: "12,12,12,10,11",
        mo_v: "20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,500,600,800,2000",
        reel_set_size: "49",
        def_sa: "3,3,6,9,6",
        reel_set36: "2,2,2,2~6,6,6,4,5,6,3,7,7,7,7,5,5,5,7,5,7,4,5,7,4,7,4,5,7,4,7,5,3,5,7,3,7,5,7,5,4,7~4,4,4,4,7,5,3,7,7,7,6,5,5,5,7,5,6,7,3,6,5,7,5,3,7,3,6,7,5,7,3,7,5,7,6,3,5,3,5~7,7,7,3,6,6,6,4,5,7,6,5,5,5,4,4,4,6,4,6,5,6,5,6,4,5,6,4,6,5,6,4,6,4,6~2,2,2,2",
        reel_set37: "7,7,7,6,7,5,3,4,6,6,6,5,5,5,6,5,4,5,4,6,4,6,5,4,3,5,6,5,6,4,5,6,3,4,5,6,5,4,6,4,6,5,4,5~2,2,2,2~5,5,5,7,4,4,4,6,5,7,7,7,3,4,7,3,7,4,6,7,4,7,4,6,4~2,2,2,2~5,6,7,4,3,7,7,7,4,4,4,5,5,5,6,6,6,3,7,4,7,6,4,6,4,7,4,6,3,7,3,6,4,7,6,3,6,4,6,7,4,6,4,6,7,6,7,6,4,3,6,3,7",
        reel_set: "2",
        reel_set38: "7,7,7,5,6,6,6,3,7,4,5,5,5,6,5,6,5,4,6,4,5,6,5,4,5,4,6,4,6,4,5,3,6,4,6,5,4,3,6,4,5,4,3,5,4,5,6,3,6,5,6,5,4,5,4,5,3,5,6,5~6,7,7,7,3,4,7,5,5,5,5,4,4,4,3,4,3,4,7,5,3,4,5,7,4,7,4,5,4,7,5,3,4,5,4,7,4,3,4,5,4,7,5,4,7,4,5,4~2,2,2,2~3,7,6,4,4,4,4,5,5,5,5,7,7,7,6,4,5,6,4,5,7,6,4,6,4,7,5,7,6,5,7,4,7,4,7,4,7,4,7,4,7,5,7,4,6,5,7,4,7~4,7,5,4,4,4,3,6,6,6,6,7,7,7,5,5,5,6,7,5,6,5,6,7,5,7,5,7,6,5,7,5,6,5,6,5,7,5,6,5,6,7,5,6,5,7,6,7,5,7,5,7,6,7,5,7,5,7",
        bonusInit: `[{bgid:0,bgt:21,bg_i:"6, 7, 8, 9, 10, 11, 12",bg_i_mask:"psf, psf, psf, psf, psf, psf, psf"},{bgid:1,bgt:21,bg_i:"12, 14, 16, 18, 20, 22, 24",bg_i_mask:"psf, psf, psf, psf, psf, psf, psf"},{bgid:2,bgt:21,bg_i:"3, 4, 5, 6, 7, 8, 9, 10, 11",bg_i_mask:"pbf, pbf, pbf, pbf, pbf, pbf, pbf, pbf, pbf"}]`,
        reel_set39: "2,2,2,2~3,5,5,5,6,4,5,6,6,6,4,4,4,5,4,6,5,4,5,4,5,4,6,5,6,4,5,4,5,4,5,4,5,4,6,4,5,6,4,5,6,4,5,4,5,4,6,4,5,4,5,4,6,5,4,6,4,5,6~5,4,3,6,4,4,4,6,6,6,3,4,6,4,3,6,4,6,3,4,3,6,4,6,3,6,4,3,4,3,6,4,6,4,3,4,6,4,6,4,6,4,6,4,6,3,6~4,5,3,4,4,4,6,5,5,5,6,6,6,5,6,5,6,5,6,3,5,6,5,6,3,5,6,5,6,3,5,3,5,6,5,6,5,6,5,6,5,6,5,6,3,5~2,2,2,2",
        reel_set43: "4,4,4,4,5,5,5,3,5,3,3,3,5,3,5,3,5,3~2,2,2,2~5,5,5,5,3,4,4,4,4,3,4,3,4,3,4,3,4,3,4,3~2,2,2,2~4,4,4,3,5,3,3,3,4,5,5,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3",
        reel_set44: "3,5,4,3,3,3,4,4,4,5,5,5,4,5,4,5~5,4,3,5,5,5,4,4,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4~2,2,2,2~5,3,4,5,5,5,4,4,4,3,3,3,4~4,4,4,4,5,5,5,5,3,3,3,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5,3,5",
        reel_set45: "2,2,2,2~4,3,4,4,3,4,3,3~3,3,3,3,4,3,4,4,3,4,4,3,4~4,4,3,4,4,3,4,4,3,4,3,3,3,3,4,3~2,2,2,2",
        balance_bonus: "0.00",
        reel_set46: "3,4,3,3,4,3,4,4~2,2,2,2~3,4,3,3,3,3,4,3,4,4,3,4,3,4,4~2,2,2,2~3,3,3,4,3,4,4,3,4,3,4,4,3",
        na: "s",
        reel_set40: "4,6,5,5,5,5,3,6,6,6,4,4,4~2,2,2,2~4,4,4,5,6,6,6,6,4,3,6,3,6,5,3,5,3,6,3,6,3,6,5,6,5,6,3,6,3,6,3,5,3,5,6,3,6,3,6,3,6,3,6,5,3,6,5,6,5,3,5~2,2,2,2~3,4,6,5,4,4,4,6,6,6,5,5,5,6,5,6,5,4,6,4,6,5,4,5,4,6,5,6,4,6,5,4,5,4,5,4,6,5,6,5,6,4,5,6,5,6,4,5,4,5,4,6,5",
        reel_set41: "4,6,6,6,6,3,5,5,5,5,4,4,4~6,3,5,4,4,4,4,6,6,6~2,2,2,2~4,6,5,5,5,3,5,6,6,6,4,4,4~5,4,6,3,4,4,4,6,6,6,5,5,5",
        reel_set42: "2,2,2,2~3,3,3,4,5,3,5,5,5,4,4,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5,4,5~5,5,5,3,4,4,4,5,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3~3,3,3,3,4,5,5,5,5,4,4,4,5,4,5,4,5,4,5,4~2,2,2,2",
        accv: "0~1~0~0",
        scatters: "1~0,0,0,0,0~0,0,0,0,0~1,1,1,1,1,1",
        gmb: "0,0,0",
        rt: "d",
        gameInfo: `{rtps:{regular:"94.63"},props:{max_rnd_sim:"1",max_rnd_hr:"1990248",max_rnd_win:"20000"}}`,
        wl_i: "tbm~20000",
        stime: "1646036588704",
        reel_set47: "4,4,3,3,4,3,4,3,3,4~4,3,3,3,3,4,3,4,4,3,4,3,4,3,3,4,4,3,4~2,2,2,2~4,3,3,3,3,4,4,3,4,4,3,4,3,4,4,3~3,3,3,4,3,4,3,3,4,4,3,4,3,4,4,3,4,4,3",
        reel_set48: "19,19,20,20,19,20,19,19,20,20,19,20,20,19,19,20,19,20,20,19,20,19,20,20~20,19,19,20,20,19,20,19,20,20,19,20,19,20,19,20,20,19,20,19,20,19,19,20~19,20,19,19,20,20,19,20,19,19,20,20,19,20,20,20,20,19,19,20,19,20,19,20~20,19,19,20,20,19,20,19,20,20,19,19,20,20,19,19,20,20,20,20,19,20,20,19~19,20,19,20,20,20,19,19,20,19,20,19,20,19,20,19,19,20,20,20,19,20,20,20",
        sa: "3,3,6,9,6",
        sb: "12,12,12,10,11",
        reel_set10: "3,5,4,3,3,3,4,4,4,5,5,5,4,5,4,5,4,5,4,5,4,5,4,5~5,5,5,18,3,3,3,5,3,18,18,18,4,4,4,4,3,18,4,3,18,4,3,18,4,18,4,18,3,4,18,4,3,18,4,3,18,4,3,4,3,18,3,18,4,3,18,4,18,3,4,3,4,3,18,3~3,5,5,5,16,4,4,4,5,3,3,3,17,4,5,17,5,17,4,5,4,5,4,5,4,17,4,5,17,5,4,5,17,4,17,4,5,4,16,5,4,5,4,17,4,5,4,5,4,5,17,5,4,16,5,16,17,4,5,4,17,4,5,17,4,5,17,4,5,4,16,4,5,4,17,4,5,17,4,17,5,4,5,4,5,4,17,4,5,4,5,4,5,4,5,17,5,4~18,18,18,18,5,3,4,4,4,4,3,3,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,5,3,4~5,5,5,5,3,4,4,4,4,3,3,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3,4,3",
        sc: "10.00,20.00,30.00,40.00,50.00,100.00,200.00,300.00,400.00,500.00,750.00,1000.00,2000.00,3000.00,4000.00,5000.00",
        defc: "100.00",
        reel_set11: "4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4,4,3,4,4~18,18,18,3,3,3,3,3,4,3,3,3,3,4,3,3,3,3,3,4,3,3,3,3,3,3,4,3,3,3,3,3,3,4,3,4,3,3,4,3,3,3,3,4,3,3,3~3,3,3,3,3,16,3,3,3,3,16,3,3,16,3,3,17,3,3,3,16,3,3,4,3,3,4,4,3,3,17,3,3,4,4,4,3,3,3,3,16,3,3,16,3,3,17,3~18,18,18,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,4,4,3,3,3,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3~4,4,4,4,4,4,3,4,4,4,4,4,4,4,3,3,4,4,4,4,4,3,4,4,4,4,4,4,3,4,4,4,4,4,4,4,3,4,4,4,4,4,4,4",
        reel_set12: "2,2,2,2,2~9,13,9,15,15,6,14,14,13,15,6,7,14,15,15,15,7,14,12,3,11,10,12,8,15,10,4,5,5,8,15~15,13,5,11,3,15,9,13,9,15,15,15,15,15,14,11,14,8,14,11,15,14,7,11,13,13,13,15,13,15,4,10,13,10,15,15,6,10,14,14,14,9,3,12,6,7,12,10,14,11,15,3,12,12,12,15,15,11,5,15,15,13,13,12,14,7,15,14~8,5,3,14,15,11,9,15,15,15,13,10,12,10,7,10,5,3,6,6,6,15,15,14,15,11,8,10,12,15,7,7,7,8,12,15,8,9,15,9,14,8,8,8,10,6,5,13,4,6,7,15,15,13,13,13,13,10,4,12,9,14,12,15,12,12,12,8,13,15,4,7,15,6,15,13,15~2,2,2,2,2",
        reel_set13: "15,5,14,13,15,13,3,14,10,14,14,15,6,14,11,4,13,9,9,12,13,14,15,12,4,15,15,15,15,15,10,7,15,8,7,15,15,12,7,12,15,8,14,11,8,5,15,5,6,9,14,6,15,8,10~2,2,2,2,2~15,13,13,14,15,11,13,14,10,15,15,15,15,3,6,10,8,12,9,14,3,9,10,5,13,13,13,15,7,13,4,15,11,15,13,12,11,13,14,14,14,7,15,6,5,10,12,15,14,9,11,15,12,12,12,3,14,15,14,7,15,11,15,15,11,15,14,15~2,2,2,2,2~13,15,3,15,8,12,15,15,15,15,15,3,11,12,14,10,7,10,6,6,6,10,15,15,13,15,10,15,12,8,7,7,7,7,13,4,6,7,15,6,11,8,8,8,8,13,14,12,12,15,15,6,10,13,13,13,15,14,9,9,8,5,5,9,12,12,12,8,9,10,5,4,13,15,14,4,15",
        sh: "3",
        wilds: "2~0,0,0,0,0~1,1,1,1,1",
        bonuses: "0",
        fsbonus: "",
        c: "100.00",
        sver: "5",
        reel_set18: "2,2,2,2~11,8,10,7,5,9,13,6,3,4,12,12,12,12,13,13,13,4,12,10,12,3,4,13,4,12,13,12,10,8,13,12,13,9,12,9,13,4,12,13,12,8,5,4,12,13,8~9,13,13,13,8,6,5,7,4,11,13,11,11,11,10,12,3,12,12,12,9,9,9~8,8,8,9,5,7,7,7,11,7,4,12,12,12,12,10,5,5,5,6,3,13,13,13,13,8,4,4,4,6,6,6,7,5,10,4,5,4,5,13,6,7,4,12,7,12,5,13,6,10,4,6,4,12,5,6,4~2,2,2,2",
        reel_set19: "12,12,12,11,3,4,7,13,13,13,10,9,13,8,6,5,12~2,2,2,2~11,11,11,6,9,9,9,12,3,13,13,13,5,4,12,12,12,7,9,13,11,10,8,13,3,12,13,9,13,9,13~2,2,2,2~13,5,5,5,10,13,13,13,9,12,11,4,7,6,6,6,6,3,5,8,4,4,4,8,8,8,7,7,7,12,12,12,8,4,9,8,7,8,10,8,4,5,12,8,11,12,11,4,8",
        counter: "2",
        reel_set14: "4,13,7,15,15,15,9,11,8,5,14,15,6,12,10,3,6,12,7,12,15,11,3,11,15,7,9,13,15,7,9,15,6,3,15,3,7,12~13,6,3,12,12,12,10,15,4,9,12,13,13,13,5,7,7,7,7,8,15,15,15,11,6,6,6,14,8,8,8,6,12,6,7,11,6,7,11,5,12,5,8,12,8,12,8,11,12,11,12,7,8~2,2,2,2~15,15,15,12,10,6,9,11,15,7,4,5,13,3,8,14,6,13,3,4,6,10,14,6,11,7,5,3,8,6,8,6,10,8,10,4,14,8,14,8,6,14,13,6,13,6,8,10,3,6,4,8,6,8,6,3,6~6,6,6,9,4,14,12,5,8,7,7,7,6,13,3,11,15,7,13,13,13,10,12,12,12,8,8,8,15,15,15,13,10,7,15,14,8,12,15,8,9,12,7,9,10,7,9,7,9,12,7,12,9,7,15,8,5,13",
        paytable: "0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;1000,300,50,0,0;600,150,25,0,0;500,100,20,0,0;100,20,8,0,0;100,20,8,0,0;100,20,8,0,0;100,20,8,0,0;60,15,6,0,0;60,15,6,0,0;60,15,6,0,0;60,15,6,0,0;45,10,4,0,0;45,10,4,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0;0,0,0,0,0",
        l: "20",
        reel_set15: "2,2,2,2~14,14,14,3,10,10,10,10,6,5,9,14,13,4,8,12,7,11,7,6,11,9,11,10,7,10,7,5,10,6,10,11,5,11,7,10,6,10,11,4,7,11,10,11,10,6,7,10,8,6,11,6,3,11,5~8,12,9,9,9,9,14,14,14,11,6,7,5,4,13,10,14,3,11,11,11,14,9,5,14,11,9,3,9,11,4,11,7,11,14,11,14,9,7~6,6,6,6,8,5,5,5,5,12,12,12,13,8,8,8,11,13,13,13,14,3,10,14,14,14,7,12,7,7,7,4,9,4,4,4,13,4,7,4,7,14,5~2,2,2,2",
        reel_set16: "8,10,10,10,13,14,14,14,12,5,14,11,4,3,6,9,10,7,14,11,14,10,9,10,6,10,5,14,9,10,5,4,14,10,14,4,14,10,9,10,9,4,14,4,10,11~2,2,2,2~8,11,11,11,4,11,9,6,5,14,14,14,3,7,12,14,9,9,9,10,13,14,4,9,12,9,5,6,9,3,5,9,11,5,9,5,9,12,9~2,2,2,2~13,5,9,6,6,6,8,10,4,6,8,8,8,3,7,12,4,4,4,14,7,7,7,11,14,14,14,13,13,13,5,5,5,12,12,12,4,14,5,6,12,5,12,7,5,14,7",
        reel_set17: "10,14,14,14,7,10,10,10,11,5,4,13,9,12,8,6,14,3,5,7,11,12,6,5,6,5,7,14,8,7,14,5,14,6,3,6,5,7,3,7~12,3,11,12,12,12,8,9,4,4,4,4,14,14,14,14,6,13,7,7,7,7,10,5,5,5,5,6,6,6,13,13,13,8,8,8,6,13,6,7,6,9,6,5,4,7,8,4,8,6,13,7,14,4~2,2,2,2~10,10,10,5,14,14,14,13,8,10,11,9,3,4,12,7,6,14,7,14,4,7,12,14,4,14,5,4,12,14,13,4,14,3,4,6,5,6,3,7,14,8,3,12,3~13,13,13,11,8,9,6,6,6,6,12,4,13,7,14,5,5,5,5,10,3,7,7,7,14,14,14,8,8,8,12,12,12,4,4,4,8,3,7,12,8,5,4,5,9,6,4,14,6",
        rtp: "94.63",
        reel_set21: "2,2,2,2~5,12,12,12,8,8,8,8,6,10,11,12,3,7,9,4,8,12,8,12,8,11,8,12,4,12,8,10,3,8,12,8,3,12,11,3,10,3,10,12,4,3,6,3,8,11,3,4,8,10,8~12,12,12,8,11,11,11,12,11,10,7,4,9,9,9,6,3,9,5,11,3,11,7,11,7,11,9,7,11,4,11,4,3,9,11,7,11,9,7,9,11,4,11,7,11,5,9,4,7,11,7,9,11,3,11,5~9,6,6,6,11,7,7,7,10,8,4,10,10,10,7,4,4,4,5,12,6,3,8,8,8,5,5,5,6,7,8~2,2,2,2",
        reel_set22: "4,12,12,12,8,12,8,8,8,10,11,6,5,9,3,7,9,8,9,11,7,3,8~2,2,2,2~11,4,9,9,9,12,6,5,10,8,3,12,12,12,9,11,11,11,7,9,5,12,9~2,2,2,2~6,6,6,6,9,3,4,10,5,7,8,11,5,5,5,12,4,4,4,10,10,10,7,7,7,8,8,8,12,8,4,8,10,4,12,8,11,10,8,10,5,9,7,4,5,4,12,9,5,7,10,12,5,4,8,11,4,10",
        reel_set0: "10,6,10,10,10,12,6,6,6,11,5,3,4,4,4,14,5,5,5,9,15,15,15,15,13,8,3,3,3,4,7,14,14,14,15,6,14,11,15,3,15,6,5,3,5,11,14,15,4,6,3,5,12,3,14,5,14,13,3,13,14,6,13,14,15,6,8,15,14,9,13,14,15,5,3,9,14,15,8,15,14,3,9,5,15,6,14,15,5,4,3,13,3,15,14,15,3,15,6,15,8,5,12,14,3,5,15,5,15,14,12,13,15,4,13,11,5,15,6,14,6,4,15,8,14,6,14,9,15,11,5,15,7,3,5,13,5,14,15,14,15,11,15,12,4,15,11,15,9,14,11,4,15,5,3,15,8,15,4,15,6,15,11,3,15,14,3,14,13,9,11,3,15,4,15,6,15,6,15,13,11~15,5,5,5,9,3,5,13,4,4,4,8,12,12,12,12,4,6,11,7,10,14,14,14,18,14,9,9,9,18,18,18,15,15,15,6,6,6,3,3,3,9,6,18,5,9,11,6,12,9,5,4,5,10,9,12,6,12,14,8,5,8,7,3,8,6,12,14,12,4,6,12,18,6,5,12,10,6,9,18,4,5,12,4,3,12,5,12,18,5,6,3,4,18,5,8,14,6,3,12,3,8~7,4,6,6,6,5,9,11,11,11,13,13,13,13,3,6,17,8,16,11,12,4,4,4,4,15,10,15,15,15,14,3,3,3,4,5,17,12,4,5,15,3,14,4,15,6,4,15,16,14,12,4,12,15,4,11,3,12,11,3,6,3,13,11,4,9,14,13,15,9,13,15,3,4,11,4,12,4,15,4,17,3,12,11,3,11,17,15,5,12,4,15,4,11,3,15,4,12,3,4,3,12,11,9~10,8,9,15,3,13,13,13,11,12,7,4,7,7,7,5,4,4,4,4,4,13,6,6,6,14,12,12,12,6,15,15,15,5,5,5,14,14,14,15,5,6,7,12,5,13,14,7,14,13,5,6,7,12,15,12,6,14,12,15,12,7,15,12,15,13,6,7,4,7,4,7,4,12,15,12,14,12,15,7,6,11,7,5,6,15,12,7,15,12,5,14,6,13,7,9,6,7,5,7,14,4,15,5,6,7,6,14,12,13,6,7,12,14,6,7,6,14,6,4,5,14,4,5,6,12,11,4,5,15,13,12,7,12,14,3,7,5,7,5,13,5,4,6,14,12,9,12,9,7,12,6,5,7,9,7,5,6,5,6,12,15,5,6,5,12,4,5,4~10,3,10,10,10,9,6,12,13,14,14,14,11,14,7,15,15,15,4,7,7,7,8,5,15,9,9,9,3,3,3,12,12,12,11,11,11,4,4,4,4,4,4,4,5,5,5,6,6,6,5,6,5,15,3,8,5,9,11,7,9,14,6,5,3,6,15,11,14,12,11,5,3,6,3,14,6,14,3,5,11,3,6,9,12",
        reel_set23: "8,12,12,12,11,8,8,8,12,10,4,7,5,9,6,3,4,12,4,7,4,11,4,12,11,12,7,4,12,7,4,3,12,9,3,9,7,12,9,11,12,9,4,9,12,7,4~7,7,7,4,8,5,5,5,11,9,6,6,6,7,12,10,10,10,5,4,4,4,6,3,10,8,8,8,10,6,8,5,3,4,5,8,5,8~2,2,2,2~7,4,8,8,8,12,9,12,12,12,6,3,11,8,10,5,10,9,10,9,3,8,10,3,8,12,10,12,9,8,9,3,8,10,9,8,9,8,3,12,3,9,10,5,8~7,8,7,7,7,11,5,12,10,9,6,4,4,4,4,10,10,10,3,8,8,8,6,6,6,5,5,5,6,11,5,4,5,6,11,3,12,5,10,8,6,5,4,10,9,5,12,10,12,10,6,3,5,10,12,5,8,6",
        s: "3,6,12,4,11,5,13,11,8,7,9,11,10,13,11",
        reel_set24: "2,2,2,2~5,5,5,9,7,4,6,8,10,11,4,4,4,5,11,11,11,3,8,8,8,10,10,10,7,3,10,3,8,4,10,3,4,10,4,10,3,8,10,9,3,11,8,9,10,8,11,8,7,10,4,10,11,10,8,10,4,11~7,10,7,7,7,5,9,9,9,11,11,11,11,3,8,9,4,6,11,8,11,8,11,3,9,11,10,11,8,11,10,11~5,5,5,5,4,6,10,4,4,4,3,7,7,7,8,11,7,9,6,6,6,10,10,10,8,8,8,4,8,4~2,2,2,2",
        accInit: `[{id:0,mask:"cp; tp; lvl; sc; cl"},{id:1,mask:"cp; mp"},{id:2,mask:"cp; mp"},{id:3,mask:"cp; tp; lvl; sc; cl"}]`,
        reel_set2: "4,8,5,5,5,5,10,6,10,10,10,9,12,11,12,12,12,13,3,3,3,3,7,6,6,6,13,13,13,4,4,4,6,13,6,12,5,12,13,3,7,5,12,3,10,5,13,12,13,10,8,13,3,13,6,3,13,5,13,3,12,10,5,6,12,6,10,6,5,12,13,12,3,13,3,13,10,6,13,3,10,12,13,3,10,7,5,6,10,3,5,3,12,6,13,3,6,12,13,12,8,13,5,12,10,13,6,10,5,13,3,13,3,13,3,5,6,10,3,10,5,10,12,5,12,3,5,6,3,12,5,12,6,3,5,13,6,5,3,13,8,3,10,5,12,13,12,6,13,12,13,3,6,5,6,5,12,9,5,6,12,13,10,6,13,3,5,3,10,6,5,3~13,13,13,5,4,8,10,4,4,4,13,7,12,11,11,11,9,10,10,10,18,6,7,7,7,11,3,8,8,8,6,6,6,12,12,12,9,9,9,18,18,18,3,3,3,7,11,6,9,7,18,4,7,10,11,4,9,11,8,7,12,9,3,8,6,18,7,11,12,8,11,12,3,12,4,11,7,6,7,8,18,3,6,9,6,12~11,5,3,4,12,10,16,13,17,13,13,13,9,3,3,3,8,7,6,4,4,4,6,6,6,5,4,6,4,12,4,6,4,5,3,4,6,16,3,4,3,6,8,10,5,6,3,12,5,12,13,4,12,17,6,3,13,3,4,9,5,16,10,4,12,13,3,6,3,12,9,5,4,9,12,8,3,5,6,4,9,12,13,3,10,6,3,4,13,4,16,4,6,3,5~12,13,13,13,13,3,10,10,10,4,9,6,8,5,5,5,5,7,8,8,8,11,10,4,4,4,7,7,7,11,11,11,6,6,6,4,6,13,4,9,4,5,9,4,13,10,13,7,11,4,13,8,13,8,10,4,10,8,9,10,9,4,6,4,11,8,13,4,5,11,8,4,11,4,5,13,4,8,9,8,6,4,3,13,11,5,6,9,8,5,4,10,6,4,6,8,5,10,6,4,9,3,6,4,5,6,5,4,9,4,11,6,8,11,13,8,5,13,6,11,8~8,7,7,7,4,3,6,3,3,3,5,12,6,6,6,11,13,10,10,10,10,7,9,13,13,13,12,12,12,4,4,4,3,12,3,4,10,12,6,13,6,3,13,4,3,12,3,11,13,12,3,7,3,12,10,3,13,10,3,6,4,12,5,3,7,3,12,3,12,7,3",
        reel_set1: "12,7,7,7,7,9,5,5,5,8,5,12,12,12,11,13,4,10,14,3,3,3,6,3,11,11,11,13,13,13,4,4,4,14,14,14,10,10,10,9,9,9,6,6,6,11,6,11,6,14,10,9,11,4,11,13,14,6,10,6,13,6,14,10,7,6,7,14,6,11,10,5,3,14,5,11,7,13,9,7,10,13,11,4,7,13,10,14,13,11,13,10,6,4,14,4,3,13,7,14,6,7,3,10,4,9,11,13,9,14,6,11,10,7,6,14,7,6,11,5,6,10,14,4,13,4,11,5,10,14,4,3,4,11,7,3,11,5,8,6,3,11,3,7,13,9,6,14,4,10,3,14,6,14,7,3,4,10,14,7,6,4,14,6,3,14,13,5,13,7,13,6,11,4,6,3,4,6,11,6,7,5,3,10~12,12,12,11,14,14,14,4,7,12,9,3,3,3,10,11,11,11,14,13,3,8,6,5,6,6,6,7,7,7,4,4,4,9,9,9,5,5,5,10,13,7,13,9,7,11,7,5,6,7,10,9,8,11,9,7,13,3,8,9,7,11,8,7,5,6,13,10,6~14,14,14,7,13,13,13,13,17,9,6,3,3,3,16,3,5,5,5,10,4,11,12,11,11,11,14,10,10,10,8,5,9,9,9,12,12,12,4,4,4,6,6,6,11,12~7,7,7,4,13,13,13,3,11,6,6,6,12,13,14,6,10,9,4,4,4,7,18,18,18,8,5,5,5,5,14,14,14,18,8,13,5,8,5,4,5,9,5,9,4,8,10,4,5,9,4,5,18,9,8,6,4,6,5,6,18,5,14,13,18,14,6,4,11,4,11,5,4,5,4,5,6,14,6,5,14,8,6,4,10,9,4,14,18,4,6,4~7,8,8,8,14,10,12,12,12,4,11,6,5,5,5,12,4,4,4,9,13,13,13,8,5,3,11,11,11,13,7,7,7,6,6,6,9,9,9,14,14,14,3,3,3,12,3,13,9,4,14",
        reel_set4: "9,11,7,9,9,9,8,4,3,5,5,5,10,4,4,4,6,5,3,3,3,11,11,11,6,6,6,10,10,10,5,6,11,6,8,11,10,11,4,11,6,11,4,11,8,5,4,10,6,5,10,4,5,10,4,5,3,10,5,6,4,11,5,6,4,10,6,4,11,8,4,5,3,8,3,11,10,3,5,11,5,4,5,11,5,6,11,4,10,8,4,5,11,5,11,3,5,11,6,5,3,4,11,4,11,6,10,11,8,6,11,10,5,11,4,11,6,11,6,8,6,10,5,4,10,3,4,10,3,11,6,5,11,5,4,6,4,10,6,4,6,3,6,11~4,4,4,18,10,10,10,7,8,5,4,3,9,7,7,7,6,11,10,9,9,9,3,3,3,6,6,6,11,11,11,18,18,18,8,8,8,6,7,6,5,6,18,6,11,9,11,6,7,6,8,18,8,18,6,3,6,3,8,9,6,8,3,18,9,18,6,7,18,8,7,6,8,11,18,9,11,18,7,8,3,18,6,18,11,6,8,18,11,9,7,6,8,9,18,7,9,11,18,11,5,18,6,18,9,11,6,9,6,7,3,6,11,9,8,5,7,18,11,3,18,6,8,3,8,7,8,11,8,7,6,7,8,3,18,6,9,6,9,7,3,5,6,9,6,9,18,11,6,9,6,7,6,18,3,8,5,3,6,3,7,18,6,11,18,7,3,11,5,18,8,6,3,7,11,8,3,7,11,3,9,3,6,8,18,3,18,6,7,8,3,8,11,8,6~17,8,8,8,10,4,4,4,4,5,7,9,9,9,16,6,11,11,11,9,11,8,3,10,10,10,3,3,3,6,6,6,8,9,4,6,4,9,8,9,4,9,6,9,6,4,9,8,4,9,4,11,9,8,4,9,8,3,9,8,9,6,10,3,5,11,9,4,10,8,9,5,10,5,3,8,9,8,11,6,11,4,9,8,4,8,6,8,10,9,5,8,11,9,10,4,6,8,10,4,6,9,3,8,6,10,6,9,11,5,10,9,6,11,6,9,11,8,16,10,6,3,11,9,4,9,4,6,10,16,9,3,9,4,9,8,10,6,10,3,6,5,9,11,6,8,4,3,5,4,9,6,10,4,11,8,6,5,6,10,6,9,8,3,6,11,9,5,6,16,6,10,6,10,8,11,4,16,11,3,11,4,9,4,5,9,10,4,6,8,5,6,3,6,4~4,6,6,6,9,5,5,5,7,5,8,11,10,3,9,9,9,6,4,4,4,11,11,11,8,11,5,11,9,5,11,8,6,10,6,11,9,11,9,5,8,7,10,11,9,5,10~4,4,4,9,5,3,6,11,3,3,3,10,6,6,6,7,11,11,11,8,4,5,5,5,8,8,8,10,10,10,8,11,8,10,6,8,9,3,5,7,8,5,8,6,5,3,10,6,8,10,3,5,8,5,8,11,5,3,5,11,8,10,8,3,8,5,10,8,3,11,10,8,3,8,3,8,6,3,5,10,7,6,11,3,8,5,3,5,11,3,10,8,6,8,5,8,11,8,6,10,3,7,10,3,10,3,10,11,3,8,5,8",
        reel_set3: "10,10,10,12,6,11,11,11,10,9,5,8,8,8,7,4,12,12,12,11,3,4,4,4,8,3,3,3,6,6,6,5,5,5,7,7,7,9,9,9,4,12,9,3,11,9,5,4,9,3,7,9,3,11,9,5,4,12,5,12,7,5,12,11,12,5,6,7,6,11,7,12,8,4,12,4,5,3,8,7,5,9,5,9,8,12,9~12,12,12,12,3,4,5,6,6,6,6,7,8,9,10,3,3,3,11,11,11,11,9,9,9,4,4,4,10,10,10,9,6,3,6,10,6,4,11,4,3,11,10,6,11,4,11,7~5,8,10,10,10,11,7,3,3,3,9,8,8,8,6,4,3,10,5,5,5,17,9,9,9,12,16,12,12,12,6,6,6,11,11,11,4,4,4,9,10,6,3,4,3~4,4,4,9,8,5,5,5,4,3,6,10,11,6,6,6,5,18,12,7,18,18,18,12,12,12,6,11,6,5,11,10,6,11,18,12,5,12,5,9,18,11,9,5,11,5,12,11,6,11,5,6,12,6,18,3,6,12,5,6,9,12,9,6,9,7,18,8,5,18,12,11~3,8,9,12,4,11,7,10,5,9,9,9,6,11,11,11,5,5,5,12,12,12,6,6,6,10,10,10,4,4,4,3,3,3,8,6,4,7,6,8,9,4,9,12,6,10,4,11,12,4,12,7,4,8,5,9,12,7,5,4,8,6,10,12,6,4,5,6,12,5,6,7,5,11,5,10,6,12,7,5,4,7,12,4,12,8,7,5,12,10,4,10,7,4,12,8,5,4,12,7,11,5,7,12,5,7,12,4,7,8,9,8,10,4,7,6,4,8,12,9,12,11,10,5,6,4,9,5,8,5,7,6,7,9,11,5,6,8,6,7,12,4,6,8,7,9,6,5,8,4,7,8,5,10,4,7,6,7,10,6",
        reel_set20: "12,13,13,13,9,5,12,12,12,10,13,8,4,6,3,11,7,5,13,5,10,9,3,6,13,3,9,11,13,8,3,8,5,8,5,13~4,4,4,12,5,5,5,5,3,12,12,12,10,7,7,7,7,13,4,8,9,6,11,6,6,6,8,8,8,13,13,13,5,12,7,5,7,6,12,7,8,12,7,5,10,13,12~2,2,2,2~12,13,13,13,4,5,8,12,12,12,11,6,3,7,9,13,10,13,7,13,3,6,7,13,6,7,5,13,9,4,7,6,8,13,7,6,8,11,13,4,9,7,11,10,9,10,6,7,13,7,9,7,6,7,8,7~12,12,12,8,12,7,7,7,6,13,8,8,8,9,5,4,3,11,7,5,5,5,10,4,4,4,13,13,13,6,6,6,4,6,8,13,6,8,7,8,7,8,4,13,5,6,9,6",
        reel_set6: "3,5,5,5,9,4,4,4,8,3,3,3,4,7,6,6,6,6,9,9,9,5,7,7,7,5,8,5,8,7,6,5,8,6,9,8,5,6,9,7,4,6,7,8,7,5,7,9,7,5,7,5,8,4,9,5,9,5,8,6,8,9,5,7,6,5,4,9,5,9,5,6,4,9,4,5,7,9,6,5,9,8,9,5,7,5,8,5,9,7,5,4,6,9,7,6,8,5,9,5,7,5,7,9,5,9,7,5,9,5,7,8,9,5,7,9,6,4,5,7,6,9,5,9,8,9,4,5,4,7,5,6,5,7,5,9,6,7,6,7,6,9,7,6,8,6,9,5,9,4,5,6,5,7,5,4,5,9,7,5,9,8,5,4,5,9,7,9,6,5,8,6,5~5,3,7,7,7,6,8,9,9,9,4,7,8,8,8,9,18,18,18,18,6,6,6,3,3,3,4,4,4,7,8,4,3,4,8,7,6,18,6,4,8,3,8,3,6,18,4,6,4,7,6,3,9,6,3,8,7,8,4,8,7,9,6,3,6,8,4,8,6,8,6,18,6,9,18,8,7,3,7,8,3,6,8,6,7,9,3,7,3,4,6,3,8,6,4,3,8,3,4,3,6,4,9,7,4,8,9,3,6,8,7,3,8,6,4,6,3,9,8,4,6,9,8,6,8,3,9,6,3,7,8,6,4,6,8,9,4,6,4,6,8,18,8,7,8,6,8,18,9,3,7,18,8,6,4,8,4,3,6,3,9,6,3,4,8,6,7,6,4,3,8,4,7,6,7,3,9,3,7,4,6,8,6,7,9,4,6,7,9,8,4,3,18,6~4,8,8,8,3,9,5,8,6,7,9,9,9,16,4,4,4,17,6,6,6,7,7,7,3,3,3,7,9,7,16,7,9,5,17,6,5,8,6,7,17,9,5,7,9,7,9,5,9,17,8,6,7,5,9,3,17,9,17,9,16,3,9,5,6,9,5,3,17,7,17,9,3,9,7,3,5,9,16,9,17,6,9,7,6,3,17,3,9,7,9,6,3,6,9,6,7,17,7,9,8,9,7,9,7,8,17,16,9,3,9,3,9,16,9,5,9,6,8,6,16,9,6,7,9,7,17,6,9,7,9,8,6,5,6,5,16,3,9,8,3,16,3,8,7,9,16,3,9,7,9,3,7~8,8,8,8,5,9,3,3,3,3,6,5,5,5,4,7,4,4,4,6,6,6,9,9,9,4,5,4,9,5,6,9,6,9,3~3,5,7,6,4,4,4,9,8,4,6,6,6,9,9,9,5,5,5,3,3,3,8,8,8,4,5,6,9,8,6,9,5,6,9,6,9,4,5,8,9,6,9,4,6,8,4,8,5,9,4,6,8,5,9,8,6,4,8,5,8,4,5,4,6,9,4,6,4,6,9,4",
        reel_set5: "8,8,8,3,8,7,5,4,9,9,9,6,10,5,5,5,9,6,6,6,10,10,10,4,4,4,3,3,3,4,5,3,5,9,6,3,10,6,10,6,10,5,6,9,10,9,5,3,10,3,4,3,10,9,4,9,6,4,6,10,6,5,9,10,4,6,10,4,3,5,9,5,3,6,5,4,3,9,4,9,4,5,9,5,4,6,9,4,10,4,6,3,5,3,6,10,6,3,4,3,6,3,4,3,6,3,10,3,10,9,10,4,3,6,9,10,3,4,5,3,5,4,9,6,4,10,9,5,3,4,3~8,4,4,4,4,9,9,9,6,7,7,7,5,10,7,3,9,8,8,8,6,6,6,10,10,10,3,3,3,10,3,7,10,7,3,4,9,4,10,7,4,10,9,10,3,9,4,3,6,7,3,4,10,3,7,6,3,9,7,3,6,3,7,6,3,4,10,3,10,3,7,6,9,3,9,7,9,3,4,7,9,3,10,9,10,6,7,6,10,7,6,9,6,9,10,4,3,10,7,10,6,9,7,10,4,9,7,6,3,9,10,4,9,3,6,10,4,3,9,7,4,7,10,3,6,9,3,7,4,7,9,4,9,3,7,4,6,4,3,7,10,3,4,3,10,7,6,3,4,6,10,3,10,6,4,3,4,7,3,4,3,9,10,3,7,9,7,9,3,6,7,4,3,9,7,6,9,3,9,3,4,6,9,4,3,7,6,9,7,9,3,4,7,3,10,4,7,3,10,6~6,16,3,4,8,9,10,10,10,7,17,5,10,6,6,6,4,4,4,9,9,9,3,3,3,8,8,8,4,9,3,8,3,8,17,8,4,9,8,5,3,9,8,3,5,4,3,5,4,10,3,5,3,9,3,4,8,4,9,10,8,3,4,8,5,7,4,10,5,3,9,3,8,4,3,9,10,3,10,3,4,5,7,10,4,9,8,3,10,8,9,3,8,7,9,3,10,8,3,9,5,4,10,16,3,4,10,4,3,8~8,3,3,3,3,9,7,4,6,8,8,8,5,10,18,7,7,7,5,5,5,9,9,9,10,10,10,4,4,4,6,6,6,18,18,18,5,18,6,4,10,9,18,10,6,10,3,7,9,5,7,3,6,4,9,4,6,18,6,3,9,4,3,10,4,10,3,9,5,6,9,3,7,10,18,3,7,18,10,6,4,10,6,18,4,9,3,9,3,6,9,6,10,5,9,6,5,9,6,5,6,3,10,9,6,4,3,9,3,10,9,10,5,7,5,3,18,6,18,6,7,9,18,4,6,7,6,3,6,7,5,18,6,4,10,3,5~8,8,8,9,4,5,3,3,3,6,7,7,7,7,8,3,10,10,10,10,4,4,4,6,6,6,5,5,5,3,7,10,5,9,5,4,3,5,3,10,7,9,3,10,4,7,10,5,3,7,10,4,9,3,6,7,10,6,5,10,5,10,3,9,4,10,5,3,4,6,4,9,5,10,9,10,9,6,4,9,10,3,7,10,3,5,3,4,10,3,5,3,6,7,4,3,6,5,9,5,3,10,5,6,3,9,4,10,3,5,6,5,10,7,3,7,10,9,7",
        reel_set8: "7,7,7,7,6,4,4,4,3,6,6,6,5,4,3,3,3,5,5,5,6,5,3,4,5,4,5,6,5,3,6,4,5,4,5,3,4,6,4,6,4,6,4,6,3,5,3,6,3,5,3,6,4,5,6,4~7,5,6,18,5,5,5,3,4,6,6,6,18,18,18,3,3,3,4,4,4,7,7,7,4,18,6,18,4,3,18,5,18,4,18,4,5,4,6,5,4,3,6,3,6,4,3,6,4,3,18,5,4,3,18,4,18,5,18,6,4,3,4,6,18,3,4,5,6,4,18,6,18,3,5,4,3,4,6,3,5,6,5,4,18,6,18,4,3,6,4,18,4,18,6,3,18,4,5,3,6,3,4~5,16,7,7,7,17,3,7,6,6,6,6,4,3,3,3,5,5,5,4,4,4,6,3,17,7,3,7,3,4,3,7,6,16,6,7,4,7,4,3,6,4,6,7,3,4,6,7,17,7,4,3,4,7,4,7,4,6,3,7,6,4,7,16,3,4,3,17,3~4,5,7,3,6,7,7,7,6,6,6,3,3,3,4,4,4,5,5,5,6,7,6,5,6,7,5,6,5,6,3,7,6,5,7,5,7,6,5,3,6,3,5,3,6,3,7,6,3,7,6,3,6,3,7,3,7,5,7,3,5,7,6,7,6,3,7,3,5,7,5,6,5,6,7,6,7,6,3,7,3,7,6,7,6,3,6,5,7,3,7,5,3,7,3,7,6,7,5,6,3,5,7,3,6,3,6,3,6,5,7,6,7,6,3,6,3,7,3,7,6,3,5,7,5,7,6,7,5,3,6,7,3,5,3,7,3,7,3,5,3,6,7,3,5~6,6,6,3,4,4,4,4,6,7,5,5,5,5,3,3,3,7,7,7,5,3,5,3,5",
        reel_set7: "7,8,8,8,8,4,3,4,4,4,6,6,6,6,5,3,3,3,5,5,5,3,8,5,3,8,4,3,4,3,4,8,4,3,4,8,5,4,3,8,6,3,4,3,5,8,4,3,8,6,8,4,3,4,3,8,6,4,3,8,3,4,3,8,3,8,4,3,8,4,8,3,8,4,3,6,3,8,3,5,4,3,4,8,3,4,3,6,5,4,8,5,4,8,4,6,4,3,4,5,4,6,8,3,6,3,8,3,8,4,3,4,8,4,3,4,6,4,3,4,8,4,3,8,3,4,3,5,3,8,4,3,4,8,4,3,8,3,8,6,3,4,3,6,5,4,8,3,8,6,4,6,4,3,8,4,3,8,3,6,3,6,3,4,8,4,8,3,4,8,6,4,5,4,8,6,4,3,4~3,3,3,8,6,6,6,7,6,5,3,4,4,4,4,8,8,8,4,6,4,8,6,4,6,4,6,4,6,8,6,4,8,6,8,5,8,6,5,4,6,4,6,4,6,4,6,4,6,8,6,4,6,4,6,4,5,4,5,6,5,8,6,4,6,8,4,8,4,6,5,6,4,6,4,6,4,6,4,6,8,4,5,8,5,4,6,4,6,4,6~4,4,4,4,3,3,3,8,5,5,5,5,3,6,6,6,7,8,8,8,6,17,7,7,7,16,8,3,7,6,16,3,7,16,7,8,5,6,5,6,5,8,6,8,3,8,16,17,8,3,6,8,5,3,6,5,3,8,3,6,16,3,8,7,8,5,8,3,5,3,6,7,8,5,3,16,3,17,8,6,8,7,16,6,3,8,7,8,3,7,6,16,8,3,8,7,6,7,8,17,8,6,3,7,5,6,7,6,5,17,3,17,5,8,7,3,7,6,3,8,3,8,6,3,6,8,6,3,7,6,7,3,7,5,8,6,8,3,17,3,7,6,16,6,16,7,3,7,8,3,16,7,6,8,16,8,3,16,8~8,18,5,3,3,3,3,6,7,4,5,5,5,7,7,7,8,8,8,4,4,4,6,6,6,18,18,18,3,7,5,6,4,6,4,18,4,5,6,4,5,6,3,5,7,18,5,3,5,7,6,7,5,6,5,6,3,7~7,7,7,8,5,5,5,7,5,4,3,8,8,8,6,6,6,6,4,4,4,3,3,3,6,8,5,6,3,5,6,5,4,5,4,6,3,6,3,8,3,4,6,4,6,8,6,5,8,3,5,6,3,8,3,5,4,6,3,6,4,6,3,6,5,6,5,6,5,3,6,8,3,8,6",
        reel_set9: "4,5,3,6,3,3,3,4,4,4,6,6,6,5,5,5,6,5,6,3,6,3,5,3,6,5,3,5,6,3,6,3,5,6,3,6,3,5,6,3,5,3,6,3,5,3,5,3,6,5,6,3,6,5,6,5,3,6,3,6,3,6,3,6,5,3,6,5,6,3,5,3,6,3,6,3~4,4,4,4,5,5,5,5,6,3,3,3,3,6,6,6,3,5,3,5,6,3,5,3,5,3,5,3,5,3,5,3,6,5,3,5,3,6,5,6,5,3,5,3,5,3,6,5,6,3,5,6,5,3,6,3,6,3,6,3,6,5,6,5,3,5,3,5,6,5,3,6,3,5,6,3,5,3,6,5,3,5,6,3,5,6,5,6,5,3,5,6,5,3,6,5,3,6,3,6,3,6,3,5,3,5,6,3,5,6,3,5,6,5,3,5,6,3,5,3,6,3,6,3,6,5,3,5,3,5,6,5,6,3,6,3,6,5,3,5,3,6,3,5,6,5,3,5,3,5,6,5,3,6,3,5,3,6,3,5,3,5,3,5~5,16,17,6,6,6,3,4,4,4,6,4,5,5,5,3,3,3,16,6,16,6,3,6,3,4,6,3,6,3,4,3,4,17,3,6,3,6,4,6,17,4,6,3,4,3,6,4,6,4,16,6,3,6,4,3,4,6,3,6,3,6,3,4,3,4,3,4,3,4,6,4,17,4,3,4,6,4,3,17,4,3,6,3,4,6,3,4,3,17,4,3,6,17,4,3,6,17,4,3,4,6,3,4,17,6,3,6,3,6,17,6,3,6,4,3,17,6,4,16,6,4,6,17,6,3,6,4,17,3,6,4,3,16,4,6,4,6,3,6~6,4,4,4,18,5,5,5,5,3,4,6,6,6,3,3,3,18,18,18,5,4,5,3,4,18,3,5,3,5,18,3,4,3,4,3,18,5,3,18,3,5,3,18,5,18,5,18,3,4,5,18,4,5,3,18,3,18,4,3,18,3,18,3,18,3,4,3,5,3,5,18,5,18,3,5,18,3,18,5,18,3,18,4,3,4,3,5,18,5,3,5,18,5,3,18,5,18,3,5,3,18,3,4~3,4,6,6,6,6,5,5,5,5,3,3,3,4,4,4,6,4,6,4,5,6,4,6,4,6,4,5,4,6,5,6,4,5,4,6,4,6,4,5,6,5,4,6,4,6,5,6,4,6,4,6,4,6,4,5,4,6,5,6,4,6,4,5,6,4,5,4,5,6,4,6,4,5,6,4,6,4,6,5,6,5,4,5,6,4,5,4,6,5,4,6,4,6,4,6,4,5,6,5,6,4,6,4,5,4,6,5,4,5,4,6,4,5,6,5,6,5,4,6,5,6,4,6,5,4,5,4,6,5,4,6,4,5,4,6,5,6,4,5,6,5,4,6,4,6,4,5,6,4,6,5,6,5,6,5,6,5,6,4,5,4,6,5,6,4,5,6,5,6,5,6,4,6,5,6,4,5,4,5,4,6,5,6,4,6,5,6,4,6,4,5,4,6,4",
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
        balance: 0,
        accm: "cp~tp~lvl~sc",
        acci: 0,
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        stime: new Date().getTime(),
        sa: "",
        sb: "",
        sh: 3,
        c: player.betPerLine,
        sver: 5,
        l: 20,
        s: Util.view2String(player.machine.view),
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

    result["accv"] = player.machine.floorSN;
    result["reel_set"] = player.machine.reelIndex;
    if (player.machine.basement) {
        result["trail"] = "basement~1";
    }
    if (player.machine.floorChange) {
        result["accm"] = "cp~tp~lvl~sc~cl";
    }

    if (prevGameMode == "BASE") {
        if (player.machine.currentGame == "FREE") {
            //                                   ,                    
            result["na"] = "b";
            result["bgid"] = 0;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["status"] = "0,0,0";
            result["wins_mask"] = "h,h,h";
            result["wins"] = "0,0,0";
            result["wp"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
        } else if (player.machine.currentGame == "BONUS") {
            result["acci"] = "0;1";
            result["accm"] = "cp~tp~lvl~sc~cl;cp~mp";
            result["accv"] = player.machine.floorSN;
            result["end"] = "0";
            result["rs_c"] = "1";
            result["rs_m"] = "4";
            result["rs_p"] = "0";
            result["rs"] = "mc";
            result["rw"] = "0.00";
            result["na"] = "b";
            result["bgid"] = 2;
            result["bgt"] = 21;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;
            result["status"] = "0,0,0";
            result["wins_mask"] = "h,h,h";
            result["wins"] = "0,0,0";
            result["wp"] = 0;
            result["level"] = 0;
            result["lifes"] = 1;
        }
    } else if (prevGameMode == "FREE") {
        //                       
        result["tw"] = player.machine.freeSpinWinMoney;
        result["acci"] = "0;2;3";
        result["accm"] = "cp~tp~lvl~sc;cp~mp;cp~tp~lvl~sc";
        result["accv"] = player.machine.freeSpinFloorSN;

        if (player.machine.currentGame == "FREE") {
            result["na"] = "s";
            result["fs"] = player.machine.freeSpinIndex;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["fstype"] = "psf";

            if (player.machine.freeSpinStep == 1 && player.machine.freeSpinNextStep == 2) {
                result["fsmore"] = 5;
            }

            //                                                 
            if (player.machine.freeSpinStep != player.machine.freeSpinNextStep) {
                result["accm"] = "cp~tp~lvl~sc;cp~mp;cp~tp~lvl~sc~cl";
            }
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fsend_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["fstype"] = "psf";
            result["w"] = player.machine.freeSpinWinMoney;
            // result['fsend_total'] = 1;
        }
    } else if (prevGameMode == "BONUS") {
        //                          
        result["tw"] = player.machine.moneyBonusWin;
        result["acci"] = "0;1";
        result["accm"] = "cp~tp~lvl~sc~cl;cp~mp";
        result["accv"] = player.machine.floorSN;
        result["mo_t"] = player.machine.moneyCache.table.join();
        result["mo"] = player.machine.moneyCache.values.join();
        result["reel_set"] = 48;
        result["c"] = player.betPerLine;
        result["sty"] = player.machine.holdSpinSticky;

        if (player.machine.currentGame == "BONUS") {
            result["na"] = "s";
            result["pw"] = player.machine.moneyBonusWinPerBet;
            result["rs_c"] = player.machine.moneyBonusCount + 1;
            result["rs_m"] = 4;
            result["rs_p"] = player.machine.moneyCacheIndex;
            if (player.machine.holdSpinAdded) {
                result["rs"] = "mc";
            }
            result["w"] = 0;
        } else if (player.machine.currentGame == "BASE") {
            //                                        ->                       
            result["na"] = "c";
            result["accm"] = "cp~tp~lvl~sc;cp~mp";
            result["mo_c"] = 1;
            result["mo_tv"] = player.machine.winMoney / player.betPerLine;
            result["mo_tw"] = player.machine.winMoney;
            result["pw"] = 0;
            result["rs_t"] = player.machine.moneyCacheIndex;
            result["tw"] = player.machine.moneyBonusWin;
            result["w"] = player.machine.winMoney;
        }
    }

    result["index"] = param.index;
    result["counter"] = ++param.counter;

    // console.log(result);

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

ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance_bonus: "0.00",
        bgt: 21,
        end: 1,
        level: 1,
        lifes: 0,
        rw: "0.00",
        na: "s",
        sver: 5,
        tw: "0.00",
        wp: 0,
    };

    var stautsArr = [0, 0, 0];
    stautsArr[param.ind] = 1;

    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;
    result["index"] = param.index;
    result["stime"] = new Date().getTime();
    result["counter"] = ++param.counter;
    result["status"] = stautsArr.join(",");
    result["coef"] = player.virtualBet;

    if (player.machine.currentGame == "FREE") {
        result["acci"] = "0;2;3";
        result["accm"] = "cp~tp~lvl~sc;cp~mp;cp~tp~lvl~sc";
        result["accv"] = `${player.machine.floorSN};${player.machine.freeSpinFloorNumber}~12;0~1~0~0`;
        result["bgid"] = "0";
        result["fs"] = 1;
        result["fsmul"] = 1;
        result["fsres"] = "0.00";
        result["fswin"] = "0.00";
        result["fstype"] = "psf";
        result["fsmax"] = player.machine.freeSpinLength;
        result["wins"] = player.machine.freeSpinCountArr.join(",");
        result["wins_mask"] = "psf,psf,psf";
    } else if (player.machine.currentGame == "BONUS") {
        result["acci"] = "0;1";
        result["accm"] = "cp~tp~lvl~sc~cl;cp~mp";
        result["accv"] = player.machine.floorSN;
        result["bgid"] = "2";
        result["wins"] = player.machine.holdSpinCountArr.join(",");
        result["wins_mask"] = "pbf,pbf,pbf";
    }

    // console.log(result);

    return result;
};

module.exports = ApiManager;