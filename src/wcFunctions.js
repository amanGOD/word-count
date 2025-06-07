// Count bytes
function countBytes(fileContent) {
  return Buffer.byteLength(fileContent, 'utf8');
}

// Count lines
function countLines(fileContent) {
  return fileContent.split('\n').length;
}

// Count words
function countWords(fileContent) {
  return fileContent.trim().split(/\s+/).length;
}

// Count characters
function countCharacters(fileContent) {
  return [...fileContent].length;
}

module.exports = {
  countBytes,
  countLines,
  countWords,
  countCharacters
};
