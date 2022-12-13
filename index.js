const express = require('express')
const mongoose = require('mongoose')
const app = express()
const usersRoutes = require('./route/userRoute')
const productRoutes = require('./route/productsRoute')
 const {body, validationResult} = require('express-validator')
const user = require('./models/user')
const cartRoutes = require('./routes/cartRoute')




app.use(express.json())
app.use('/users', usersRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)


// userid = 6391f94dd962f10f150b60e3

//1
  app.post( 
    '/register', 
    body('email').isEmail(),
    body('password').isLength({ min: 8, max:20 }),
    body ('name').trim().not().isEmpty(),
    async (req, res) => {
    try {
        console.log(req.body)
        const { email, password, age, name } = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        const condidate = await user.findOne({email})

        // const hashPassword = bcrypt.hashSync(password, 10)
        // const user = new User({
        //     email,
        //     age,
        //     name,
        //     password: hashPassword,
        // })

        await user.save()
        return res.json({ message: 'Вы успешно зарегистрированы!' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong. Try again later' })
    }
})


//2
  app.post(
    '/login', 
    body('email').trim().not().isEmpty(),
    body('password').trim().not().isEmpty(),
    body('name').isLength({max: 4, min: 8}),
    async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty) {
            return res.status(400).json({ message: 'Неправильный логин или пароль' })
        }

        // const isSamePass = bcrypt.compareSync(password, candidate.password)
        // if (!isSamePass) {
        //     return res.status(400).json({ message: 'Неправильный логин или пароль' })
        // }
        // const { password: pwd, ...userData } = candidate
    //     return res.json(candidate)
    } catch (e) {
    //     console.log(e)
    //     res.status(500).json({ message: 'Something went wrong' })
    }
})
//
const init = async () => {
    const MONGO_URL = 'mongodb+srv://kushbak:UbQA00IvIyG8DjbQ@cluster0.qbgqneh.mongodb.net/?retryWrites=true&w=majority'
    await mongoose.connect(MONGO_URL)

    app.listen(3000, () => {
        console.log('SERVER HAS BEEN STARTED ON 3000')
    })
}

init()