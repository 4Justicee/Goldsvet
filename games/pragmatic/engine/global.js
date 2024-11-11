const { Sequelize, Op } = require('sequelize');

global.Sequelize = Sequelize;
global.Op = Op;
global.EUtil = require("./utils/engine_utils");
global.Util = require("./utils/slot_utils");
global.logger = require("./logger");
global.PAT_SERVER_URL = process.env.PAT_SERVER_URL || "http://pragmatic.kro.kr:8942";

global.rtpConfig = {
    "BuyBonusDefaultMulti": 100,    //                                                                          (                       )

    "JackpotNormalStart": 100,        //100   :                                                    (user.jackpotCome                  2022-12-09 18:00 Julian                                  )
    "JackpotNormalEnd": 200,          //200   :                                                   

    "JackpotLongStart": 200,          //300   :                                                      
    "JackpotLongEnd": 600,            //800   :                                                      

    "JackpotLongPercent": 10,       //                                 

    "FreeMinMulti": 0,             //                                                               ->                     (          20                         .)

    "SmallBaseMaxMulti": 4,        //                                                            ->                    
}