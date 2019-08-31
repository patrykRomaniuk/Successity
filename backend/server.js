const express = require('express');
const app = express();

app.use(express.json({ extended: false }));

app.use('/api/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))