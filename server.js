const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

//Connected to database
connectDB();

//Added cors
app.use(cors());

//Enabled json request
app.use(express.json({ extended: false }));

//Routes
app.use('/api/posts',require('./routes/posts'));
app.use('/api/users',require('./routes/users'));

//Production heroku avaliable
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

//PORT
const PORT = process.env.PORT || 5000;

//listening to the port
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))