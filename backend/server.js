const express = require('express');
const cors = require('cors');
require('./config/connect');
const userRoute = require('./routes/user');
const contactRoute = require('./routes/contact');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/user', userRoute);
app.use('/contact', contactRoute);


app.use('/image', express.static('./uploads'));


app.listen(3000, ()=>{
    console.log('server work');
})