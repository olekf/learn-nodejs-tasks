const Emitter = require('events');

function lineEmitter() {
    const emitter = new Emitter();

    let buffer = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (data) => {
        buffer += data;
        const lines = buffer.split(/[\r?\n]/);
        buffer = lines.pop();
        lines.forEach(line => emitter.emit('line', line));
    });

    return emitter;
}

lineEmitter().on('line', line => {
    process.stdout.write(line.split("").reverse().join("") + '\n');
});
