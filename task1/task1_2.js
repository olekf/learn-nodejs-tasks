const readFileName = 'task1/csv/nodejs-hw1-ex1.csv';
const writeFileName = 'task1/csv/nodejs-hw1-ex1.txt';

const { pipeline } = require('stream');
const fs = require('fs');
const csv = require('csvtojson');

pipeline(
    fs.createReadStream(readFileName),
    csv({
        headers: ['book', 'author', 'amount', 'price'],
        ignoreColumns: /amount/,
        checkType: true
    }),
    fs.createWriteStream(writeFileName),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
