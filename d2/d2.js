const readline = require('readline');
const fs = require('fs');

const chars = {'A': 1, 'B': 2, 'C': 3, 'X': 1, 'Y': 2, 'Z': 3}

const interface = readline.createInterface({
  input: fs.createReadStream('input.txt')
});

async function readLines() {
  return new Promise(resolve => {
    let score = 0;
    interface.on('line', (line) => {
      line = line.replace(/[ABCXYZ]/g, m => chars[m]);
      if (parseInt(line[0]) < parseInt(line[2]) || (line[0] == 3 && line[2] == 1)) {
        score += 6
      }
      if (line[0] === line[2]) {
        score += 3
      }
      score += parseInt(line[2]);
    })
    interface.on('close', () => resolve(score));
  })
}

readLines()
  .then(score => {
    console.log('Final score:', score);
  })