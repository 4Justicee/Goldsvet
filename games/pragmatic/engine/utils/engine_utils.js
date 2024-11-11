var fs = require("fs");

exports.getFiles = async function (dir, files_) {
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = dir + '\\' + files[i];
        var stat
        try {
            stat = fs.statSync(name);
        } catch (e) {
            console.log(e);
            await fs.unlink(name, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Error occuring file deleted!');
                }
            });
            continue;
        }
        if (fs.statSync(name).isDirectory()) {
            await this.getFiles(name, files_);
        } else {
            files_.push({
                name: name,
                size: stat.size,
                birthtime: stat.birthtime,
                mtime: stat.mtime
            });
        }
    }
    return files_;
}

exports.getFromRedis = function (app, keystring) {
    return new Promise((resolve) => {
        app.redis_client.get(keystring, (err, data) => {
            if (err) {
                console.log(err);
                resolve(null);
            }
            // Redis                             .
            if (data != null) {
                resolve(data);
            } else {
                resolve(null);
            }
        });
    });
};