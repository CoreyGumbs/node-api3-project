const user_db = require('../users/userDb');

function validateUserId(req, res, next){
    user_db.getById(req.params.id)
    .then(user => {
       
        if(req.params.id != user.id){
            res.status(400).json({message: "invalid user id"});
        }else{
            req.user = user;
            next();
        }   
    })
    .catch(error => {
        res.status(500).json({error: "There was trouble retrieving user."})
    });

}

module.exports = validateUserId;