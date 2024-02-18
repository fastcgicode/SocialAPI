const express = require('express');
const routes = require('./routes/api');
const handlebars = require('express-handlebars');
const app = express();
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});