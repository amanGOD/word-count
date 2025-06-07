#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const {
  countBytes,
  countLines,
  countWords,
  countCharacters
} = require('../src/wcFunctions');

function readFromStdin(callback) {
  let data = '';
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', chunk => {
    data += chunk;
  });

  process.stdin.on('end', () => {
    callback(data);
  });
}

function run() {
  const args = process.argv.slice(2);

  const options = ['-c', '-l', '-w', '-m'];
  let option = null;
  let file = null;

  if (args.length === 0) {
    console.error("Usage: ccwc [-c|-l|-w|-m] [filename]");
    return;
  }

  if (options.includes(args[0])) {
    option = args[0];
    file = args[1];
  } else {
    file = args[0];
  }

  const processContent = (fileContent) => {
    let result;

    if (option === '-c') {
      result = countBytes(fileContent);
    } else if (option === '-l') {
      result = countLines(fileContent);
    } else if (option === '-w') {
      result = countWords(fileContent);
    } else if (option === '-m') {
      result = countCharacters(fileContent);
    } else {
      // default mode: line, word, byte count
      const lines = countLines(fileContent);
      const words = countWords(fileContent);
      const bytes = countBytes(fileContent);
      result = `${lines}\t${words}\t${bytes}`;
    }

    const label = file || '';
    console.log(`${result}\t${label}`);
  };

  if (!file) {
    // Read from stdin
    readFromStdin(processContent);
  } else {
    const filePath = path.resolve(file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${file}`);
        return;
      }
      processContent(data);
    });
  }
}

run();
