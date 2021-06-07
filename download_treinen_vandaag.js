const haalDataOp = require('./functies/haalDataOp.js');
const writeJSON = require('./functies/writeJSON.js');
const readJSON = require('./functies/readJSON.js');

process.on('uncaughtException', console.log(error.stack));

(async () => {
    const ritten = await Promise.all((await readJSON('alleritjes'))
        .map((rit) => rit.ritnummer)
        .filter((ritnummer, index, array) => array.indexOf(ritnummer) == index)
        .map((ritnummer) => haalDataOp(`/virtual-train-api/api/v1/trein/${ritnummer}`)));

    await writeJSON(ritten, 'ritten');
})();