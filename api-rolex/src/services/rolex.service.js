const Rolex = require('../models/rolex');


const allRolexService = async () => {
    const allRolex = await Rolex.find();
    return allRolex;
};

const rlxIdService = async (id) => {
  const rolexId = await Rolex.findById(id);
  return rolexId
};

const createRolexService = (newRlx) => {
    const newId = rolex.length + 1;
    newRlx.id = newId;
    rolex.push(newRlx);
    return newRlx;
};

const updateRolexService = (id, rolexEdited) => {
    rolexEdited['id'] = id;
    const rolexIndex = rolex.findIndex((rlx) => rlx.id == id);
    rolex[rolexIndex] = rolexEdited;
    return rolexEdited;
};

const deleteRolexService = (id) => {
    const rolexIndex = rolex.findIndex((rlx) => rlx.id == id);
    return rolex.splice(rolexIndex, 1);
};
  
module.exports = {
    allRolexService,
    rlxIdService,
    createRolexService,
    updateRolexService,
    deleteRolexService,
};
