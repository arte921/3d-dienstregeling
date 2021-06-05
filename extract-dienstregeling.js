const leesIFFSync = require('./functies/leesIFFSync.js');
const {
    haalEnkeleRegelOp,
    tijdNaarMinutenGetal
} = require('./functies/utility.js');

const {
    rijdtOpDag,
    ritStationsVolledig
} = require('./functies/interpreters.js');

const dienstregeling = leesIFFSync('timetbls')
    .split("#")
    .map((entry) => "#" + entry)
    .slice(1)
    .map((rit) => ({
        ritnummer: haalEnkeleRegelOp(rit, "%")[1],
        stops: ritStationsVolledig(rit)
    }));

console.log(dienstregeling[0]);