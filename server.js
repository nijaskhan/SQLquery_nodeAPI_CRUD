const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT, ()=>{
    console.log(`server listening on port ${process.env.PORT}`);
});