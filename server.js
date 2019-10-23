const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/posts',require('./routes/posts'));
app.use('/api/users',require('./routes/users'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))