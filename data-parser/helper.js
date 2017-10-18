const fs = require('fs');

module.exports = {
  save: (data, path) => {
    if(fs.existsSync(path)){
      console.log('A file in path: ' + path + ' already exists, deleting it...');
      fs.unlink(path, function(err, data){
        if (err){
          console.log(err);
        } else {
          console.log('Output file deleted.');
        }
      });
    }
  
    fs.writeFile(path, data, {flag: 'w+'}, function (err) {
      if (err) {
          return console.log(err);
      }
      console.log('File saved! Ready to import');
    });
  }
}
