import express, { Router, Request, Response} from "express";
import cors from "cors";
import fs from 'fs';

import apiRouter from "./routes";
import { port, uri } from "./controller/config";
import { connect } from "./controller/database/connection";

connect(uri);
const app = express();

app.use(express.json({limit:'50mb'})); 
app.use(express.urlencoded({limit:'50mb', extended: true }));
app.use(express.static("dist"));
app.use(cors());


app.use("/api", apiRouter);

app.get("/status", (req: Request, res: Response) =>{
    res.json("Server is upp and running!")
});

app.use(async (req, res, next) => {
    res.set("Content-Type", "text/html; charset=UTF-8")
    fs.readFile(__dirname.replace("dist-server", "") + "dist\\index.html", (err, data) =>{
        if (err) {
            res.status(500).send("Something went wrong while reading file");
            return;
        }
        
        res.send(data);
    });
})

app.listen(port, () => {
    console.log(`Server started successfully.\nListening on http://localhost:${port}`);
});
