const axios = require("axios");

module.exports = (app) => {
    global.io = require('socket.io')(app.server, { 'pingInterval': 1000, 'pingTimeout': 10000000 });

    io.on('connection', function (socket) {
        socket.on("join", async (data) => {
            const { token, gameCode } = data;
            const user = await app.db.User.findOne({ where: { token } });
            
            if(!user){
                console.log(`[             join]       <${token}>                    `);
                return;
            }
            socket.user = user;
            socket.gameCode = gameCode;
            socket.userAddress = socket.conn.remoteAddress.replace('::ffff:', '');

            
        });

        socket.on('disconnect', async () => {
            if (!socket.user || !socket.gameCode) { return; }
            const player = await app.db.Player.findOne({ where: { userCode: socket.user.email, gameCode: socket.gameCode } });

            if (!player) {
                console.log("[      ]                          ")
                console.log(`socket.user.userCode = ${socket.user.email}`);
                console.log(`socket.gameCode = ${socket.gameCode}`);
                return;
            }

            await player.Update({ connected: 0, token: '' });            
            console.log(socket.user.login, "                 ,             :", socket.gameCode);
        });
    });

    global.sendSocket = function (msg, data, userCode) {
        if (!userCode) {
            io.sockets.emit(msg, data);
        } else {
            for (var curSocket of io.sockets.sockets) {
                if (curSocket[1].user.login == userCode) {
                    curSocket[1].emit(msg, data);
                }
            }
        }
    }
};

async function sendNoticeEvent(url, jsonBody, reason) {
    var successflag = false;
    for (var i = 0; i < 10; i++) {
        try {
            let res = await axios.post(url, jsonBody);
            if (res.data.status == 1) {
                successflag = true;
                break;
            }
        } catch (ex) {
            logger.info(`       ${reason}        ${i + 1}              : ${url}`);
            logger.info(ex);
        }
    }
    if (!successflag) {
        logger.info(`       ${reason}        10                              [Error]: ${url}`);
    }
}