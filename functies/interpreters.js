const readJSONSync = require('./readJSONSync.js');

const {
    splitRegels,
    stripSpaties,
    splitEntries,
    tijdNaarMinutenGetal
} = require('./utility.js');

const voetnoten = readJSONSync('voetnoten');

// rekent eindstation standaard niet mee
// > beginstation
// . korte stop
// + lange stop
// < eindstation
const stopStations = (rit, stoptypen = [">", ".", "+"]) => splitRegels(rit)
    .filter((regel) => stoptypen.includes(regel.charAt(0)))
    .map((regel) => /[^ ]*/.exec(regel.substring(1)).toString());

const ritStationsVolledig = (rit, stoptypen = [">", ".", "+", "<"]) => splitRegels(rit)
    .filter((regel) => [">", ";", ".", "+", "<"].includes(regel.charAt(0)))
    .map((regel) => {
        const type = regel.charAt(0);
        const entries = splitEntries(regel.substring(1));
        const stopt = type != ";";
        const vertrekIndex = type == "+" ? 2 : 1;
        return {
            stopt: stopt,
            vertrektijd: stopt ? tijdNaarMinutenGetal(entries[vertrekIndex]) : null,
            aankomsttijd: stopt ? tijdNaarMinutenGetal(entries[1]) : null,
            station: entries[0]
        }
    });


const ritVanafStation = (rit, station) => {
    const volledigeRit = ritStationsVolledig(rit);
    const vertrekIndex = volledigeRit.map((station) => station.station).indexOf(station);
    return volledigeRit.slice(vertrekIndex);
};

const vertrekTijd = (rit, station) => {
    const regels = splitRegels(rit);
    for (const regel of regels) {
        const waarden = splitEntries(regel.slice(1));
        if (waarden[0] == station) {
            if ([">", "."].includes(regel.charAt(0))) {
                return waarden[1];
            } else if (regel.charAt(0) == "+") {
                return waarden[2];
            }
        }
    }
};

const rijdtOpDag = (rit, dag) => {
    const index = splitRegels(rit)
        .find((regel) => regel.charAt(0) == "-")
        .slice(1)
        .split(',')
        .map(stripSpaties)[0] - 0
    if (index >= voetnoten.length) return false;
    return voetnoten[index].charAt(dag) == "1";
};

module.exports = {
    stopStations,
    ritStationsVolledig,
    ritVanafStation,
    vertrekTijd,
    rijdtOpDag
};