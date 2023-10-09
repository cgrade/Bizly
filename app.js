import { express } from 'express';
import { mongoose } from 'mongoose';
import { cors } from 'cors';
import bodyParser, { BodyParser } from 'body-parser';


// Initialize the Express app.
const app = express();


// Connect to MongoDB Database using Mongoose
mongoose.connect('mongodb://localhost/bizly_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


// MiddleWares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));


// Server Listening onto PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
