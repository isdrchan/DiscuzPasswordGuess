const config = require('./config.js');
const Discuz = require('./discuz.js');

const discuz = new Discuz();
// console.log(discuz.getRandomIP());
// discuz.getUserGroup();
let uid = [];
for(let i = 10000; i <= 10010; i++) {
    uid.push(i);
}
async.mapLimit(uid, 5, function (uid, callback) {
    discuz.getUserGroup(i);
}, function (err, result) {
    console.log('final:');
    console.log(result);
});
    
