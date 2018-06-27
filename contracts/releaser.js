const fse = require('fs-extra');

module.exports = function (deployment, network) {
    if (network === 'development') {
        return;
    }
    const dir = 'releases/' + network;
    return fse.ensureDir(dir).then(() => {
        console.log("ensure");
        return fse.writeFile(dir + '/deployment.json', JSON.stringify(deployment), 'utf8');
    });
};