const {
    splitRegels
} = require('./functies/utility.js');

const writeJSON = require("./functies/writeJSON.js");
const haalDataOp = require('./functies/haalDataOp.js');
const leesIFFSync = require('./functies/leesIFFSync.js');
const writeJSONSync = require('./functies/writeJSONSync.js');
const readJSONSync = require('./functies/readJSONSync.js');

const config = readJSONSync("config");

(async (nsapi) => {
    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/', nsapi);
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations', nsapi);

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    writeJSON(geformatterdestations, 'stations');
    writeJSON(spoorkaart, 'spoorkaart');
})(config.ns_app_key_primary);


const dienstregeling = leesIFFSync('timetbls').split("#").map((entry) => "#" + entry).slice(1);
const voetnoten = leesIFFSync('footnote').split("#").slice(1).map((entry) => splitRegels(entry)[1]);

writeJSONSync(dienstregeling, 'dienstregeling');
writeJSONSync(voetnoten, 'voetnoten');