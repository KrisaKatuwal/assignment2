// We are importing project and sector data from JSON files
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];  // This is an array to store all the projects after we process them

// Function to initialize the projects 
function initializeProjects() {
    return new Promise((resolve, reject) => {
        // Check if project data or sector data is missing
        if (!projectData || !sectorData || projectData.length === 0 || sectorData.length === 0) {
            return reject("We couldn't find the project or sector data. Please check.");
        }
     // Goes through all projects and finds their sector name
        projects = projectData.map(project => {
            // Find the sector that matches the project 
            const sector = sectorData.find(sec => sec.id === project.sector_id);
            return {
                ...project,  
                sector: sector ? sector.sector_name : "Unknown"  // Add sector name or 'Unknown' if not found
            };
        });

        resolve();  // Resolve promise after processing is complete
    });
}

// Testing if the projects are set up correctly
initializeProjects()
    .then(() => {
        console.log("Projects have been successfully initialized:", projects);
    })
    .catch((error) => {
        console.error("Error initializing projects:", error);
    });

// Function to get all projects we have 
function getAllProjects() {
    return new Promise((resolve, reject) => {
        // If there are no prjects, it gives error
        if (projects.length === 0) {
            return reject("There are no projects available at the moment.");
        }

        resolve(projects);  // if there are projects available then it reutrns back
    });
}

// Testing the getAllProjects function
getAllProjects()
    .then((allProjects) => {
        console.log("Here are all the projects:", allProjects);
    })
    .catch((error) => {
        console.error("Error retrieving projects:", error);
    });

// Function to get a project based on its ID
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        // Find a project that matches the given ID
        const project = projects.find(p => p.id === Number(projectId)); 
        if (project) {
            resolve(project);  // If the project is found, resolve with project data
        } else {
            reject(`Sorry, we couldn't find a project with ID: ${projectId}`);
        }
    });
}

// Function to get projects that belong to a certain sector
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        //Finds all prject that belong to the sector 
        const filteredProjects = projects.filter(project =>
            project.sector.toLowerCase().includes(sector.toLowerCase())
        );

    
        if (filteredProjects.length > 0) {
            resolve(filteredProjects);
        } else {
            reject(`No projects found in the sector: ${sector}. Try a different sector.`);
        }
    });
}

// Export the functions so that we can use them in other file
module.exports = { initializeProjects, getAllProjects, getProjectById, getProjectsBySector };
