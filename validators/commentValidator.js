const commentSchema = {
    comment: {
        errorMessage: 'Please provide comment!',
        isString: true,
        notEmpty: true
    },
    id: {
        errorMessage: 'Bad Request!',
        isString: true,
        notEmpty: true
    }
}

module.exports = {
    commentSchema
}