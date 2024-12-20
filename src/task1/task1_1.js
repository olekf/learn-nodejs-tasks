import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

function lineListener(line) {
    const reversedLine = reverseLine(line);
    process.stdout.write(`${reversedLine}\n`);
}

function reverseLine(line) {
    return line.split('').reverse().join('');
}

function emitLine(line) {
    eventEmitter.emit('line', line);
}

eventEmitter.on('line', lineListener);

process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const lines = data.trim().split(/[\r?\n]/);
    lines.forEach(emitLine);
});

