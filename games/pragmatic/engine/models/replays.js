module.exports = app => {
    const Replay = app.db.sequelize.define('replay', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        agentCode: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        userCode: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        gameCode: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        roundID: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        bet: { type: Sequelize.DOUBLE(20, 2), allowNull: false, defaultValue: 0 },
        win: { type: Sequelize.DOUBLE(20, 2), allowNull: false, defaultValue: 0 },
        rtp: { type: Sequelize.DOUBLE(10, 2), allowNull: false, defaultValue: 0 },
        playedDate: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        data: { type: Sequelize.TEXT('long'), allowNull: false, defaultValue: '' },
        sharedLink: { type: Sequelize.STRING, allowNull: false, defaultValue: '' }
    },
        {
            timestamps: true,
            updatedAt: false
        });
    app.db.Replay = Replay;
}