import express from 'express';
import { normalize } from 'path';
import {testAPIRouter} from './testAPI'
import { pdfParseRouter } from './pdfParse';
import cors from 'cors'
import path from 'path';

// Initialize the express engine
const app: express.Application = express();

const withCors = cors({
    origin: "http://18.224.179.219/" 
})

// Take a port 3000 for running server.
var port = normalize(process.env.PORT || '9000');
 
app.set('port',port);

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../web-app/build");

app.use(express.static(buildPath))

app.get("/", function(req, res){

    res.sendFile(
        path.join(__dirname, "../web-app/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          } 
        }
    );

})


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

app.use("/testAPI",withCors, testAPIRouter);
app.use("/parsepdf",withCors, pdfParseRouter)

