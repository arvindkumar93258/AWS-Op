import express from 'express';
import routes from './Routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);



app.get('/test', (req, res) => {
    return res.status(200).send("Hello user").end();
})

app.listen(8000, () => {
    console.log("Server is running on port 8000!!!");
})
