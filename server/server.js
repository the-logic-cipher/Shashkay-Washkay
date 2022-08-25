const app = require("./app");
const dotenv = require("dotenv");
const colors = require("colors")
const connectDatabase = require("./config/database");

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1)
  
})

//config
dotenv.config({ path: "server/config/config.env" });

//db
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT : ${process.env.PORT}`.green);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server due to unhandled promise rejection");
  
  server.close(() => {
    process.exit(1);
  });
});
