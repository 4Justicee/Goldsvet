const fs = require('fs');
const moment = require("moment");
const axios = require("axios");
axios.defaults.timeout = 5000;

GetLogConfig();

function GetLogConfig() {
    try {
        let prev = JSON.stringify(global.logConfig);
        global.logConfig = JSON.parse(fs.readFileSync('logconfig.json', 'utf8'));

        if (prev != JSON.stringify(global.logConfig)) {
            logger.info("[            ]           >>>>>>>>>> ");
            logger.info(global.logConfig);
        }
    } catch (ex) {
        logger.info(`[GetLogConfig       ]---`);
        logger.info(ex);
    }
    setTimeout(GetLogConfig, 5000);
}

GetJustRtpConfig();

async function GetJustRtpConfig() {
    try {
        const url = "http://justslot.kro.kr:2422/api/forgameserver";
        let jsonBody = {
            method: "get_rtp_config",
            provider_code: "PRAGMATIC_OLD"
        };

        let res = await axios.post(url, jsonBody);
        let justInfo = res.data;
        if (justInfo.status == 1) {
            let prev = JSON.stringify(global.rtpConfig);

            if (justInfo.rtpConfig) {
            	global.rtpConfig = justInfo.rtpConfig;
            } else {
                logger.info("[JustRtpConfig] null             ");
            }

            if (prev != JSON.stringify(global.rtpConfig)) {
                logger.info("[JustRtpConfig]           >>>>>>>>>> ");
                logger.info(justInfo.rtpConfig);
            }
        } else {
            logger.info(`[GetJustRtpConfig        1] Intennal Error ---`);
            logger.info(JSON.stringify(justInfo));
        }
    } catch (ex) {
        // logger.info(`[GetJustRtpConfig        2] Network Error ---`);
        // logger.info(ex);
    }
    setTimeout(GetJustRtpConfig, 12000);
}

// setInterval(() => {
//     if (global.logConfig.show_time) {
//         let time = moment(new Date()).format("YYYY-M-D, HH:mm:ss")
//         console.log(`${time}`);
//     }
// }, 1000)