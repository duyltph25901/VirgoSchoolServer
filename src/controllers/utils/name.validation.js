const validateUserName = (userName) => {
    return String.toString(userName).trim().length >= 2
}

const UserNameValidate = {
    validateUserName
}

export default UserNameValidate