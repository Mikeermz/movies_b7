const mongoose = require('mongoose');

const URL_MONGO = 'mongodb+srv://mikeermz:Manzana1234@mikee-wvjvk.mongodb.net/movies_b7';

mongoose.connect(
  URL_MONGO,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
  },
  (error) => {
    if (error) console.log(error);
    if (!error) console.log('Conexion exitosa');
  }
);

const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  edad: {
    type: Number, 
    default: 18
  },
  nationality:{
    type: String,
    enum: ['MX', 'US', 'NA'],
    default: 'NA',
  }
}, {timestamps: true});

const Director = mongoose.model('Director', directorSchema);

module.exports = { Director };