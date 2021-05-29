const readJSONSync = require('./readJSONSync.js');
const alletijdwegen = readJSONSync('alletijdwegen');

module.exports = (spotstation) => alletijdwegen
    .filter((tijdweg) => tijdweg.stations.includes(spotstation))
    .filter((tijdweg) => !(tijdweg.stations[0] == spotstation && !tijdweg.beginetappe))