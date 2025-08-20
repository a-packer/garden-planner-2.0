// if need to add more plants, udpate plants.json and run 'node moveData.js' from root

import fs from 'fs';
import pb from './lib/pb.js'

// read JSON file
const data = JSON.parse(fs.readFileSync('plants.json', 'utf8'));

// insert records
for (const item of data) {
  await pb.collection('plants').create(item);
}

console.log("Import finished!");