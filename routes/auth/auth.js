import route from 'express';
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import { schemaLogin, schemaRegister } from '../../schemas/SchemaAuth.js'
import jwt from 'jsonwebtoken'
const router = route.Router();

router.post('/register', async (req, res) => {

    // Validate user
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error })
    }

    const { name, email, password } = req.body

    const isEmailExist = await User.findOne({ email: email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Creating new user
    const user = new User({
        name: name,
        email: email,
        password: encryptedPassword
    });

    try {
        //Save user in database
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body

    // Validations
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: { user, token }
    })
})

export default router;