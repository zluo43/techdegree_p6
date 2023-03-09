const express = require('express');
const app = express();
const {projects} = require('./data.json');




app.use(express.json());

//set up middleware
//set “view engine” to “pug”
app.set('view engine', 'pug');

//use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));



//set up the routes
app.get('/', (req, res, next) => {
  res.render('index', {projects});
});


app.get('/about', (req, res, next) => {
  res.render('about');
});


app.get('/projects/:id', (req, res, next) => {
  const {id}=req.params;
  const project = projects[id];
  if (project){
    res.render('project', {project})
  }else{
    next()
  }  
});


// Error handling
app.use((req, res, next) => {
  const err = new Error ('This page does not exist');
  console.log(err.message);
  err.status = 404;
  next(err);
});

//An err.status and an err.message property 
//if they don't already exist, and then log out the err object's message and status.
app.use((err, req, res, next) =>{
  if(err.status===404){
    err.message = 'Sorry, content not found';
    console.log(err.message);
    res.locals.err = err;
    res.status(err.status);
    res.render('error',{ err });
  } else {
    err.message = 'Server Error';
    res.status(err.status || 500 ); 
    res.render('error',{ err });
  }

  console.log(err.status, err.message);
})

//try debug server error 
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   console.error(err);
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: err
//   });
// });

//start your server. 
app.listen(3000, function (){
  console.log('The application is listening to port 3000')
 })


