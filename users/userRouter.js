const express = require('express');
const user_db = require('./userDb.js');
const post_db = require('../posts/postDb');
const validateUser = require('../middleware/validateUser.js');
const validateUserId = require('../middleware/validateUserId');
const validatePost = require('../middleware/validatePost');

const router = express.Router();

//creates user
router.post('/', validateUser, (req, res) => {
   user_db.insert(req.body)
   .then(user => {
     res.status(200).json(user);
   })
   .catch(error => {
     res.status(500).json({error: "User not created."});
   })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
   const body = {
     "text": req.body.text,
     "user_id": req.user.id
   }

   post_db.insert(body)
   .then(post => {
     res.status(200).json(post);
   })
   .catch(error => {
     res.status(500).json({error: "There was a problem. Post not added."})
   })



});

//gets all users
router.get('/', (req, res) => {
  user_db.get()
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({error: "There was trouble retrieving users."});
  })
});

//gets user by id
router.get('/:id', validateUserId, (req, res) => {
  const {id} = req.user;
 
  user_db.getById(id)
  .then(user => {

    res.status(200).json(user);
  })
  .catch(error => {

    res.status(500).json({error: 'User ID does not exist'});

  });
});

//gets user posts by id
router.get('/:id/posts', validateUserId, (req, res) => {
  const {id} = req.user;

  user_db.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts);
    console.log(req.user);
  })
  .catch(error => {
    res.status(500).json({error: 'There was an issue retrieveing user posts'});
  })

});

//deletes user by id
router.delete('/:id', validateUserId, (req, res) => {
  const {id} = req.user;

  user_db.remove(id)
  .then(user => {
    res.status(200).json({message: "user deleted."});
  }) 
  .catch(error => {
    res.status(500).json({error: "There was a problem. User not deleted."});
  })
});

//updates user by id
router.put('/:id', validateUser, validateUserId, (req, res) => {
  const { id } = req.user;
  const { body } = req;
  
  user_db.update(id, body )
  .then(user => {
    res.status(200);
  })
  .catch(error => {
    res.status(500).json({error: "There was a problem with updating."});
  })
});

//custom middleware

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
