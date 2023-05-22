import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import express from 'express';
import { authRouter } from './authRouter';
import { normalize } from 'path';
import { pdfParseRouter } from './pdfParse';
import path from 'path';
import {testAPIRouter} from './testAPI'
import session from 'express-session'
import KnexStore from 'connect-session-knex'
import { db } from './db';
import userAuth from './middlewares/auth'


declare module 'express-session' {
    export interface SessionData {
        user: {
            username: string,
            hash: string
        }
    }
}

dotenv.config()
// Initialize the express engine
const app: express.Application = express();
const knexStore = KnexStore(session)
const sessionStore = new knexStore({knex: db})
const jsonParser = bodyParser.json()
// Take a port 3000 for running server.
const port = normalize(process.env.PORT || '9000');
const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../web-app/build");
 

const withCors = cors({
    origin: process.env.origin 
})

app.set('port',port);


app.use(express.static(buildPath))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(
    session({
        secret: process.env.SESSION_SECRET || "finance tracker app",
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    })
)
app.use(cookieParser());



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

// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express");
});
 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express listening at
        ${process.env.origin}`);
});

app.use("/auth", withCors, jsonParser , authRouter)
app.use("/testAPI",withCors, testAPIRouter);
app.use("/parsepdf", userAuth ,withCors, pdfParseRouter)

app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.redirect("/")
  })
