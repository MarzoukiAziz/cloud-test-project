const { client } = require('../db');
const turf = require('@turf/turf');
var geojsonMerge = require('@mapbox/geojson-merge');
const axios = require('axios');

const getAllProjects = async () => {
  const result = await client.query('SELECT * FROM projects');
  return result.rows;
};

const createProject = async ({ name, perimeter }) => {
  const result = await client.query(
    'INSERT INTO projects (name, perimeter) VALUES ($1, $2) RETURNING *',
    [name, JSON.stringify(perimeter)]
  );
  return result.rows[0];
};

const deleteProject = async (id) => {
  const result = await client.query(
    'DELETE FROM projects WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

const renameProject = async (id, name) => {
  const result = await client.query(
    'UPDATE projects SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
};

const checkIntersection = async (projectId1, projectId2) => {
  const result1 = await client.query(
    'SELECT perimeter FROM projects WHERE id = $1',
    [projectId1]
  );
  const result2 = await client.query(
    'SELECT perimeter FROM projects WHERE id = $1',
    [projectId2]
  );

  if (result1.rows.length === 0 || result2.rows.length === 0) {
    throw new Error('One or both projects not found');
  }

  const geo1 = result1.rows[0].perimeter;
  const geo2 = result2.rows[0].perimeter;

  // Check if two geometries (geo1 and geo2) intersect and return true or false
  return turf.booleanIntersects(geo1, geo2);
};

const mergeProjects = async (projectId1, projectId2) => {
  try {
    const result1 = await client.query(
      'SELECT perimeter FROM projects WHERE id = $1',
      [projectId1]
    );
    const result2 = await client.query(
      'SELECT perimeter FROM projects WHERE id = $1',
      [projectId2]
    );

    if (result1.rows.length === 0 || result2.rows.length === 0) {
      throw new Error('One or both projects not found');
    }

    const geo1 = result1.rows[0].perimeter;
    const geo2 = result2.rows[0].perimeter;

    // Perform the union operation
    var mergedGeoJSON = geojsonMerge.merge([geo1, geo2]);

    //Create a new project with the merged perimeter
    const newProjectName = `Merged Project (${projectId1}-${projectId2})`;
    const createResult = await client.query(
      'INSERT INTO projects (name, perimeter) VALUES ($1, $2) RETURNING *',
      [newProjectName, JSON.stringify(mergedGeoJSON)]
    );

    return createResult.rows[0];
  } catch (error) {
    console.error('Error merging projects:', error);
    throw error;
  }
};

const getDepartment = async (id) => {
  const result = await client.query(
    'SELECT perimeter FROM projects WHERE id = $1',
    [id]
  );
  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  // Extract the perimeter geometry from the query result
  const geo = result.rows[0].perimeter;

  // Calculate the center point of the perimeter geometry
  const center = turf.center(geo);

  // Get the department code using the coordinates of the center point
  const departmentCode = await getDepartmentFromCoordinates(
    center.geometry.coordinates
  );

  return departmentCode;
};

// Fetch the department code from an external API using latitude and longitude
const getDepartmentFromCoordinates = async ([longitude, latitude]) => {
  try {
    // Send GET request to the department API with the coordinates
    const response = await axios.get(process.env.DEPARTEMENT_API, {
      params: {
        lat: latitude,
        lon: longitude,
        fields: 'departement',
        format: 'json',
      },
    });

    // Check if the response contains department data and return the code
    if (response.data.length > 0 && response.data[0].departement) {
      return parseInt(response.data[0].departement.code, 10);
    } else {
      throw new Error('Department not found for these coordinates');
    }
  } catch (error) {
    console.error('Error fetching department:', error.message);
    throw error;
  }
};

module.exports = {
  getAllProjects,
  createProject,
  renameProject,
  deleteProject,
  getDepartment,
  mergeProjects,
  checkIntersection,
};
