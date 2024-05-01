import express, { Router, Request, Response} from "express";
import cors from "cors";

import apiRouter from "./routes";
import { port, uri } from "./controller/config";
import { connect } from "./controller/database/connection";

connect(uri);
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("dist"));
app.use(cors());

app.use("/api", apiRouter);

app.get("/status", (req: Request, res: Response) =>{
    res.json("Server is upp and running!")
});

app.listen(port, () => {
    console.log(`Server started successfully.\nListening on http://localhost:${port}`);
});
