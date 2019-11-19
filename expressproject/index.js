const express = require('express'); 

const app = express();


app.get('/',(req,res)=>{
  res.send('Hey There!');
});

app.get('/api/arraylits',(req,res)=>{
    res.send([1,2,3]);
  });
  


app.listen(3000,()=>{
    console.log('Listen on port 3000...')
})