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
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'max-age=0',
            'Referer': this.config.url,
            'Host': this.config.url,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36',
            'Cookie': 'a=b'
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
                .end(function(err, res){
                    if (res.status === 200) {
                        let $ = that.cheerio.load(res.text, { decodeEntities: false });
                        let nameArr = $("title").html().split("的个人资料");
                        if(nameArr.length > 1) {
                            let user = {
                                uid: uid,
                                name: nameArr[0],
                                group: $("a[href*='usergroup'] :last").html()
                            };
                            let userJson = JSON.stringify(user);
                            console.log(userJson);
                        }
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