global.curConnectIps = [];
global.perSecondReqs = 0;
global.curReqs = 0;

exports.countRequest = (req, res, next) => {
    global.curReqs++;
    next();
};

exports.resetCountRequest = () => {
    global.perSecondReqs = global.curReqs;
    
    global.curReqs = 0;
};

exports.countIp = (req, res, next) => {
    if (global.curConnectIps.indexOf(req.remoteAddress) == -1) {
        global.curConnectIps.push(req.remoteAddress);
    }

    next();
};

exports.resetCountIp = (req, res, next) => {
    console.log("10    IP          :", global.curConnectIps.length);
    global.curConnectIps = [];
};
