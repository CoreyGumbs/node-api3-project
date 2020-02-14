const express = require('express');
const user_db = require('./userDb.js');
const validateUser = require('../middleware/validateUser.js');
const validateUserId = require('../middleware/validateUserId');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
   user_db.insert(req.body)
   .then(user => {
     res.status(200).json(user);
   })
   .catch(error => {
     res.status(500).json({error: "User not created."});
   })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  user_db.get()
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).json({error: "There was trouble retrieving Users"});
  })
});

router.get('/:id', validateUserId, (req, res) => {
  const {id} = req.params;

  user_db.getById(id)
  .then(user => {

    res.status(200).json(user);

  })
  .catch(error => {

    res.status(500).json({error: 'User ID does not exist'});

  });
});

router.get('/:id/posts', (req, res) => {
  const {id} = req.params;

  user_db.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    res.status(500).json({error: 'There was an issue retrieveing user posts'});
  })

});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }


// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
