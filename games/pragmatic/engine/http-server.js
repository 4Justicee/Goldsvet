const http = require('http');

module.exports = (app) => {
    const port = process.env.PORT || 8940;

    app.server = http.createServer(app)
        .on('listening', () => {
            logger.info("######################################################");
            logger.info("##  Pragmatic 01 Server has started on port " + port + ".   ##");
            logger.info("######################################################");
        })
        .on('close', () => {
            logger.info(`HTTP Server: Closing server`);
        })
        .on('error', (err) => {
            logger.info(err);
            process.exit(1);
        })
        .listen(port);
};