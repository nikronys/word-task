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
const mammoth = require("mammoth");

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

app.post('/form', uploads, async (req, res) => {
  await createReport({
    template: `files/${filename}`,
    output: `files/${filename}`,
    data: {
      name: req.body.name,
      date: moment(req.body.date).format('DD.MM.YYYY').toString(),
      contract: req.body.contract,
      table: JSON.parse(req.body.table)
    },
  });
  await mammoth.convertToHtml({path: `files/${filename}`})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        const newHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${result.value}</body></html>`;
        fs.writeFile("generate.html", newHTML, function(err) {
          if(err) {
              return console.log(err);
          }
      
          console.log("The file was saved!");
      }, () => exec(getCommandLine() + " " + __dirname + `/../../generate.html`, (error) => console.log(error))); 
    })
    .done();

  await exec(getCommandLine() + " " + __dirname + `/../../files/${filename}`, (error) => console.log(error));
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
