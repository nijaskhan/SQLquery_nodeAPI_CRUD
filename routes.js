const router = require('express').Router();
const client = require('./dbConfig');

/* 
    Pros of writing raw SQLqueries,
        * Full Control over the queries we execute.
        * writing raw SQL can lead to more efficient queries because you can tailor them to your database schema and indexing.
        * For complex queries writing raw SQL can be more concise and easier to understand.
        * Sometimes, you may need to use database-specific features or extensions that are not supported by ORMs. Writing raw SQL allows you to utilize these features directly.
    Cons of writing raw SQLqueries,
        * Writing raw SQL queries without proper input validation can lead to SQL injection vulnerabilities.
        * Boilerplate Code

    // SEQUELIZE IS A ONE OF THE ORMs that WE CAN USE.
*/

router.get('/users', (req, res) => {
    try {
        client.query('SELECT * FROM users', (err, data) => {
            if (!err) {
                // console.log(data.rows);
                res.status(200).json({
                    success: true,
                    data: data.rows
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/user/:id', (req, res) => {
    try {
        client.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, data) => {
            if (!err) {
                if (data.rows.length > 0) {
                    res.status(200).json({
                        success: true,
                        data: data.rows
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'No such user'
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/add-user', (req, res) => {
    try {
        const user = req.body;
        const insertQuery = `INSERT INTO users (name, age, salary, department)
        VALUES ('${user.name}', ${user.age}, ${user.salary}, 
        (SELECT id FROM departments WHERE name='${user.department}'))`;

        client.query(insertQuery, (err, data) => {
            if (!err) {
                res.status(200).json({
                    success: true,
                    message: `user added successfully`
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.put('/user/:id', (req, res) => {
    try {
        const user = req.body;
        const updateQuery = `UPDATE users 
        SET name='${user.name}',
        age=${user.age}, 
        salary=${user.salary},
        department=(SELECT id FROM departments WHERE name='${user.department}')
        WHERE id=${req.params.id}`;

        client.query(updateQuery, (err, data) => {
            // console.log(data);
            if (!err) {
                res.status(200).json({
                    success: true,
                    message: 'user updated successfully'
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.delete('/user/:id', (req, res) => {
    try {
        client.query(`DELETE FROM users WHERE id=${req.params.id}`, (err, data) => {
            if (!err) {
                // console.log(data)
                res.status(200).json({
                    success: true,
                    message: 'user deleted successfully'
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.get('/departments', (req, res) => {
    try {
        client.query('SELECT * FROM departments', (err, data) => {
            if (!err) {
                res.status(200).json({
                    success: true,
                    data: data.rows
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});


module.exports = router;