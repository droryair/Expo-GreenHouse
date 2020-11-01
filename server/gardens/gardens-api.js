const { Sequelize } = require("sequelize/types")

const   express = require("express"),
        axios   = require("axios"),
        router  = express.Router(),
        url     = "https://api.plant.id/v2/identify"
        
        router.get('/gardens',function(req,res){
            const userId = req.query.userId
            try {
                const result = sequelize.query(
                    `SELECT *
                    FROM users
                    WHERE user_id = '${userId}'`)
                console.log(result[0])
                res.send(result[0])
            } catch (err) {
                err
            }

    })
    

module.exports = router