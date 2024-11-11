module.exports = app => {
    const User = app.db.sequelize.define('user', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        login: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        email: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        token: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
        balance: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
        realRtp: { type: Sequelize.DOUBLE(10, 2), allowNull: false, defaultValue: 0 },
        targetRtp: { type: Sequelize.DOUBLE(10, 2), allowNull: false, defaultValue: 80 },
        totalDebit: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 },
        totalCredit: { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 }
    });

    User.prototype.setBalance = async function (debit, credit, callHistId) {
        this.balance = this.balance - debit + credit;
        //                                                      .
        if (callHistId <= 0) {
            this.totalDebit += debit;
            this.totalCredit += credit;
            this.realRtp = this.totalDebit ? (this.totalCredit / this.totalDebit * 100).toFixed(2) : 100;
        }
        await this.save();
    }

    app.db.User = User;
}