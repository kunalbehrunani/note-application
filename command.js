const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

var AllNotes = [];
var title;


try{
  var string_AllNotes = fs.readFileSync('Book.json' , 'utf-8' , (err,data) => { console.log(err); });
  AllNotes = JSON.parse(string_AllNotes);
}
catch(err) {}


var size_AllNotes = AllNotes.length;



module.exports = {


openNote  : function openNote(title){
    var filteredNotes = AllNotes.filter( function (element){
      if(title === element.title) return element;
    });
    var size_filteredNote = filteredNotes.length;
    if(size_filteredNote === 0) console.log( chalk.red('MESSAGE') + '   :   ' + title + ' note not found.' );
    else console.log(chalk.blue(filteredNotes[0].title) + '\n' + chalk.yellow(filteredNotes[0].body));
  },


deleteNote : function deleteNote(title) {

      var filteredNotes = AllNotes.filter( function (element) {
        if(title !== element.title) return element;
      });
      var size_filteredNote = filteredNotes.length;
      if(size_filteredNote === size_AllNotes )  console.log( chalk.red('MESSAGE') + '   :   ' + title + ' note not found.');
      else{
        var string_filteredNotes = JSON.stringify(filteredNotes);
        fs.writeFileSync('Book.json' , string_filteredNotes , 'utf-8' , (err) => {console.log(err);})
        console.log( chalk.red('MESSAGE') + '   :   ' + title + ' note successfully deleted');
      }
  },

addNote : function addNote(newtitle,newbody) {

  var NewNote = {title : newtitle , body : newbody}
  AllNotes.push(NewNote);
  var string_AllNotes = JSON.stringify(AllNotes);
  fs.writeFileSync('Book.json' , string_AllNotes , 'utf-8' , (err) => {console.log(err);});
  console.log( chalk.red('MESSAGE') + '   :   ' + newtitle + ' note successfully added');
  },

listNote :  function listNote(){
    if(size_AllNotes === 0) console.log(chalk.red('MESSAGE') + '   :   No notes exixt');
    else{
      console.log(chalk.blue('Following are the title of your notes : \n\n'));
      for(i=0;i<size_AllNotes;i++){
        console.log(chalk.green(`   *   ${AllNotes[i].title}`));
      }
    }
  },
guide : function guide(){
  console.log(chalk.blue('This is a command line application that lets you manage your notes.\n\n'));
  console.log(chalk.blue('To run the application, follow the below steps:'));
  console.log(chalk.blue(`Direct yourself to the home folder and type the command in given order:\nnode<space>app.js<space>command<space>--title="<title of the note>"<space>--body="body of the note" `));
  console.log(chalk.blue('\nFollowing commands are allowed:\n\n1.list: List all the notes.\n2.open: Open a given note. Title is mandatory.\n3.delete: Delete the given note. Title is mandatory.\n4.add: Add a new note. Title and body is mandatory.\n5.help: Guide user to use the application.'));
}


}//End of the module.exports loop
