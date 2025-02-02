/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Krisha Katuwal Student ID: 104292230 Date: 2025-02-02
*
********************************************************************************/

//importing the express module
const express=require('express');
// importing project data as we get functions for our project from here.
const projectData= require('./modules/projects');

const app= express(); // creates new app using express. 

const port = 8080; //picking a port for server so that the server can know where the request is coming from

projectData.initializeProjects() //before starting the server, here we're loading the project data 
.then(()=>{
    console.log('Projects are ready!');
    app.listen(port,()=>{
        console.log(`server listening on: http://localhost:${port} `);
    });
}) 
.catch(error=> // if incase something goes wrong while loading the data
    { 
    console.log('OOPS! An issue occured with the data', error);
});  
app.get('/', (req,res)=> //It's the homepage; it just displays some info about assignment 
{
    res.send("Assignment-2: KRISHA KATUWAL | 104292230");
}); 
app.get('/solutions/projects', (req,res)=> { //This path provides all projects
    projectData.getAllProjects()
    .then(projects=>
    {
        res.json({
            StudentName: 'KRISHA KATUWAL',
            StudentId:'104292230',
            timestamp: new Date(), //Current date and time
            projects: projects //sends all project here
        });
    })
    .catch(err =>
    {
      res.status(500).send('Cannot fetch the projects!!',+ err); //here 500 status code indicates a server error, and +err is used concatenate error message.  
     });
}); 
// This route will show a project with a specific ID
app.get('/solutions/projects/id-demo', (req, res) => {
    projectData.getProjectById(18)  // Looks for the project with ID 18
      .then(project => {
        res.json({
          studentName: 'Your Name',
          studentId: 'Your Student ID',
          timestamp: new Date(),
          project: project  // Sends the details of the project as a response
        });
      })
      .catch(err => {
        // If the project with the ID is not found, show an error message
        res.status(404).send('Project not found: ' + err);
      });
  });
  
  
  app.get('/solutions/projects/sector-demo', (req, res) => { // This path will show all projects that belong to a specific sector
    projectData.getProjectsBySector('ind')  // Looks for projects in the 'Industry' sector (using 'ind')
      .then(projects => {
        res.json({
          studentName: 'Your Name',
          studentId: 'Your Student ID',
          timestamp: new Date(),
          projects: projects  // Returns the array of projects in that sector
        });
      })
      .catch(err => {
        // If no projects are found in that sector, it shows an error message
        res.status(404).send('No projects found in this sector: ' + err);
      });
  });