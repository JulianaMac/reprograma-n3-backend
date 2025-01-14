const express = require('express');
const router = express.Router();

const controller = require("../controllers/TreinadoresController")


router.get('', controller.getAll)
router.post('', controller.add)
router.get('/:id', controller.getById)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)
router.post('/:treinadorId/pokemons', controller.addPokemon)
router.patch('/:treinadorId/pokemons/:pokemonId/treinar', controller.treinarPokemon)
<<<<<<< HEAD
router.get('/:treinadorId/pokemons/:pokemonId/', controller.getPokemonByTreinador)
router.get('/:id/pokemons', controller.getPokemons)
// router.patch('/:treinadorId/pokemons/:pokemonId', controller.updatePokemon)
router.post('/login', controller.login)
=======
>>>>>>> 98cc28c52e0f481cc63be9b5764caf0e2671d71b

module.exports = router
