import jwt from 'jsonwebtoken'

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('authorization').split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Access denied' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // Continue
    } catch (error) {
        res.status(400).json({ error: 'Token is expired' })
    }
}

export { verifyToken };