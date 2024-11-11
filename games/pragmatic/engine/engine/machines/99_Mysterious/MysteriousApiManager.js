var Util = require('../../../utils/slot_utils');

var randomModes = ["lord", "lady", "baron"];
var freeTypes = ["wilds", "scatters"];
var extendPositions = [4, 10, 16, 22, 5, 11, 17, 23];         //                                             

function ApiManager() { }
/*
                      10,5,8                               .
                                           
                                                .

                       4                           

         
0	      
1	         
2	      
3	                     
4	                  

2	Lord	         0
	aw 0	(                    0)
	awt 	rsf
	prg_m 	cp
	prg	1
	trail	mode~lord
	wdm_m	s~p~m
	wdm_V	2~8~3
		         2~      8~      3
6	is
	rwd	1~15
		1~               
11	wdm_m	s~p~m
	wdm_v	2~2~2
105                   , cp 90    1                    
	      	1
	msr	5
113	ep	12~3~3,9,15,21
	is
	rwd	(1~         )
	msr 	                  .                              
	lg	0(                   -1,ts                   0),
		8(s                         -1,)  
	ts	is    12                       

140	            _1
	aw	1	(         3       1, 4       2)
	awt	rsf
	bgid	0	(         3       0, 4       1)
	bgt	30
	bw	1
	ds	      ~4,      ~10,16,22,5,11,17,23
	dsa	0;0;0;0;0;0
	dsam	v;v;v;v;v;v
	
	wins_mask	fsw,fss
	wns	                  ,                   	
	wp	0
	
	doBonus
	bgid	0	(         3       0, 4       1)
	bgt	30
	trail	mode~lay,fs_mode~scatters
143		                   
149		                   
155		                   
177	msr	5
	                                                                           			            .                                    ts                    s                
	          lg    a,b
		a	ts             0,        -1
		b	s             -1,           ts            
	lg	0	ts        2   
		-1	s             

180	                                              
	lg	0	s 256   
		11	ts             

183	lg	-1	ts             
		-1	s             

186	lg	0	ts 2   
		-1	s       

188	lg	0	ts 2   
		-1	s       
212	         
225	                	cp 86 -> 1
337                     	cp 92 -> 1
353	         
365	            _0
	      	3
	doBonus
	bgid	0
	bgt	30
	trail	mode~lady,fs_mode~wilds
	
	acci	0
	accm	cp
	accv 	0(                   =                 +                ),
444	            _0		(16:               ,17:               )
	mode~lady,fs_mode~wilds
465	      (               )          	cp 91 -> 1
	      	2
567                		cp 91 -> 1
683                    684, 712, 731, 796	cp 98 -> 1
744	            _1	mode~lady,fs_mode~scatters
	      	4
747      .	                   ~	(18:         )
	ds	1~      
	dsa	1
	dsam	v
	gwm	      
	wmt	ss
	wmv	      (3,6,9,12          )
	wnd	0
	
752            
	ds	1~      ,1~      
	dsa	1;1
	dsam	v;v
	gwm	      
	wmt	ss
	wmv	      
	wnd	3,2,1,0(                     )
806                 cp 92 -> 1 
	862, 893, 894, 900, 924
863	             0, ind=0	(16,17:          )

929                  1052,		cp 90 -> 1
	rwd	0,20
	is
938	            _1, ind=1

1028	            _0, ind=0
1060                    	cp 82 -> 1


2.json
            		14:               , 15:               
72	rwd	14~3;15~9
73	rwd	14~14;15~2,8,20
*/
ApiManager.prototype.InitApi = function (player, param) {
    var result = {
        msi: '12',
        def_s: '3,4,5,6,7,8,9,10,11,3,4,5,6,7,8,9,10,11,3,4,5,6,7,8',
        balance: '0.00',
        cfgs: '3583',
        nas: '13',
        ver: '2',
        index: '1',
        balance_cash: '0.00',
        reel_set_size: '5',
        def_sb: '3,4,5,6,7,8',
        def_sa: '3,4,5,6,7,8',
        reel_set: '0',
        prg_cfg_m: 'cp',
        balance_bonus: '0.00',
        na: 's',
        scatters: '1~0,0,0,0,0,0~0,0,0,0,0,0~1,1,1,1,1,1',
        gmb: '0,0,0',
        rt: 'd',
        base_aw: 't;t;t',
        stime: '1646039945448',
        sa: '3,4,5,6,7,8',
        sb: '3,4,5,6,7,8',
        prg_cfg: '1',
        sc: '20.00,30.00,40.00,50.00,60.00,70.00,80.00,90.00,100.00,110.00,120.00,130.00,140.00,150.00,160.00,170.00,180.00,190.00,200.00,240.00,300.00,400.00,500.00,700.00,800.00,1000.00,1500.00,2000.00,3000.00,5000.00,7000.00,10000.00',
        defc: '200.00',
        sh: '4',
        wilds: '2~0,0,0,0,0,0~1,1,1,1,1,1;12~0,0,0,0,0,0~1,1,1,1,1,1;14~0,0,0,0,0,0~1,1,1,1,1,1;15~0,0,0,0,0,0~1,1,1,1,1,1;16~0,0,0,0,0,0~1,1,1,1,1,1;17~0,0,0,0,0,0~1,1,1,1,1,1;18~0,0,0,0,0,0~1,1,1,1,1,1',
        bonuses: '0',
        fsbonus: '',
        c: '200.00',
        sver: '5',
        counter: '2',
        paytable: '0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;250,100,50,25,0,0;100,50,25,10,0,0;60,40,20,10,0,0;50,30,15,5,0,0;30,20,10,5,0,0;25,15,5,0,0,0;25,15,5,0,0,0;20,10,5,0,0,0;20,10,5,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0',
        l: '10',
        rtp: '94.50',
        reel_set0: '1,10,7,3,3,11,11,7,11,3,8,11,9,4,9,9,1,5,10,10,3,7,4,6,7,3,4,7,5~8,4,5,10,1,8,5,4,6,8,10,6,10,5,10,5,8,11,8,8,11,11,6,5,1,8,8,10,9,10,10,2,4,6,5,5,4,7,6,10,4,6,6,10,3,10,6,11,8,5,8,8,4,5~6,7,9,7,5,1,3,8,8,11,11,6,8,9,6,8,5,11,9,7,9,3,7,11,6,8,7,5,2,7,9,5,1,11,8,8,9,9,7,6,8,10,8,7,7,4,5,11,9,3~7,9,4,3,4,10,3,2,10,6,1,10,7,9,8,8,6,5,3,4,6,4,3,8,3,10,3,10,8,7,6,4,6,9,3,4,8,10,10,7,8,10,9,9,1,7,9,11,9,4~13,13,13,13~13,13,13,13',
        s: '3,4,5,6,7,8,9,10,11,3,4,5,6,7,8,9,10,11,3,4,5,6,7,8',
        accInit: '[{id:0,mask:"cp"}]',
        reel_set2: '1,11,11,7,4,7,11,7,5,4,9,9,1,3,6,9,7,10,8,4,11,11,10,10,3~5,10,1,7,9,9,6,14,8,8,6,4,10,10,1,4,4,3,10,10,14,5,11,8,11,11~1,11,11,7,5,8,8,11,14,10,10,9,7,3,9,9,1,7,6,4,5,9,9,9,14,7~4,3,10,10,1,4,7,3,10,14,8,9,6,4,5,9,9,11,14,6,10,3,8,8,1,6,7~13,13,13,13~13,13,13,13',
        t: '243',
        reel_set1: '1,7,9,7,4,3,10,10,8,4,7,11,4,6,7,5,3,1,11,11,9,9,11,11,10~1,11,11,4,4,12,10,10,4,8,3,5,1,11,11,5,4,10,6,7,11,12,6,8,8,9,9~7,11,9,4,1,9,9,9,10,10,7,12,8,8,5,3,7,1,5,6,11,11,12,7,9,9~6,1,8,8,9,10,4,12,7,5,9,9,6,4,1,8,3,6,11,7,4,12,10,10,3~13,13,13,13~13,13,13,13',
        reel_set4: '11,11,11,4,7,9,10,10,1,11,11,11,11,3,9,9,3,3,8,6,4,5,7,1,11,11,4,4,10,7,7~5,3,3,6,4,11,11,11,11,10,10,10,10,5,11,6,4,5,5,10,10,10,18,8,8,4,4,10,9,9,7~5,5,11,7,9,7,8,8,10,10,8,7,6,18,9,9,11,11,3,3,4,5,9,9,7,7~6,6,10,9,6,8,11,7,4,3,3,8,8,3,7,7,10,5,9,18,4,6,9,3,4,10,10~4,9,8,10,18,8,7,4,8,10,3,9,4,9,7,5,5,10,11,6,10,6,6,5,7~3,3,9,5,1,11,10,8,6,6,10,11,9,10,11,7,6,4,4,9,1,5,4,9,11,3,10,7',
        reel_set3: '7,9,9,3,7,5,9,3,16,10,10,7,4,3,8,4,10,11,11,11,11,4,7,16,11,11,11,6,11,11~5,11,10,10,10,10,16,8,8,8,10,10,10,4,10,11,11,6,3,11,11,11,11,4,9,9,16,8,8,4,5,7,5,6~5,7,4,7,16,8,8,11,11,9,7,11,10,10,8,11,11,16,6,9,5,3,9,9,7~5,16,10,4,7,9,9,9,10,6,3,8,8,16,7,6,3,4,6,11,9,9,8,4,9,10,10~10,9,10,7,16,5,11,6,6,8,3,9,8,4,10,11,16,5,7,3,6,7,10,9,8,4~9,7,5,16,11,9,10,11,6,6,3,9,4,5,8,11,16,7,10,9,7,10,4,6,10,11',
        awt: 'rsf',
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
        balance_cash: 0,
        balance_bonus: 0,
        na: "s",
        prg_m: "cp",
        prg: player.machine.randomCount,
        reel_set: player.machine.currentType,
        stime: new Date().getTime(),
        sa: "1,2,3,4,5",
        sb: "1,2,3,4,5",
        sh: 4,
        sver: 5,   
        c: player.betPerLine,
        l: 10,
        trail: `mode~${randomModes[player.machine.currentType]}`,
        w: player.machine.winMoney,
        s: Util.view2String(player.machine.view)
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
    result["index"] = param.index;
    result["counter"] = ++param.counter;
    result["balance"] = player.balance;
    result["balance_cash"] = player.balance;

    if (player.machine.currentType == 1) {
        result["msr"] = player.machine.stackSymbol;
    }

    var rwd = [];

    if (prevGameMode == "BASE") {
        result["aw"] = 0;
        result["awt"] = "rsf";

        if (player.machine.currentGame == "BASE" && player.machine.wildArr.length) {
            var currentType = player.machine.currentType;

            if (currentType == 0) {
                result["wdrm_m"] = "s~p~m";
                result["wdrm_v"] = `2~${player.machine.wildArr[0]}~${player.machine.multi}`;
            } else {
                result["is"] = player.machine.maskView.join();
            }

            if (currentType == 1) {
                result["ep"] = `12~${player.machine.wildArr}~${player.machine.wildExArr}`;
                result["lg"] = player.machine.lg;
                rwd.push(`12~${player.machine.wildArr}`);
                result["ts"] = player.machine.trailView;
            }

            if (currentType == 2) {
                rwd.push(`14~${player.machine.wildArr};15~${player.machine.wildExArr}`);
            }
        } else if (player.machine.currentGame == "FREE") {

            //                                   ,                    
            result["aw"] = 1;
            result["bw"] = 1;
            result["coef"] = player.virtualBet;

            var ds = [];
            var dsa = [];
            var dsam = [];

            extendPositions.forEach(function (item) {
                ds.push(`${player.machine.view[item]}~${item}`);
                dsa.push(0);
                dsam.push('v');
            });

            result["ds"] = ds.join(';');
            result["dsa"] = dsa.join(';');
            result["dsam"] = dsam.join(';');
            result["end"] = 0;
            result["is"] = player.machine.maskView;
            result["level"] = 0;
            result["lifes"] = 1;
            result["rw"] = 0;
            rwd.push(`1~${player.machine.scatterPositions}`);
            result["status"] = '0,0';
            result["wins_mask"] = 'fsw,fss';
            result["wins"] = `${player.machine.freeSpinLength},${player.machine.freeSpinLength}`;
            result["wp"] = 0;
            result["na"] = "b";
        }
    } else if (prevGameMode == "FREE") {

        if (player.machine.isFreeSpinAdd) {
            result["fsmore"] = 3;
        }

        result["reel_set"] = 3 + player.machine.freeSpinType;

        if (player.machine.currentGame == "FREE") {
            result["tw"] = player.machine.freeSpinWinMoney;
            result["fs"] = player.machine.freeSpinIndex + 1;
            result["fsmax"] = player.machine.freeSpinLength;
            result["fsmul"] = 1;
            result["fswin"] = player.machine.freeSpinWinMoney;
            result["fsres"] = player.machine.freeSpinWinMoney;
            result["na"] = "s";
        } else if (player.machine.currentGame == "BASE") {
            //                                     ->                       
            result["na"] = "c";
            result["fs_total"] = player.machine.freeSpinLength;
            result["fsmul_total"] = 1;
            result["fswin_total"] = player.machine.freeSpinWinMoney;
            result["fsres_total"] = player.machine.freeSpinWinMoney;
            result["tw"] = player.machine.freeSpinWinMoney;
        }

        if (player.machine.freeSpinType == 0) {
            result["acci"] = 0;
            result["accm"] = "cp";
            result["accv"] = player.machine.movingCount;


            if (player.machine.wildArr.length) {
                result["is"] = player.machine.maskView;

                if (player.machine.wildExArr.length) {
                    rwd.push(`17~${player.machine.wildExArr.join()}`);
                }
                rwd.push(`16~${player.machine.wildArr.join()}`);
            }
        } else {
            if (player.machine.multi > 1) {
                result["gwm"] = player.machine.multi;

                if (player.machine.clocks.length) {
                    var ds = [];
                    var dsa = [];
                    var dsam = [];

                    player.machine.clocks.forEach(function (item) {
                        ds.push(`1~${item}`);
                        dsa.push(1);
                        dsam.push('v');
                    });

                    result["ds"] = ds.join(';');
                    result["dsa"] = dsa.join(';');
                    result["dsam"] = dsam.join(';');
                }

                result["wmt"] = "ss";
                result["wmv"] = player.machine.multi;
                result["wnd"] = player.machine.lockingCount;
            }
        }

        result["trail"] = `mode~${randomModes[player.machine.currentType]};fs_mode~${freeTypes[player.machine.freeSpinType]}`;
    }

    if (rwd.length) {
        result["rwd"] = rwd.join(';');
    }

    return result;
}

ApiManager.prototype.CollectApi = function (player, param) {
    var result = {
        balance: player.balance,
        index: param.index,
        balance_cash: player.balance,
        balance_bonus: "0.0",
        na: "s",
        stime: new Date().getTime(),
        sver: "5",
        counter: ++param.counter,
    };

    return result;
}


ApiManager.prototype.BonusApi = function (player, param) {
    var result = {
        balance: player.balance,
        balance_cash: player.balance,
        balance_bonus: "0.00",
        bgid: player.machine.freeSpinLength > 8 ? 1 : 0,
        bgt: 30,
        coef: player.virtualBet,
        counter: ++param.counter,
        end: 1,
        fs: 1,
        fsmax: player.machine.freeSpinLength,
        fsmul: 1,
        fsres: 0,
        fswin: 0,
        index: param.index,
        level: 1,
        lifes: 0,
        na: "s",
        rw: 0,
        status: player.machine.freeSpinType ? "0,1" : "1,0",
        stime: new Date().getTime(),
        sver: 5,
        trail: `mode~${randomModes[player.machine.currentType]},fs_mode~${freeTypes[player.machine.freeSpinType]}`,
        wins_mask: "fsw,fss",
        wins: `${player.machine.freeSpinLength},${player.machine.freeSpinLength}`,
        wp: 0
    };

    return result;
}
module.exports = ApiManager;