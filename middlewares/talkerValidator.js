// const validateDate = require('validate-date');
const talkerValidator = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (Object.keys(talk).length !== 2) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

module.exports = talkerValidator;