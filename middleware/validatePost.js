function validatePost(req, res, next){
    const { body } = req;

    if(Object.entries(body).length === 0){
        res.status(400).json({message: "missing post data"});     
    }else if(body.text === '' || body.text === null){
        res.status(400).json({message: "missing required text field"});
    }
    next();
}

module.exports = validatePost;