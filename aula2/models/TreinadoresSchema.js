const mongoose = require('mongoose');
const { PokemonsSchema } = require('./PokemonsSchema')
const Schema = mongoose.Schema;
const TreinadoresSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  foto: { type: String, required: true },
<<<<<<< HEAD
  senha: {type: String, required: true},
=======
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b
  pokemons: [PokemonsSchema],
})

const treinadoresModel = mongoose.model('treinadores', TreinadoresSchema);

module.exports = treinadoresModel;
