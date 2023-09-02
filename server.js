const app = require('express')();
const session = require('express-session');

app.listen(process.env.PORT, () =>{
    console.log('Listening!');
});