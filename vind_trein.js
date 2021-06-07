const readJSONSync = require("./functies/readJSONSync");

const ritten = readJSONSync('ritten');

const trein = 2233;

console.log(ritten.filter((rit) => rit.materieeldelen.materieelnummer && rit.materieeldelen.materieelnummer.map((materieel) => materieel.materieelnummer).includes(trein)));