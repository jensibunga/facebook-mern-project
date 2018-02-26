var express = require('express');
var bodyParser = require('body-parser');
//mongoose/model
var mongoose = require('mongoose');
var Post = require('./models/Post');
var User = require('./models/User')
var Comment = require('./models/Comment');
//Session
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//validation
var cors = require('cors');
var { check, validationResult } = require('express-validator/check');
var app = express();

app.use('/static', express.static(__dirname + '/client/build/static'));

//6tryegd847uyehj
//12qewds09oiukj67tyfhgv

mongoose.connect('mongodb://6tryegd847uyehj:12qewds09oiukj67tyfhgv@ds125288.mlab.com:25288/facebook-mern-project')
//('mongodb://localhost:27017/facebook_mern');//should be above the app use

//app.use(cors());
app.use(cors({ //tis adds session to req, like so: req.session
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD','POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
  credentials: true//allow setting of cookies
}));

app.use(session({
  resave: true,
  secret: 'qwertyuiop1234567890',
  saveUninitialized: true,
  cookie: { maxAge: (60000 * 60) },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(bodyParser.json());//add body to req => req.body

// app.use('/cookietest', function(req, res){
//   req.session.taste ='chocolate';
//   res.send('hmm cookies, nom nom nom');
// })



//REGISTER Validation/created user

app.post('/api/register', [
  check('username').not().isEmpty().withMessage('Username is required')
    .not().isEmpty().withMessage('Username is required'),

  check('email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email  should be an email address')
    .not().isEmpty().withMessage('Email is required'),


  check('firstname')
    .not().isEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('Firstname should be at least 2 letters')
    .matches(/^([A-z]|\s)+$/).withMessage('Firstname cannot have numbers'),
  //check('lastname').isLength({ min: 2 }).withMessage('Last name should be at least 4 letters'),
  check('lastname')
    .not().isEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Lastname should be at least 2 letters')
    .matches(/^([A-z]|\s)+$/).withMessage('Lastname cannot have numbers'),

  check('password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters'),

  check("passwordConfirmation", "Password confirmation  is required or should be the same as password")
    .custom(function (value, { req }) {
      if (value !== req.body.password) {
        throw new Error("Password don't match");
      }
      return value;
    }),
  check('email').custom(value => {
    return User.findOne({ email: value })
      .then(function (user) {
        if (user) {
          throw new Error('this email is already in use');
        }
      })
    //return value;
  }),


], function (req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }
  //console.log(req.body);
  User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    //birthdate: req.body.birthdate,
  })
    .then(function (user) {
      // console.log(user);
      return res.send({ status: 'success', message: 'User created in database' });

    })
    .catch(function (error) {
      return res.send({ status: 'error', message: 'Something went wrong' });
    });

});

//LogIn 
app.post('/api/login', function (req, res) {
  console.log(req.body);
  User.findOne({
    email: req.body.email,
    password: req.body.password
  })

    .then(function (user) {
      if (!user) {
        let errors_value = {
          login: { msg: 'Wrong email or password' }
        }
        return res.send({ errors: errors_value })
      } else {
        //the user was found with the username and password
        // so we can sign in the user by using the session/cookie
        //req.session is an object, we can add properties to it freely
        req.session.user = user;
        //req.session.save();
        return res.send({ message: 'You are signed in' });
      }
      console.log(user);

      res.send(user);
    })
    .catch(function (error) {
      console.log(error);

    })
})

///SESSION


app.get('/api/current_user', function (req, res) {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then(function (user) {
        res.send({ //this object is going to response.data in axios
          _id: user._id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          //birthdate: req.session.user.birthdate,
        })
      })
  } else {
    res.send({ error: 'not logged in' })
  }
});







//POST A MESSAGE

app.post('/api/post', function (req, res) {
  Post.create({
    text: req.body.postMessage,
    user: req.body.userId
  })
    .then(function (post) {
      res.send(post);
    })
    .catch(function (error) {
      res.send({ status: 'error', message: 'Could not create post in database' });
    });
});


//getting post messages

app.get('/api/posts', function (req, res) {
  Post.find({})
    .populate('user') //this includes the user with the specific userId
    .sort({ createdAt: 'desc' })
    .then(function (posts) {
      res.send(posts);
    })
    .catch(function (error) {
      res.send({ status: 'error', message: 'Cannot find posts' });
    })

});

//Getting one post  message in the DB

app.post('/api/post/:id/update', function (req, res) {
  Post.findById(req.params.id)
    .then(function (post) {
      post.text = req.body.text
      post.save()
        .then(function (post) {
          res.send(post);
        });
    });
});


//One Comment Posted
app.post('/api/comment', function (req, res) {
  Comment.create({
    text: req.body.text,
    post: req.body.postId,
    user: req.body.userId,
  })
    .then(function (comment) {
      comment.populate('user', function (error, comment) {
        res.send(comment)
      })
    })
    .catch(function (error) {
      res.send({ status: 'error', message: 'problem in the database' });
    });
});



//List of Comments
app.get('/api/post/:id/comments', function (req, res) {
  Comment.find({ post: req.params.id })
    .populate('user') //user field in the mongodb
    .sort({ createdAt: 'desc' })
    .then(function (comments) {
      res.send(comments);
    })
    .catch(function (error) {
      res.send({ status: 'error', message: 'Problem in the database' });
    });
});



///Delete POST
app.delete('/api/post/:id', function (req, res) {
  Post.findById(req.params.id)
    .then(function (post) {
      post.remove()
        .then(function () {
          res.send({ status: 'success', message: 'removed post' })
        });
    });
});

///LIKE button
app.put('/api/post/:id/like', function (req, res) {
  Post.findById(req.params.id)
    .then(function (post) {
      post.likes = post.likes + 1
      post.save();
      res.send({ likes: post.likes })
    })
})

//Post message
app.post('/api/post/:id/share', function (req, res) {
  Post.findById(req.params.id) // find the post that is shared
    .then(function (post) {//
      Post.create({//this create the new post
        text: post.text,//take the old text from the shared post
        user: req.session.user._id
      })
        .then(function (post) {
          res.send({ message: 'Shared a post' })
        })
        .catch(function (error) {
          console.log({ error: 'Cannot share post' })
        })
    });
});
///Log Out
app.get('/api/logout', function (req, res) {
  req.session.destroy();
  res.send({ message: 'session destroyed' })
});


////Edit Profile

app.post('/api/profile/edit', [
  check('username').not().isEmpty().withMessage('Username is required'),

  check('email').isEmail().withMessage('Email should be an email address'),
  check('firstname').isLength({ min: 2 }).withMessage('Firstname should be at least 2 letters'),
  check('firstname').matches(/^([A-z] |\s)+ |$/),
  check('lastname').isLength({ min: 2 }).withMessage('Last name should be at least 4 letters'),

], function (req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.send({ errors: errors.mapped() });
  }

  User.findById(req.session.user._id)//this finds the user in the database for current session
    .then(function (user) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.save();
      res.send({ message: 'save in database' });

    })
})

//Deleting User

app.delete('/api/profile/delete', function (req, res) {
  User.findByIdAndRemove(req.session.user._id)
  req.session.destroy();
  res.send({ message: 'Deleted profile' });
})

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

app.listen(process.env.PORT || 8080);