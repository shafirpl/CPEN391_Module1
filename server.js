const express = require('express');
const connectDB = require('./config/db');

const itemRoute = require("./routes/item");

const app = express();

connectDB();


app.use(express.json({ extended: false }));
app.get("/", (req, res) => { res.send('API Running') });

app.use('/item',itemRoute);

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
