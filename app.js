require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
if(process.env.NODE_ENV === "development"){
	app.use(morgan('dev'));
}


app.use('/api',require('./routes/podcastRoute'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
	console.log(`App listening to port ${PORT}`)
});