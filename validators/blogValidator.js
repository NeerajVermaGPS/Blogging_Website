const addBlogSchema = {
    title: {
        errorMessage: 'Please provide title!',
        isString: true,
        notEmpty: true
    },
    body: {
        isLength: {
            options: {
                max: 3000,
                min: 200
            },
            errorMessage: 'Blog should be of 200-3000 characters!',
        },
        notEmpty: true
    },
    coverImage: {
        optional: {checkFalsy: true}
    }
}

module.exports = {
    addBlogSchema
}