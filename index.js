// code away!
const express = require('express');
const userRouter = require('./users/userRouter.js');

//Server
const server = express();
const port = 5000;

 //custom middleware
 server.use(express.json());

 //routers
 server.use('/api/users/', userRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });




server.listen(port, () => console.log(`Server Running On Port: ${port}`));