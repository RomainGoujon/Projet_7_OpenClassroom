const passwordValidator = require("password-validator");

function validatePassword(password) {
  const passwordSchema = new passwordValidator();

  passwordSchema
    .is().min(8)
    .is().max(50)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

    return passwordSchema.validate(password);
}

module.exports = validatePassword;