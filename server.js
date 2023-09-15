const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const client = require('./dbConfig');
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.listen(process.env.PORT, ()=>{
    console.log(`server listening on port ${process.env.PORT}`);
});

client.connect(()=>{
    console.log('database connection established');
});