const mongoose = require('mongoose')

const uniqueVlaidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueVlaidator)

module.exports = mongoose.model('Author', schema)
