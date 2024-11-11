require('dotenv').config();

const app = require('./app')();

const initializer = require('./utils/init_app_module');

initializer(app)
    .add('./global')
    .add('./db')
    .add('./db/updator')
    .add('./models')
    .add('./routes')
    .add('./http-server')
    .add('./timer')
    .add('./socket-server')
    .init();
