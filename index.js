const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages');
const users = require('./db/users');
const formidable = require("formidable");

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/client/dist/index.html');
});

app.get('/css*', (req, res) => {
    res.sendFile(`${__dirname}/client/dist/${req.originalUrl}`);
});

app.get('/img*', (req, res) => {
    res.sendFile(`${__dirname}/client/dist/${req.originalUrl}`);
});

app.get('/js*', (req, res) => {
    res.sendFile(`${__dirname}/client/dist/${req.originalUrl}`);
});

app.get('/messages', (req, res) => {
    messages.getAll().then((messages) => {
        res.json(messages);
    });
});


app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.get('/users', (req, res) => {
    users.getAll().then((users) => {
        res.json(users);
    });
});

app.post('/create-user', (req, res) => {
    users.create(req.body).then((user) => {
        res.json(user);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

app.post('/login', (req, res) => {
    users.login(req.body).then(
        (user) => {
            res.json(user);
        }).catch(error => {
        res.status(500);
        res.json(error);
    })
});

app.get('/game-stats', (req, res) => {

    const csvFilePath = './I1.csv';
    const csv = require('csvtojson');
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            res.json(jsonObj);
        });
});

app.post('/image-upload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req,  (err, fields, files) => {
        let oldpath = files.filetoupload.path;
        let newpath = './client/public/images' + files.filetoupload.name;
        fs.rename(oldpath, newpath,  (err) => {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
});

app.get('*', function (req, res) {
    res.sendFile(__dirname +'/client/dist/index.html');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
