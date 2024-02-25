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
const MarketController = require('./Controller/MarketController');
const ReportController = require('./Controller/ReportController');

dotenv.config({ path: './config/.env' });

const { MY_PORT, NODE_ENV,API_KEY} = process.env;

var app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10000, 
});
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== API_KEY) {
      return res.status(401).json({ message: 'Invalid API key' });
  }
  next();
}

app.use(limiter);
app.use(helmet())
app.disable('x-powered-by')

app.use(cors())
if(NODE_ENV === 'development'){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

app.use(express.json())

app.use('/market', authenticateApiKey,MarketController);
app.use('/report', authenticateApiKey,ReportController);

app.listen(MY_PORT, () =>{
  console.log("Started application on port %d", MY_PORT);
});
