const passwordValidator = require('password-validator');

function validatePassword(password) {
    const passwordSchema = new passwordValidator();
    
        passwordSchema
            .is().min(8)
            .is().max(50)
            .has().uppercase()
            .has().lowercase()
            .has().digits()
            .has().not().spaces()
            .has().symbols();
        
        const validatePass = passwordSchema.validate(password, { list: true });

        if (password.length < 8) {
            errors.push("Le mot de passe doit avoir au moins 8 caractères.");
        }

        return validatePass;
    };

    module.exports = validatePassword;