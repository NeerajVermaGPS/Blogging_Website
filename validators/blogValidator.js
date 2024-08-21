const addBlogSchema = {
    title: {
        errorMessage: 'Please provide title!',
        isString: true,
        notEmpty: true
    },
    body: {
        isLength: {
            options: {
                max: 1000,
                min: 200
            },
            errorMessage: 'Blog should be of 200-1000 characters!',
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