var crypto = require('crypto');

module.exports = {

    genSalt: function (SALT_WORK_FACTOR, callback) {
        return callback(null, 'aaa');
    },
    hash: function (pwd, salt, callback) {
        var md5 = crypto.createHash('md5');
        md5.update(pwd);
        return callback(null, md5.digest('hex'));
    },
    compare: function (pwd, cpwd, callback) { 
        var md5 = crypto.createHash('md5');
        md5.update(pwd);
        var encodePwd=md5.digest('hex');
        console.log(pwd+':'+cpwd);
        console.log(encodePwd+':'+cpwd);
        return callback(null, cpwd===encodePwd);
    }
}