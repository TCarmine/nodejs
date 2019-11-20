// import _ from 'lodash';


const express = require('express'); 
// const process = require('process');

const app = express();

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
    res.send([1,2,3]);
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

// providing a way to use the available port
const port = process.env.PORT  || 3000;

app.listen(port, () => console.log(`Listen on port ${port}...`));