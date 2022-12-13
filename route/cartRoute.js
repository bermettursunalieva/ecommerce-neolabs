const { Router } = require('express-validator')
const cart = require('../models/cart')
const router = Router()
const cartRoutes = require('./routes/cartRoute')


//


//

router.get('/:id', async (req, res) => { 
    try {
    const userId = req.params.userId
    const cart = await cart.find({ owner: userId}).populate('product')
    res.json(cart)
    

    } catch(e) {
        console.log(e)
        res.staus(500).json({ message: 'Someting get wrong'})
    }


})

//
router.post('/', async (req, res) => {
    const { product, owner, quantity } = req.body

    const newCartItem = new cart({product, owner, quantity})

    await newCartItem.save()
    res.status(201).json(newCartItem)
})

//


//


router.patch( '/:cartItemId', async (req, res) => {
    try { 
        const cartItemId = req.params.cartItemId
        const { quantity } = req.body
        const cartItem = await cart.findById(cartItemId)

        if(!cartItem) {
            return res.status(404).json({ message: 'такой товар не сушествует'})
        }
        Object.assign(cartItem, { quantity})
        await cartItem.save()

            return res.json(cartItem)
        
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Someting get wrong'})
    }

})

//
 router.delete('/:cartItemId', async (req, res ) => {
    const cartItemId = req.params.cartItemId
    const cartItem = await cart.findById(cartItemId)

    if(!cartItem) {
        return res.status(404).json({ message: 'такого айди нет'})
    }

    await cart.deleteOne({ id: cartItemId })
    return res.json({ message: 'товар успешно удален'})
 })

module.exports = router