// import _ from 'lodash';


const express = require('express'); 
// const process = require('process');

const app = express();
 
process.

console.log(app.toString);



app.get('/',(req,res)=>{
  res.send('Hey There!');
});

app.get('/api/arraylits',(req,res)=>{
    res.send([1,2,3]);
  });
  
process.

app.listen(3000,()=>{
    console.log('Listen on port 3000...')
})