import {config} from "dotenv"
import app from "./server"
import db from "./utils/config/db/index"
import endpoints from "express-list-endpoints"
const {PORT} = process.env
config()

db.sync({ force: true }).then((result:any) => {
    app.listen(PORT || 3001, () => {
      console.log(
        "❗ Server is running on",
        PORT,
        " with these endpoints: ",
        endpoints(app)
      );
    });
  });