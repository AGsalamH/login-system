const urlNotFound = (req, res, next) =>{
    const error = new Error(`URL you requested ${req.url} is not found on this server!`);
    error.statusCode = 404;
    throw error;
}

const globalErrorHandling = (err, req, res, next) =>{
    res
    .status(err.statusCode || 500)
    .json({
        ok: 0,
        error: err.message
    });
}

module.exports = {
    urlNotFound,
    globalErrorHandling
}