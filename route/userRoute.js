
const { Router } = require('express')
const User = require("../models/user")
const bcrypt = require('bcrypt')

const router = Router()



router.get('/', async (req, res) => {
    try {
        const users = await User.find().select(['-password'])
        return res.json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const candidate = await User
            .findById(req.params.id)
            .select(['-password'])

        if (!candidate) {
            res
                .status(404)
                .json({ message: 'Пользователь с таким айди не найден' })
        }
        res.json(candidate)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email })
        if (!candidate) {
            return res.status(400).json({ message: 'Неправильный логин или пароль' })
        }

        const isSamePass = bcrypt.compareSync(password, candidate.password)
        if (!isSamePass) {
            return res.status(400).json({ message: 'Неправильный логин или пароль' })
        }
        // const { password: pwd, ...userData } = candidate
        return res.json(candidate)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password, age, name } = req.body
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        const user = new User({
            email,
            age,
            name,
            password: hashPassword,
        })

        await user.save()
        return res.json({ message: 'Вы успешно зарегистрированы!' })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong. Try again later' })
    }
})


//dz
router.patch(
    '/:id',
    body('title').trim().isLength({max: 50, min: 1}).withMessage('в названии должно быть от 1 до 350 символов'),
    body('description').trim().isLength({ min:1, max: 350}).withMessage('в названии должно быть от 1 до 350 символов'),
    body('image').notEmpty().withMessage('это поле обязательно')
        .isURL().withMessage('неправильно введена ссылка'),
    body('price').isNumeric().notEmpty().withMessage('цена должна быть числом')
         .notEmpty().withMessage('это поле обязательно'),
    body('owner').notEmpty().withMessage('это поле обязательно'),

     async (req, res) => {
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
            title,
            description,
            price,
            image
         })

          await condidate.save()
          return res.json(condidate)

    } catch(e) {
        console.log(e)
        res.status(500).json({messege: 'Someting went wrong'})
    }
 })


module.exports = router