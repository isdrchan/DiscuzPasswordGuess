class Discuz {
    
    constructor() {
        this.config = require('./config.js');
        this.fs = require('fs');
        this.url = require("url");
        this.cheerio = require('cheerio');
        this.superagent = require('superagent');
        this.charset = require('superagent-charset')(this.superagent);

        this.hostname = this.url.parse(this.config.url).hostname;
        this.userGroupURL = this.config.url + '/home.php?mod=space&do=profile&from=space';
        this.header = {
            'Referer': this.config.url,
            'User-Agent': 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile',
            'Cookie': 'xx=xx'
        };
    }

    getUserGroup(uid) {
        let that = this;
        this.superagent
                .get(this.userGroupURL)
                .set(this.header)
                .set({'X-Forwarded-For': this.getRandomIP()})
                .query('uid=' + uid)
                .charset()
                .end(function(req, res){
                    if (res.status === 200) {
                        let $ = that.cheerio.load(res.text, { decodeEntities: false });
                        let user = {
                            name: $("a[href^='home.php?mod=space&uid=']").html(),
                            group: $("a[href^='home.php?mod=spacecp&ac=usergroup&gid=']").html()
                        };
                        let userJson = JSON.stringify(user);
                        console.log(userJson);
                    }
                    console.log(res);
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