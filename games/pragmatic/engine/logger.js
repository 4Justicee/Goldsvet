const Winston = require('winston');
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
require("winston-daily-rotate-file");
let logger = createLogger({
    format: combine(
        format.printf((info) => {
            if (typeof info.message === 'object') {
                info.message = JSON.stringify(info.message, null, 3)
            }
            return info.message
        }),
        timestamp(),
        printf(({ level, message, timestamp }) => `${new Date(timestamp).toLocaleString("ko-KR", { hour12: false })}: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: process.env.PORT != process.env.PATTERN_PORT ? "log/%DATE%.log" : "log_gen/%DATE%.log",
            datePattern: "YYYY-MM-DD__HH",
            maxFiles: "7d"
        })
    ]
});

logger.stream = {
    write: message => {
        logger.info(message);
    }
};

if (process.env.DEBUG === "true") {
    logger = console;
}
module.exports = logger;