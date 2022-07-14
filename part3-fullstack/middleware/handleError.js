const ERROR_HANDLERS = {
    CastError: res => res.status(400).json({
        error: 'id used is malformed'
    }),
    ValidationError: (res,error) => res.status(409).json({error: error.message}),
    JsonWebTokenError:(res,error) => {
        res.status(401).json({error: 'token missin or invalid'})
    },
    defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
    console.error(error)
    const handler = ERROR_HANDLER[error.name] || ERROR_HANDLERS.defaultError
    handler(response, error)
}