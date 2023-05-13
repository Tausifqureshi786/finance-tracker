import express from 'express';
import { normalize } from 'path';
import {testAPIRouter} from './testAPI'
import { pdfParseRouter } from './pdfParse';
// Initialize the express engine
const app: express.Application = express();
 
// Take a port 3000 for running server.
var port = normalize(process.env.PORT || '9000');
 
app.set('port',port);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});
 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});

app.use("/testAPI", testAPIRouter);
app.use("/parsepdf", pdfParseRouter)
