//dz1

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select(['-password'])
        return res.json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

//2
router.get('/:id', async (req, res) => {
    try{
        const { title, price, description, owner, image} = req.body

        const candidate = await User
        .findById(req.params.id)
        .select(['-password'])

          await product.save()
          res.status(201).json(product)
    
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Someting went wrong'})
    }г
 })




 //3

 router.delete('/:id', async (req, res) => {
    try{

          await product.delete(red.params.id)
         
    } catch(e) {
        console.log(e)
        res.status(500).json({messege: 'Someting went wrong'})
    }
 })
