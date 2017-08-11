import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
app.use( bodyParser.json(), );

app.post('/data', (req: express.Request, res: express.Response) => {
    const body: Server.DataBody = req.body;
    const response: Server.DataResponse = { status: 'ok' };
    res.send(JSON.stringify(response));
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
