const fs = require('fs');
const b = fs.readFileSync('bundle_dump.js', 'utf8');

// Find all template strings in the code
const strRegex = /`([^`$\n]{2,40})`/g;
const strings = [];
let match;
while ((match = strRegex.exec(b)) !== null) {
  if (/[\u4e00-\u9fa5]/.test(match[1])) {
    strings.push(match[1].trim());
  }
}

const uniqueStrings = [...new Set(strings)];
console.log('Total unique Chinese strings:', uniqueStrings.length);
console.log('\n--- Selected UI strings ---');
console.log(uniqueStrings.filter(s => s.length > 2 && !s.includes('http')).slice(0, 100));

// Find sound effects or audio URLs
const audioMatches = b.match(/https?:\/\/[^"'`\s]+\.(?:mp3|wav|ogg)/g) || [];
console.log('\n--- Audio files ---', [...new Set(audioMatches)]);

// Find background image presets or themes
const bgMatches = b.match(/https?:\/\/[^"'`\s]+\.(?:jpg|png|webp|gif)/g) || [];
console.log('\n--- Image URLs count ---', bgMatches.length);
console.log('Sample images:', [...new Set(bgMatches)].slice(0, 10));
