const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const filePath = "./users.json";

// SIGNUP
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    let users = JSON.parse(fs.readFileSync(filePath));

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.json({ success: false, message: "User already exists!" });
    }

    users.push({ name, email, password });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({ success: true, message: "Signup successful!" });
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    let users = JSON.parse(fs.readFileSync(filePath));
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});