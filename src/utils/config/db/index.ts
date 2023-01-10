import sqlize from "./sqlize"


sqlize
  .authenticate()
  .then(() => console.log("💡 DB CONNECTED!"))
  .catch((e:Error) => console.log("❌ CONNECTION FAILED! Error: ", e));

export default sqlize
