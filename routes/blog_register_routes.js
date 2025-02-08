const express = require("express");
const router = express.Router();
const User = require("../models/mongoose_blog_register_models");
const bcrypt = require("bcrypt");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// Middleware
router.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

// GET /register rotası
router.get("/", csrfProtection, (req, res) => {
    res.render("register", { csrfToken: req.csrfToken() });
});

// POST /register rotası
router.post("/", csrfProtection, async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        // Şifre kontrolü
        if (password !== repeatPassword) {
            return res.status(400).json({ message: "Şifreler uyuşmuyor" });
        }

        // Email veya kullanıcı adı kontrolü
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Bu email veya kullanıcı adı zaten kullanılıyor" });
        }

        // Yeni kullanıcı oluştur
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "Kayıt başarıyla tamamlandı" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});

module.exports = router;