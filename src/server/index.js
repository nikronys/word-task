const express = require('express');
const util = require('util');
const exec = require('child_process').exec;
const os = require('os');
const pathname = './Lab2(1).docx';
const app = express();

app.use(express.static('dist'));

function getCommandLine() {
  switch (process.platform) { 
     case 'darwin' : return 'open';
     case 'win32' : return 'start';
     case 'win64' : return 'start';
     default : return 'xdg-open';
  }
}


exec(getCommandLine() + ' ' + pathname);

app.listen(8080, () => console.log('Listening on port 8080!'));
