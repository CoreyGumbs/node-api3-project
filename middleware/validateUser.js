function validateUser(req, res, next){
    const {body} = req;

    if(Object.entries(body).length === 0){
        res.status(400).json({message: "missing user data"})
    }else if(body.name === '' || body.name === null){
        res.status(400).json({message: "missing required name field"});
    }

    next();
}

module.exports = validateUser;