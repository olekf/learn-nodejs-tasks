const readFileName = 'src/task1/csv/nodejs-hw1-ex1.csv';
const writeFileName = 'src/task1/csv/nodejs-hw1-ex1.txt';

const { pipeline } = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

const csvConfig = {
    headers: ['book', 'author', 'amount', 'price'],
    ignoreColumns: /amount/,
    checkType: true
};

pipeline(
    fs.createReadStream(readFileName),
    csv(csvConfig),
    fs.createWriteStream(writeFileName),
    errorHandler
);

function errorHandler(err) {
    if (err) {
        console.error('Pipeline failed.', err);
    } else {
        console.log('Pipeline succeeded.');
    }
}
