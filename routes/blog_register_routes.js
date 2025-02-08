const express = require("express");
const router = express.Router();
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

// 📌 Register Sayfası Route'u
router.get("/", csrfProtection, (req, res) => {
    res.render("register", { 
        csrfToken: req.csrfToken(),
        title: "Üye Ol"
    });
});

module.exports = router;
