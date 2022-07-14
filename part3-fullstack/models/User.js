const {Schema, model} = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: {type: String, required:true, unique: true},
    name: {type: String, required:true},
    passwordHash: {type: String, required:true},
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User', userSchema)
userSchema.plugin(uniqueValidator)

module.exports = User