

const { Schema, model } = require('mongoose')
const product = require('./product')

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: product,
        required: true,
    },
    quantity: {
        type: number,
        ref: product,
        required: true,
    },
    owner: {
        Schema: product,
        type: String,
        ref: product,
        require: true
    }
})
module.exports =model( 'Cart', cartSchema)