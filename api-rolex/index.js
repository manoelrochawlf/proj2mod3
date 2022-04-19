const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const route = require("./src/routes/rolex.route")

app.use(express.json());
app.use(cors());
app.use('/rolex', route);

app.get('/rolex/all-rolex', (req, res) => {
    res.send(rolex);
  });

app.get('/rolex/rlx/:id', (req, res) => {
    const idParam = req.params.id;
    const getRolex = rolex.find((rlx) => rlx.id == idParam);
    res.send(getRolex);
  });

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
