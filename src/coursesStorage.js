'use strict';
const fs = require('fs').promises;
const path = require('path');
const DATA_FILE = path.join(__dirname, '..', 'data', 'courses.json');

async function readCourses() {
  try {
    const text = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(text);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If file doesn't exist yet, create it with an empty array
      await writeCourses([]);
      return [];
    }
    throw err;
  }
}

async function writeCourses(courses) {
  await fs.writeFile(DATA_FILE, JSON.stringify(courses, null, 2), 'utf8');
}

module.exports = { readCourses, writeCourses };
