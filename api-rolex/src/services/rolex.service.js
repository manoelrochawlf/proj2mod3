const rolex = [{
    id: 1,
    name: 'DAY-DATE 40',
    description: 'O caminho mais ousado',
    img: 'https://content.rolex.com/dam/2022/bg/model-cover-lightbox-background-steel-landscape.png?impolicy=v6-model-feature&c1path=/dam/2022/upright-bba-with-shadow/m228236-0012.png&sc1=0.65&c1x=506&c1y=-233&imwidth=1920',

  },
  {
    id: 2,
    name: 'YACHT-MASTER 42',
    description: 'Reluzir com um novo brilho',
    img: 'https://content.rolex.com/dam/2022/bg/model-cover-lightbox-background-yellow-gold-landscape.png?impolicy=v6-model-feature&c1path=/dam/2022/upright-bba-with-shadow/m226658-0001.png&sc1=0.65&c1x=506&c1y=-233&imwidth=1920',

  },
  {
    id: 3,
    name: 'DATEJUST 31',
    description: 'Uma perene renovação.',
    img: 'https://content.rolex.com/dam/2022/bg/model-cover-lightbox-background-steel-landscape.png?impolicy=v6-model-feature&c1path=/dam/2022/upright-bba-with-shadow/m278274-0035.png&sc1=0.65&c1x=506&c1y=-233&imwidth=1920',

  },
];

const allRolexService = () => {
    return rolex;
  };
  
const rlxIdService = (id) => {
    return rolex.find((rlx) => rlx.id == id);
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
