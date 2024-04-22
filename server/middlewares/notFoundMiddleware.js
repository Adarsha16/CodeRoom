const notFoundMiddleware = (err, req, res) => {

    res
        .status(404)
        .json({

            "Error": `Request Not Found, Please Try again! ${err}`

        })
}

export { notFoundMiddleware }