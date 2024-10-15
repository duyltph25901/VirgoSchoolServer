const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

const EmailValidate = {
    validateEmail
}

export default EmailValidate