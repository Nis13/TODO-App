import express from "express";
import config from "./config";
import routes from "./routes/index";
import { genericErrorHandler} from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

const app = express();
app.use(express.json());

app.use(requestLogger);

app.use(routes);

app.use(genericErrorHandler);

app.listen(config.port, ()=>{
    console.log('server started listening on 8000');
});

