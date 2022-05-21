const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const token = require('random-token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01
app.get('/talker', async (_req, res) => {
  const readFile = await fs.readFile('./talker.json');
  const talkers = JSON.parse(readFile);  

    if (!talkers) return res.status(HTTP_OK_STATUS).json([]);
    return res.status(HTTP_OK_STATUS).json(talkers);
  });

// Requisito 02
app.get('/talker/:id', async (req, res) => {
  const readFile = await fs.readFile('./talker.json');
  const talkers = JSON.parse(readFile);
  const talkerId = talkers.find((talker) => talker.id === Number(req.params.id));

  if (!talkerId) {
    return res.status(HTTP_ERROR_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

// Requisito 03
// Referência : https://www.npmjs.com/package/random-token
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const newToken = token(16);
  if (!email || !password) {
    return res.status(404).json({ message: 'Usuário ou Senha inválidos' });
  }
  return res.status(200).json({ token: newToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
