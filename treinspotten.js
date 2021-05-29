const readJSONSync = require('./functies/readJSONSync.js');

const alletijdwegen = readJSONSync('alletijdwegen');
const stations = readJSONSync('stations');
const config = readJSONSync('config');

console.log(alletijdwegen
    .filter((tijdweg) => tijdweg.stations.slice(1).includes(config.spotstation))
    .length
);
/*
console.log(
    stations
        .map((station) => ({
            naam: station.namen[2],
            treinen_per_dag: (
                alletijdwegen
                    .filter((tijdweg) => tijdweg.stations.slice(1).includes(station.code))
                    .length
            )
        }))
        .sort((stationa, stationb) => stationb.treinen_per_dag - stationa.treinen_per_dag)
        .slice(0, 10)
);*/