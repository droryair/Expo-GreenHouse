const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const sequelize = require('../../db/sequelize')
const { jwtSecret } = require('../../config')





router.post("/register", async (req, res) => {
    try {
        let { id, full_name, email, password, city_name, rank_id, xp, created_at } = req.body;

        // validate

        if (!email || !password || !full_name || !city_name)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "The password needs to be at least 5 characters long." });

        await sequelize.query(`SELECT * FROM users WHERE email = "${email}"`)
            .then(async function ([results, metadata]) {
                if (results.length) {
                    res
                        .status(400)
                        .json({ msg: "An account with this email already exists." })
                } else {

                    const salt = await bcrypt.genSalt(1);
                    const passwordHash = await bcrypt.hash(password, salt);

                    await sequelize.query(`INSERT INTO users VALUES(NULL,"${full_name}","${email}","${passwordHash}","${city_name}",1,0,now())`)
                        .then(([result, metadata]) => {
                            res.json({
                                id: result,
                                firstName: full_name.split(' ')[0],
                                lastName: full_name.split(' ')[1],
                                email: email,
                                city: city_name,
                                rankID: rank_id,
                                xp: xp,
                            });
                        })
                        .catch(e => console.log(e))
                }
            })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        await sequelize.query(`SELECT * FROM users WHERE email = "${email}"`)
            .then(async function ([results, metadata]) {
                if (!results.length) {
                    return res
                        .status(400)
                        .json({ msg: "No account with this email has been registered." });
                } else {
                    console.log(results[0].password);
                    console.log(password);
                    const isMatch = await bcrypt.compare(password, results[0].password)
                    console.log(isMatch)
                    if (!isMatch) return res.status(400).json({ msg: "Wrong Password." });


                    console.log("uj");
                    console.log(jwtSecret)
                    console.log("bj");
                    const token = jwt.sign({ id: results[0].id }, jwtSecret);
                    console.log("ut");
                    console.log(token)
                    console.log("ur");
                    console.log(results[0]);
                    console.log("br");
                    res.json({
                        token,
                        user: {
                            id: results[0].id,
                            full_name: results[0].full_name,
                            email: results[0].email,
                            city_name: results[0].city_name
                        },
                    });
                }
            })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        await sequelize
            .query(`SELECT * FROM users WHERE id = "${req.user}"`)
            .then(async function ([results, metadata]) {
                res.json({
                    id: results[0].id,
                    full_name: results[0].full_name,
                    email: results[0].email,
                    city_name: results[0].city_name
                })
            })
            .then(await sequelize.query(`DELETE FROM users WHERE id = "${req.user}"`))
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token || token == null) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        await sequelize.query(`SELECT * FROM users WHERE id = "${verified.id}"`)
            .then(function ([results, metadata]) {
                if (!results.length) return res.json(false)
            })
        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    await sequelize.query(`SELECT * FROM users WHERE id = "${req.user}"`)
    res.json({
        id: result[0].id,
        firstName: result[0].full_name.split(' ')[0],
        lastName: result[0].full_name.split(' ')[1],
        email: result[0].email,
        city: result[0].city_name,
        rankID: result[0].rank_id,
        xp: result[0].xp,
        createdAt: result[0].created_at
    });
});

module.exports = router;
