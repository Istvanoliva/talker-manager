const regexDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

const dateValidator = (req, res, next) => {
    const { talk } = req.body;
      const validDate = regexDate.test(talk.watchedAt);
      if (!validDate) {
        return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }
    next();
};

module.exports = dateValidator;

// Referência regex 
// https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy