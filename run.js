const config = require('./config.js');
const Discuz = require('./discuz.js');

const discuz = new Discuz();
// console.log(discuz.getRandomIP());
// discuz.getUserGroup();
for(let i = 1; i <= 10; i++) {
    discuz.getUserGroup(i);
}