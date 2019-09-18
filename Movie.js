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

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: Number,
    default: 90
  },
  genre: {
    type: String,
    enum: ['CO', 'DA', 'TE'],
    required: true
  },
  covers: [String],
  directors: {
    type: [{
      name: String,
      edad: {
        type: Number, 
        default: 18
      },
      nationality:{
        type: String,
        enum: ['MX', 'US', 'NA'],
        default: 'NA',
        required: true
      }
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };