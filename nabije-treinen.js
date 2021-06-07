const haalDataOp = require('./functies/haalDataOp.js');
const coordinaatAfstand = require('./functies/coordinaatAfstand.js');

(async () => {
    const gebruiker_positie = {
        lat: 51.9852803,
        lng: 5.8968969
    };

    const treinen = await haalDataOp(`/virtual-train-api/api/vehicle?lat=${gebruiker_positie.lat}&lng=${gebruiker_positie.lng}&radius=10000000&limit=1`);

    const afstand = coordinaatAfstand(gebruiker_positie, treinen.payload.treinen[0]);

    const afgeronde_afstand = Math.round(afstand * 1000);
    const snelheid = Math.round(treinen.payload.treinen[0].snelheid);
    
    console.log(`De dichstbijzijnde trein is ${afgeronde_afstand} meter van u verwijderd en heeft een snelheid van ${snelheid} km/h.`);
    
})();
