module.exports = app => {
    const History = app.db.sequelize.define('history', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userCode: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        gameCode: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        agentCode: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        roundID: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        bet: { type: Sequelize.DOUBLE(20, 2), allowNull: false, defaultValue: 0 },
        win: { type: Sequelize.DOUBLE(20, 2), allowNull: false, defaultValue: 0 },
        balance: { type: Sequelize.DOUBLE(10, 2), allowNull: false, defaultValue: 0 },
        data: { type: Sequelize.TEXT, allowNull: false, defaultValue: '' },
    });

    app.db.History = History;
}