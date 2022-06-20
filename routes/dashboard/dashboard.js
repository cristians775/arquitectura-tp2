import route from 'express'
const router = route.Router();

//This route is and example
router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            user: req.user
        }
    })
})

export default router