const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const PORT = 5000;

app.use(cors())
app.use(routes);

app.listen(PORT);


console.log('listening port:' + PORT);