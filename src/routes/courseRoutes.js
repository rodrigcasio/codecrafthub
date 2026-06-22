const express = require('express');
const router = express.Router();
const { readCourses, writeCourses } = require('../storage');

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const STATUS = ['Not Started', 'In Progress', 'Completed'];

// GET /courses
router.get('/', async (req, res) => {
  const courses = await readCourses();
  res.json(courses);
});

// GET /courses/:id
router.get('/:id', async (req, res) => {
  const courses = await readCourses();
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

// POST /courses
router.post('/', async (req, res) => {
  const { name, description, targetDate, status } = req.body;
  if (!name || !description || !targetDate) {
    return res.status(400).json({ error: 'name, description, and targetDate are required' });
  }

  const s = STATUS.includes(status) ? status : 'Not Started';
  const newCourse = {
    id: generateId(),
    name,
    description,
    targetDate,
    status: s
  };

  const courses = await readCourses();
  courses.push(newCourse);
  await writeCourses(courses);
  res.status(201).json(newCourse);
});

// PUT /courses/:id
router.put('/:id', async (req, res) => {
  const { name, description, targetDate, status } = req.body;
  const courses = await readCourses();
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Course not found' });

  if (name !== undefined) courses[idx].name = name;
  if (description !== undefined) courses[idx].description = description;
  if (targetDate !== undefined) courses[idx].targetDate = targetDate;
  if (status !== undefined) {
    if (!STATUS.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    courses[idx].status = status;
  }

  await writeCourses(courses);
  res.json(courses[idx]);
});

// DELETE /courses/:id
router.delete('/:id', async (req, res) => {
  const courses = await readCourses();
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Course not found' });

  const [removed] = courses.splice(idx, 1);
  await writeCourses(courses);
  res.json(removed);
});

module.exports = router;
