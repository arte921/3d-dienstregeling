const readJSONSync = require('./readJSONSync.js');
const stations = readJSONSync("stations");

module.exports = (stationscode) => {
    let e = stations.find((kandidaatStation) => kandidaatStation.code == stationscode);
    if (!e) console.log(stationscode);
    return e;
}