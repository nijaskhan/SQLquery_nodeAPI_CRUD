const router = require('express').Router();
const client = require('./dbConfig');

router.get('/users', (req, res) => {
    try{
        client.query('SELECT * FROM users', (err, response) => {
            if(!err){
                // console.log(response.rows);
                res.status(200).json({
                    success: true,
                    data: response.rows
                });
            }else{
                res.status(404).json({
                    success: false,
                    message: err.message
                });
            }
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;