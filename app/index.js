const express = require("express");
const bodyParser =  require('body-parser');
const Blockchain =  require('../blockchain/index');
const P2pServer = require('./p2p-server');

const app =  express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.use(bodyParser.json());


const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.get('/blocks',(request, response)=>{
    response.json(bc.chain);
})
app.post('/mine',(request, response)=>{
    const block = bc.addBlock(request.body.data);
    console.log(`New Block added ${block.toString()}`);
    response.redirect('/blocks');
})
app.listen(HTTP_PORT,()=>{
    console.log("SERVER IS RUNNING ON PORT ", HTTP_PORT);
})
p2pServer.listen();