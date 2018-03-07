class Discuz {
    
    constructor() {
        this.config = require('./config.js');
        this.fs = require('fs');
        this.cheerio = require('cheerio');
        this.superagent = require('superagent');
        this.charset = require('superagent-charset')(this.superagent);

        this.userGroupURL = this.config.url + '/home.php?mod=space&do=profile&from=space';
        this.header = {
            'Referer': this.config.url,
            'User-Agent': 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile',
            'X-Forwarded-For': this.getRandomIP(),
            'Cookie': 'xx=xx'
        };
    }

    getUserGroup(uid = 1) {
        this.superagent
                .get(this.userGroupURL)
                .set(this.header)
                .query('uid=' + uid)
                .charset()
                .end(function(req, res){
                    if (res.status === 200) {
                        let $ = this.cheerio.load(res.text);
                        console.log($('title').html());
                    }
                    // console.log(res);
                    // fs.writeFile('./test2.txt', 'test test', function(err) {  
                    //     if (err) { throw err; }
                    // });
                });
    }

    getRandomIP() {
        return this.getRandomNum() + "." + this.getRandomNum() + "." + this.getRandomNum() + "." + this.getRandomNum();
    }

    getRandomNum() {
        return Math.floor((Math.random() * 255) + 1);
    }
}
module.exports = Discuz;