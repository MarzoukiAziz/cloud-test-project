const projectService = require('../services/projectService');

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error creating project:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectService.deleteProject(req.params.id);
    if (deletedProject) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.error('Error deleting project:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const renameProject = async (req, res) => {
  try {
    const updatedProject = await projectService.renameProject(
      req.params.id,
      req.body.name
    );
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.error('Error renaming project:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkIntersection = async (req, res) => {
  try {
    const result = await projectService.checkIntersection(
      req.body.project_id_1,
      req.body.project_id_2
    );
    res.status(200).json({ intersection: result });
  } catch (err) {
    console.error('Error checking intersection:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const mergeProjects = async (req, res) => {
  try {
    const newProject = await projectService.mergeProjects(
      req.body.project_id_1,
      req.body.project_id_2
    );
    res.status(201).json(newProject);
  } catch (err) {
    console.error('Error merging projects:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDepartment = async (req, res) => {
  try {
    const department = await projectService.getDepartment(req.params.id);
    if (department) {
      res.status(200).json({ department });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    console.error('Error fetching department:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProjects,
  getDepartment,
  createProject,
  deleteProject,
  renameProject,
  checkIntersection,
  mergeProjects,
};
