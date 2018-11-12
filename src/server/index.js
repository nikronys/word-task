const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const util = require('util');
const { exec } = require('child_process');
const fs = require('fs');
const dir = '/../../files';

if (!fs.existsSync(__dirname + dir)){
  fs.mkdirSync(__dirname + dir);
}

let filename = '';

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
const uploads = multer({storage: storage})
console.log(filename)
app.use(express.static('dist'));
app.use(cors());


app.get('/', (req, res) => {
  res.send('Сервер')
})

app.post('/form', uploads.any(), (req, res) => {
  exec(getCommandLine() + " " + __dirname + `/../../files/${filename}`, (error) => console.log(error));
});

app.listen(8080, () => console.log('Listening on port 8080!'));
