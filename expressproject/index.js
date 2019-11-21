// Validation package class
const Joi = require('joi');

// import _ from 'lodash';

const express = require('express'); 
// const process = require('process');

const app = express();

// this enable to parse JSON from the client via the json middleware
app.use(express.json());

// my courses array Object
const courses = [
  { id: 1, name: 'Math'},
  { id: 2, name:'History'},
  { id: 3, name:'Physic'},
  { id: 4, name:'Algebra'}
];

// get examples for Express
app.get('/',(req,res)=>{
  res.send('Hey There!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
  });

app.get('/api/courses/:id',(req,res)=>{
  const id = req.params.id;
  const course = courses.find( c => c.id === parseInt(id));
  if (!course)  res.status(404).send(`The course with the given ID:${id}  was not found`);
  res.send(course);
})  

app.get('/api/posts/:year/:month',(req,res)=>{
  res.send(req.params);
})  

app.get('/api/posts/',(req,res)=>{
  res.send(req.query);
})  


app.get('/api/posts/:id',(req,res)=>{
  res.send(req.query);
})  

// POST request

app.post('/api/courses/', (req,res) => {
  
  // Basic validation, implemented with joi
  
    // Handling 400 Bad request
  const schema = {
    name: Joi.string().min(3).required()
  };
  // object returned after validation

  const result =  Joi.validate(req.body, schema);
    
  if(result.error){
    //if 400 showing error details message
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
     id: courses.length + 1,
     name: req.body.name
  };
  courses.push(course);
  res.send(course);

});


// providing a way to use the available port
const port = process.env.PORT  || 3000;

app.listen(port, () => console.log(`Listen on port ${port}...`));

