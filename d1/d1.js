const fs = require('fs');
const readline = require('readline');

const interface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

async function readLines() {
  return new Promise(resolve => {
    let sum = 0;
    let sumValues = [];
    interface.on('line', function (line) {
      if (line == '') {
        sumValues.push(sum);
        sum = 0;
      } else {
        sum += parseInt(line);
      }
    });
    interface.on('close', () => resolve(sumValues));
  })
}

readLines()
  .then(result => {
    console.log('Top calories: ', Math.max(...result));
    result.sort((a, b) => {return b-a});
    console.log('Sum of top three: ', result[0] + result[1] + result[2]);
  });