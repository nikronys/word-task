const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const util = require('util');
const { exec } = require('child_process');
const fs = require('fs');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
const dir = '/../../files';
const createReport = require('docx-templates');

if (!fs.existsSync(__dirname + dir)){
  fs.mkdirSync(__dirname + dir);
}

let filename = '';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const getCommandLine = () => {
  switch (process.platform) { 
     case 'darwin' : return 'open';
     case 'win32' : return 'start';
     case 'win64' : return 'start';
     default : return 'xdg-open';
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    filename = file.originalname;
  }
})
const uploads = multer({storage: storage}).any();

app.use(express.static('dist'));
app.use(cors());


app.get('/', (req, res) => {
  res.send('Сервер')
})

app.post('/form', uploads, (req, res) => {
  createReport({
    template: `files/${filename}`,
    output: `files/${filename}`,
    data: {
      name: req.body.name,
      date: moment(req.body.date).format('DD.MM.YYYY').toString(),
      contract: req.body.contract,
      table: JSON.parse(req.body.table)
    },
  });
  exec(getCommandLine() + " " + __dirname + `/../../files/${filename}`, (error) => console.log(error));
});

app.post('/update', (req, res) => {
  console.log(req.body)
  createReport({
    template: `files/${filename}`,
    output: `files/${filename}`,
    data: {
      name: req.body.name,
      date: moment(req.body.date).format('DD.MM.YYYY').toString(),
      contract: req.body.contract,
      table: req.body.table
    },
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
