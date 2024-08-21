const userSignupValidator = {
    name: {
        errorMessage: 'Please provide name!',
        isString: true,
        notEmpty: true
    },
    email: {
        errorMessage: 'Please provide a valid email!',
        isEmail: true,
        notEmpty: true
    },
    password: {
        isString: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
    profileImage: {
        optional: {checkFalsy: true}
    }
}

const userLoginValidator = {
    email: {
        errorMessage: 'Please provide a valid email!',
        isEmail: true,
        notEmpty: true
    },
    password: {
        isString: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    }
}

module.exports ={ 
    userLoginValidator,
    userSignupValidator
}