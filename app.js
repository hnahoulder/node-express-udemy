const express = require('express');
const app = express();

const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Hello <b>world!</b>');
});

app.listen(3000, () => {
    console.log(`Listening on port ${PORT}`);
});