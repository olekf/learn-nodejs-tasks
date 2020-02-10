const readFileName = 'task1/csv/nodejs-hw1-ex1.csv';
const writeFileName = 'task1/csv/nodejs-hw1-ex1.txt';

const fs = require('fs');
const { promisify } = require('util');
const appendFileAsync = promisify(fs.appendFile);

const csvConverter = require('csvtojson') ({
    ignoreColumns: /Amount/,
    headers: ['book', 'author', 'price']
});

function csvToJson() {
    csvConverter
        .fromStream(fs.createReadStream(readFileName))
        .on('error', console.error)
        .subscribe(jsonObj => {
            return appendFileAsync(writeFileName, JSON.stringify(jsonObj) + '\n');
        }, console.error);
}

fs.writeFile(writeFileName, '', csvToJson);
