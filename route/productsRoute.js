 

 const { Router } =  require('express')
const product = require('../models/product')
const Product = require('../models/product')
 const router = Router()
 const {body, validationResult} = require('express-validator')
 

 //crud- create, read, update, delete


 router.post(
    '/', 
    body('title').trim().isLength({max: 50, min: 1}).withMessage('в названии должно быть от 1 до 350 символов'),
    body('description').trim().isLength({ min:1, max: 350}).withMessage('в названии должно быть от 1 до 350 символов'),
    body('image').notEmpty().withMessage('это поле обязательно')
        .isURL().withMessage('неправильно введена ссылка'),
    body('price').isNumeric().notEmpty().withMessage('цена должна быть числом')
         .notEmpty().withMessage('это поле обязательно'),
    body('owner').notEmpty().withMessage('это поле обязательно'),

    async (req, res) => {
    try{
          const { title, price, description, owner, image} = req.body

          const errors = validationResult(req)

          if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
          }

          const product = new Product({title, price, description, owner, image})
          
          await product.save()
          res.status(201).json(product)

    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Someting went wrong'})
    }
 })

//dz

router.get('/', async (req, res) => {
    try{

        const candidate = await User
            .findById(req.params.id)
            .select(['-password'])

    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Someting went wrong'})
    }
 })

 //dz
 router.get('/:id', async (req, res) => {
    try{
        // const { title, price, description, owner, image} = req.body

        //   const product = new Product({title, price, description, owner, image})
          
          await product.save()
          res.status(201).json(product)
    
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Someting went wrong'})
    }г
 })

 //
 router.patch('/:id', async (req, res) => {
    try{
        const { title, description, price, image, owner} = req.body
        const condidate = await Product.findById(req.params.id)
        if(!condidate) {
            return res.status(404).json({ message: 'продукт не найден'})
        }

        if(owner !== condidate.owner.toString()) {
            return res.status(400).json({ message: 'вы не можете отредоктировать чужой проект'})
        }

         Object.assign(condidate, {
            title: title || condidate.title ,
            description: description || condidate.description ,
            price: price || condidate.price ,
            image: image || condidate.image
         })

          await condidate.save()
          return res.json(condidate)

    } catch(e) {
        console.log(e)
        res.status(500).json({messege: 'Someting went wrong'})
    }
 })

 //dz
 router.delete('/:id', async (req, res) => {
    try{
         
        await product
         
    } catch(e) {
        console.log(e)
        res.status(500).json({messege: 'Someting went wrong'})
    }
 })

 module.exports = router


