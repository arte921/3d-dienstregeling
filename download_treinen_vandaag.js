const haalDataOp = require('./functies/haalDataOp.js');
const writeJSON = require('./functies/writeJSON.js');
const readJSON = require('./functies/readJSON.js');


(async () => {
    const ritten = await Promise.all((await readJSON('alleritjes'))
        .map((rit) => rit.ritnummer)
        .filter((ritnummer, index, array) => array.indexOf(ritnummer) == index)
        .map(async (ritnummer) => await haalDataOp(`/virtual-train-api/api/v1/trein/${ritnummer}`)));

    await writeJSON(ritten, 'ritten');
})();