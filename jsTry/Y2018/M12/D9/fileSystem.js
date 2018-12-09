const fs = require('fs');

fs.readFile('data/1.txt', (err, data) => {
  if(err) {
    console.log('fail to read!');
  } else {
    console.log('success to read!');
    console.log(data);
  }
});

fs.writeFile('data/2.txt', 'something to write in file', err=>{
  if(err) {
    console.log('fail to write!');
  } else {
    console.log('success to write!');
  }
});
