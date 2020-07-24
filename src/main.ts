import errorHandler from "errorhandler";
import listEndpoints from "express-list-endpoints";

import app from "./app";

app.use(errorHandler());
app.listen(app.get("port"), () => {
    console.log(` App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log(" Available routes: ");
    console.log(listEndpoints(app));
    console.log(" Press CTRL-C to stop\n");

});
