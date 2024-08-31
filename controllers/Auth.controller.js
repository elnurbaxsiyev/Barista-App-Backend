const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/Users.model");

const AuthController = {
    register: async (req, res) => {
        try {
            const { title, password, email, role } = req.body;

            // Zorunlu alanları kontrol et
            if (!title || !password || !email) {
                return res.status(400).send({ error: "Title, email, and password are required" });
            }

            // Email formatını kontrol et
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).send({ error: "Invalid email format" });
            }

            // Basit şifre kontrolü (en az 6 karakter)
            const passwordRegex = /^.{6,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).send({ error: "Password must be at least 6 characters long." });
            }

            // Email veya title zaten var mı kontrol et
            const existingUser = await Users.findOne({ $or: [{ email }, { title }] });
            if (existingUser) {
                return res.status(400).send({ error: "User already exists" });
            }

            // Şifreyi hash'le
            const hashedPassword = await bcrypt.hash(password, 10);

            // Yeni kullanıcı oluştur
            const newUser = new Users({ title, password: hashedPassword, email, role });
            await newUser.save();

            res.status(201).send({ message: "User registered successfully" });
        } catch (error) {
            res.status(500).send({ error: `An unexpected error occurred while saving the user: ${error.message}` });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Zorunlu alanları kontrol et
            if (!email || !password) {
                return res.status(400).send({ error: "email and password are required" });
            }

            // Kullanıcıyı email'a göre ara
            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).send({ error: "Invalid credentials" });
            }

            // Şifreyi doğrula
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({ error: "Invalid credentials" });
            }

            // JWT oluştur
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.send({ message: "Logged in successfully", token });
        } catch (error) {
            res.status(500).send({ error: "An unexpected error occurred. Please try again later." });
        }
    }
};

module.exports = { AuthController };
