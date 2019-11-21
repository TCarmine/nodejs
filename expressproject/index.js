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


function validateCourse(req,course){
  const schema = {
    name: Joi.string().min(3).required()
  }; 
  const result =  Joi.validate(req.body, schema);
  return result;

}

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
  if (!course) return res.status(404).send(`The course with the given ID:${id}  was not found`);
  res.send(course);
})  

app.get('/api/posts/:year/:month',(req,res)=>{
  res.send(req.params);
})  

app.get('/api/posts/',(req,res)=>{
  res.send(req.query);
})  

app.get('api/courses/',(req,res)=>{
  
  const sortBy = req.query.sortBy;
  res.send(courses);  
})

app.get('/api/posts/:id',(req,res)=>{
  res.send(req.query);
})  

// POST request

app.post('/api/courses/', (req,res) => {
  // Basic validation, implemented with joi
  // Handling 400 Bad request
  // object returned after validation
  const { error } = validateCourse(req.body);
  //if 400 showing error details message
  if(error) return res.status(400).send(result.error.details[0].message);
  const course = {
     id: courses.length + 1,
     name: req.body.name
  };
  courses.push(course);
  res.send(course);

});

// Update a course with PUT method

// Look up the course
// If course does not exist return 404
// Validate the course and if is not in a good shape return 400
// Update the course and return to client

app.put('/api/courses/:id',(req,res)=>{
  // check if a course with id exist
  const id = req.params.id;
  const course = courses.find( c => c.id === parseInt(id));
  if (!course) return  res.status(404).send(`The course with the given ID:${id}  was not found`);
  // Validation 
  // if invalid return 400 - Bad request

  const result = validateCourse(req.body);
  // object destructuring
  const { error } = validateCourse(course); // result.error
  
  //if 400 showing error details message
  if(error) return  res.status(400).send(result.error.details[0].message);
     // Update the correct course 
  course.name = req.body.name;
  
  res.send(course);
})  


app.delete('/api/courses/:id',(req, res)=>{
  // Look up the course
  // if does not exist rise 404
  // or 400 for Bad request
  const id = req.params.id;
  const course = courses.find( c => c.id === parseInt(id));
  if (!course) return  res.status(404).send(`The course with the given ID:${id}  was not found`);

  const index= courses.indexOf(course);
  courses.splice(index,1);
  res.send(course);

})
// providing a way to use the available port
const port = process.env.PORT  || 3000;

app.listen(port, () => console.log(`Listen on port ${port}...`));

