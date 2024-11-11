module.exports = app => {

    const Game = app.db.sequelize.define('game', {
        g_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        g_name: Sequelize.STRING,        
        g_title: Sequelize.STRING
    },
        {
            tableName:"game_settings"
        });
    app.db.Game = Game;
}