const { connect } = require('../models/Repository')
const treinadoresModel = require('../models/TreinadoresSchema')
const { pokemonsModel } = require('../models/PokemonsSchema')

connect()

const getAll = (request, response) => {
  treinadoresModel.find((error, treinadores) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinadores)
  })
}

const getById = (request, response) => {
  const id = request.params.id

  return treinadoresModel.findById(id, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(treinador)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const add = (request, response) => {
  const novoTreinador = new treinadoresModel(request.body)

  novoTreinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(novoTreinador)
  })
}

const remove = (request, response) => {
  const id = request.params.id

  treinadoresModel.findByIdAndDelete(id, (error, treinador) => {
    if (error) {
      return response.status(500).send(error)
    }

    if (treinador) {
      return response.status(200).send(id)
    }

    return response.status(404).send('Treinador não encontrado.')
  })
}

const update = (request, response) => {
  const id = request.params.id
  const treinadorUpdate = request.body
  const options = { new: true }

  treinadoresModel.findByIdAndUpdate(
    id,
    treinadorUpdate,
    options,
    (error, treinador) => {
      if (error) {
        return response.status(500).sned(error)
      }

      if (treinador) {
        return response.status(200).send(treinador)
      }

      return response.status(404).send('Treinador não encontrado.')
    }
  )
}

const addPokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemon = request.body
  const novoPokemon = new pokemonsModel(pokemon)
  const treinador = await treinadoresModel.findById(treinadorId)

  treinador.pokemons.push(novoPokemon)
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(201).send(treinador)
  })
}

const treinarPokemon = async (request, response) => {
  const treinadorId = request.params.treinadorId
  const pokemonId = request.params.pokemonId
  const inicio = request.body.inicio
  const fim = request.body.fim
  const treinador = await treinadoresModel.findById(treinadorId)
  const pokemon = treinador.pokemons.find((pokemon) => pokemonId == pokemon._id)
  const novoNivel = calcularNivel(inicio, fim, pokemon.nivel)

  pokemon.nivel = novoNivel
  treinador.save((error) => {
    if (error) {
      return response.status(500).send(error)
    }

    return response.status(200).send(treinador)
  })
}

const getPokemonByTreinador = async (request, response) => {
    const treinadorId = request.params.treinadorId
    const pokemonId = request.params.pokemonId

    const treinador = await treinadoresModel.findById(treinadorId)
    // const pokemon = treinador.pokemons.find((pokemon) => pokemonId == pokemon._id)
    
    treinador.pokemons.find((error, pokemon) =>  {
    
      if (pokemonId == pokemon._id) {
        return response.status(200).send(pokemons)
      }
  
      return response.status(500).send(error)
    })
    // return treinadoresModel.findById(pokemon, (error, treinador) => {
    // if (error) {
    //     return response.status(500).send(error)
    //   }
  
    //   return response.status(200).send(treinador)
    // })   
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  addPokemon,
  treinarPokemon,
  getPokemonByTreinador
}