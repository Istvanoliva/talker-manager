const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const token = require('random-token');
const validator = require('email-validator');

const tokenValidator = require('./middlewares/tokenValidator');
const nameValidator = require('./middlewares/nameValidator');
const ageValidator = require('./middlewares/ageValidator');
const talkerValidator = require('./middlewares/talkerValidator');
const dateValidator = require('./middlewares/dateValidator');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERROR_STATUS = 404;
// const HTTP_NOT_AUT = 401;
const HTTP_CREATED_STATUS = 201;
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

// Requisito 03 e 04
// Referências : 
// Gerador de token :
// https://www.npmjs.com/package/random-token
// Validador de emails :
// https://www.npmjs.com/package/email-validator
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validEmail = validator.validate(email);
  const newToken = token(16);

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return res.status(200).json({ token: newToken });
});

// Requisito 05
app.post('/talker', tokenValidator, nameValidator,
ageValidator, talkerValidator, dateValidator, async (req, res) => {
  const { body } = req;
  const talkersList = JSON.parse(await fs.readFile('./talker.json'));
  const id = talkersList.length + 1;
  talkersList.push({ id, ...body });

  await fs.writeFile('./talker.json', JSON.stringify(talkersList));
  return res.status(HTTP_CREATED_STATUS).json({ id, ...body });
  });

// Requisito 06
app.put('/talker/:id', tokenValidator, nameValidator,
ageValidator, talkerValidator, dateValidator, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const idNumber = Number(id);
  const talkersList = JSON.parse(await fs.readFile('./talker.json'));
  const putTalker = talkersList.findIndex((tal) => tal.id === idNumber);
  talkersList[putTalker] = { ...talkersList[putTalker], name, age, talk };

  await fs.writeFile('./talker.json',
  JSON.stringify([...talkersList, { id: idNumber, name, age, talk }]));
  
  return res.status(200).json({ name, id: idNumber, age, talk });
});

app.listen(PORT, () => {
  console.log('Online');
});
