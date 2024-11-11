const fs = require('fs');

module.exports = async (app) => {
    const data = fs.readFileSync('./db/updator.sql', 'utf8');
    let sqlArray = data.split(';');
    let isUpdated = false;
    let nUpdatedSQL = 0;

    for (var i = 0; i < sqlArray.length; i++) {
        if (sqlArray[i].trim() === "") continue;
        // console.info("  >>   " + sqlArray[i].trim());
        var result;
        try {
            result = await app.db.sequelize.query(sqlArray[i]);
        } catch (e) {
            result = e;
        }

        if (result.length > 0) {
            if (result[0].affectedRows > 0) {
                ++nUpdatedSQL;
            }
            // console.info("     o     [SUCCESS] affectedRows:" + result[0].affectedRows + "; " + result[0].info);
            // console.log("");
            continue;
        }
        if (result.message && result.message.indexOf("Duplicate column") >= 0) {
            // console.info("     x     [ERR] Column Exist!");
        } else {
            console.info("     x     [ERR] " + result.message);
        }
        // console.log("");
    }

    if (nUpdatedSQL > 0) {
        console.log(`* Updating Data Completed! [${nUpdatedSQL} Changes]`);
    } else {
        console.log(`* Updating Data Completed! [No Change]`);
    }
}