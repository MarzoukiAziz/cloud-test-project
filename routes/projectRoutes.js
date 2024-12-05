const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Get all projects
router.get('/', projectController.getAllProjects);

// Create a new project
router.post('/', projectController.createProject);

// Delete a project by ID
router.delete('/:id', projectController.deleteProject);

// Rename a project by ID
router.put('/:id', projectController.renameProject);

// Check if two projects perimeters intersect
router.get('/intersect', projectController.checkIntersection);

// Merge two projects perimeters
router.post('/merge', projectController.mergeProjects);

// Get department for the center point of a project
router.get('/:id/department', projectController.getDepartment);

module.exports = router;
