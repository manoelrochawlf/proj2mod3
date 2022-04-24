const mongoose = require('mongoose');

const rolexSchema = new mongoose.Schema({

    name: {
      type: String, 
      required: true 
    },

    description: { 
      type: String, 
      required: true
    },

    img: {
    type: String, 
    required: true
    },

  });

  const rolexCollection = mongoose.model('rolex', rolexSchema);

 module.exports = rolexCollection;
