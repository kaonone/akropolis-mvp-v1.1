const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = function (deployment, network) {
    if (network === 'development') {
        return;
    }
    const dir = 'releases/' + network;
    mkdirp.sync(dir);
    fs.writeFile(dir + '/deployment.json', JSON.stringify(deployment), 'utf8', function (err) {
        if (err) console.log("Error while writing deployment addresses: " + err);
    })
};