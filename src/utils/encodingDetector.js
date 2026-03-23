const fs = require('fs');
const iconv = require('iconv-lite');

/**
 * Function to detect file encoding.
 * Supports UTF-8, GBK/ANSI, and Big5.
 * @param {string} filePath - Path to the file
 * @returns {string} - Detected encoding
 */
function detectEncoding(filePath) {
    const buffer = fs.readFileSync(filePath);
    // Check for UTF-8 BOM
    if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        return 'utf-8';
    }

    // Check for GBK/ANSI
    // Here we make a guess based on the buffer
    const isGBK = buffer.some(byte => byte > 127);
    if (isGBK) {
        return 'gbk';
    }

    // Check for Big5
    // A rough approximation utilizing the byte range typical of Big5
    const isBig5 = buffer.some(byte => (byte >= 129 && byte <= 254));
    if (isBig5) {
        return 'big5';
    }

    return 'unknown'; // Fallback if no encoding detected
}

module.exports = detectEncoding;