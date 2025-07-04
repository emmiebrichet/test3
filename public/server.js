const { app } = require('../app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Serveur en marche sur le port ${PORT} !`);
});
