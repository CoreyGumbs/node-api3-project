function logger(req, res, next){
    const {method, originalUrl} = req;

    const logged = {
        "req_method": method,
        "req_url": originalUrl,
        "timestamp": Date.now()
    }
    console.log(logged);
    next();
}


module.exports = logger;