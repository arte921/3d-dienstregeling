const readJSONSync = require('./functies/readJSONSync.js');
const treinenperdag = require('./functies/treinenperdag.js');

const stations = readJSONSync('stations');
const config = readJSONSync('config');
// console.log(treinenperdag(config.spotstation).length);
// return;
console.log(
    stations
        .map((station) => ({
            naam: station.namen[2],
            treinen_per_dag: treinenperdag(station.code).length
        }))
        .sort((stationa, stationb) => stationb.treinen_per_dag - stationa.treinen_per_dag)
        .slice(0, 10)
);