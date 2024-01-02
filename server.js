const express = require("express")
const dotenv = require('dotenv')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit");


const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const yaml = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const cors = require('cors')
const swaggerDocument = yaml.parse(file)
const routes = require('./Routes/MarketRoutes');

dotenv.config({ path: './config/.env' });

const { MY_PORT} = process.env;


dotenv.config()
var app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});

app.use(limiter);
app.use(helmet())
app.disable('x-powered-by')
  
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())

app.use('/market', routes);

app.listen(MY_PORT, () =>{
  console.log("Started application on port %d", MY_PORT);
});
