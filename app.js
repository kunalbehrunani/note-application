console.log('\n');

const fs = require('fs');
const yargs = require('yargs');

const funcs = require('./command.js');

var command = yargs.argv._[0];

if(command === 'open')
  funcs.openNote(yargs.argv.title);
if(command === 'delete')
  funcs.deleteNote(yargs.argv.title);
if(command === 'add')
  funcs.addNote(yargs.argv.title,yargs.argv.body);
if(command === 'list')
  funcs.listNote();
if(command === 'help')
  funcs.guide();
