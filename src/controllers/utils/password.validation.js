const validatePassword = (password) => {
    return String.toString(password).trim().length >= 8
}

const PasswordValidate = {
    validatePassword
}

export default PasswordValidate