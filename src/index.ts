import express from "express";
import config from "./config";
import routes from "./routes/index";

const app = express();
app.use(express.json());
app.use(routes);


app.listen(config.port, ()=>{
    console.log('server started listening on 8000');
});
