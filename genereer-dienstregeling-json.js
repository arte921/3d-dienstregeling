const {
    rijdtOpDag,
    ritStationsVolledig
} = require('./functies/interpreters.js');

const writeJSONSync = require('./functies/writeJSONSync.js');
const leesIFFSync = require('./functies/leesIFFSync.js');
const readJSONSync = require('./functies/readJSONSync.js');
const stationsLijstPolyline = require('./functies/stationsLijstPolyline.js');
const coordinaatAfstand = require('./functies/coordinaatAfstand.js');
const {
    haalEnkeleRegelOp,
    tijdNaarMinutenGetal
} = require('./functies/utility.js');

const stations = readJSONSync("stations");

const stationscodelijst = stations.map((station) => station.code);

const config = readJSONSync('config');

const begintijdgetal = tijdNaarMinutenGetal(config.begintijd);
const eindtijdgetal = tijdNaarMinutenGetal(config.eindtijd);

const dienstregeling = leesIFFSync('timetbls')
    .split("#")
    .map((entry) => "#" + entry)
    .slice(1)
    .filter((rit) => rijdtOpDag(rit, config.dag))
    // .filter((rit) => ["IC"].includes(haalEnkeleRegelOp(rit, "&")[0]))
    // .map(ritStationsVolledig)
    // .filter((rit) => rit.every((stop) => stationscodelijst.includes(stop.station)))
    // .filter((rit) => rit[0].vertrektijd >= begintijdgetal && rit[rit.length - 1].aankomsttijd <= eindtijdgetal);


const alleritjes = [];
const alletijdwegen = [];

for (const rit of dienstregeling) {
    const stops = ritStationsVolledig(rit);

    const ritnummer = haalEnkeleRegelOp(rit, "%")[1];
    console.log(ritnummer);

    let i = 0;
    while (i + 1 < stops.length) {
        let offset = 1;
        while (!stops[i + offset].stopt) {
            offset++;
        }

        const vertrektijd = stops[i].vertrektijd;
        const aankomsttijd = stops[i + offset].aankomsttijd;

        const stations = [...stops]
            .slice(i, i + offset + 1)
            .map((stop) => stop.station);

        const polyline = stationsLijstPolyline(stations);

        let hoogte = 0;
        const lijn = [{
            lat: polyline[0].lat,
            lng: polyline[0].lng,
            hoogte: hoogte
        }];

        for (let j = 1; j < polyline.length; j++) {
            hoogte += coordinaatAfstand(polyline[j], polyline[j - 1]);
            lijn.push({
                lat: polyline[j].lat,
                lng: polyline[j].lng,
                hoogte: hoogte
            });
        }

        lijn.forEach((punt) => punt.hoogte = vertrektijd + punt.hoogte / hoogte * (aankomsttijd - vertrektijd));

        alleritjes.push({
            vertrektijd: vertrektijd,
            aankomsttijd: aankomsttijd,
            lijn: [lijn[0], lijn[lijn.length - 1]]
            // lijn: lijn
        });

        alletijdwegen.push({
            vertrektijd: vertrektijd,
            aankomsttijd: aankomsttijd,
            stations: stations,
            beginetappe: i == 0,
            eindetappe: i == stops.length - 2
        });

        i += offset;
    }
}
/*
console.log(alleritjes.length);
console.log(dienstregeling.length);
console.log(alleritjes.length / dienstregeling.length + 1);
console.log(alletijdwegen[13]);
*/
writeJSONSync(alleritjes, 'alleritjes');
writeJSONSync(alletijdwegen, 'alletijdwegen');