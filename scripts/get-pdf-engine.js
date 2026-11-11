// Downloads the PDF engine (jsPDF) into app/vendor once, so "Save / Export" works without internet.
// It runs automatically after `npm install`. If the download fails the app still works online.
const fs = require('fs');
const path = require('path');
const https = require('https');

const URL_ = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
const dir = path.join(__dirname, '..', 'app', 'vendor');
const file = path.join(dir, 'jspdf.umd.min.js');

if (fs.existsSync(file) && fs.statSync(file).size > 100000) process.exit(0);
fs.mkdirSync(dir, { recursive: true });

https.get(URL_, (res) => {
  if (res.statusCode !== 200) { console.warn('PDF engine download skipped (HTTP ' + res.statusCode + ').'); res.resume(); return; }
  const out = fs.createWriteStream(file);
  res.pipe(out);
  out.on('finish', () => console.log('PDF engine saved to app/vendor.'));
}).on('error', (e) => console.warn('PDF engine download skipped: ' + e.message));
