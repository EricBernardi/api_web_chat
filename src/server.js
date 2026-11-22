const express = require('express');
const usersRoutes = require('./routes/users.route');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});