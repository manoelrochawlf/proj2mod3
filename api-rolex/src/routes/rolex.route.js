const express = require('express');
const router = express.Router();

const rolexController = require('../controllers/rolex.controller');

router.get('/all-rolex', rolexController.allRolexController);
router.get('/rlx/:id', rolexController.rlxIdController);

router.post('/create', rolexController.createRolexController);
router.put('/update/:id', rolexController.updateRolexController);
router.delete('/delete/:id', rolexController.deleteRolexController);

module.exports = router;
