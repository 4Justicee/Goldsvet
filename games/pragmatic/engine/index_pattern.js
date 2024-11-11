require('dotenv').config();

const app = require('./app')();
const initializer = require('./utils/init_app_module');

process.env.PORT = process.env.PATTERN_PORT || 8942;

initializer(app)
    .add('./global')
    .add('./db')
    .add('./models')
    .add('./routes/patternAPI')
    .add('./http-server')
    .add('./timer')
    .init();
