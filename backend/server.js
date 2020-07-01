const  express  =  require("express");
const  app  = express();
const  cors =  require("cors")
const  bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/uploaded"))
app.use(cors())



app.use("/api/v2", require("./api"))


app.listen(8081, ()=>{
   console.log("server is runnning..")
})