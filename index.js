//Declaring variables
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "dist__output");
const outputPath = path.join(OUTPUT_DIR, "index.html");
const inquirer = require("inquirer");
const render = require("./lib/html.js");
const emptyID = [];
const employeeMembers = [];

//Functions for adding/accessing Managers info first and then the Team Member's Info
//Questions for Manager

const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "Enter Manager's Name:"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter Manager's Office Number:"
    },
    {
        type: "input",
        name: "managerID",
        message: "Enter Manager's ID:"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter Manager's Email on File:"
    }
  
];

function forManager() {
    inquirer.prompt(managerQuestions).then(function(data){
        const manager = new Manager(data.managerName, data.officeNumber, data.managerID, data.managerEmail);
        employeeMembers.push(manager);
        emptyID.push(data.managerID);
        team();
    });
};

//Function for selecting team member's role
function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "membersRole",
            message: "Select Team Member's Role:",
            choices: [
                "Engineer",
                "Intern",
                "I am all done building my team for today!"
            ]
        }
    ]).then(function(data){
        if (data.membersRole === "Engineer"){
            forEngineer();
        } else if (data.membersRole === "Intern"){
            forIntern();
        } else (outputTeam());
    });
};

//Function for Interns and questions
function forIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "nameIntern",
            message: "Enter Intern's Name:"
        },
        {
            type: "input",
            name: "internID",
            message: "Enter Intern's ID:"
        },
        {
            type: "input",
            name: "internSchool",
            message: "Enter Intern's School or University:"
        },
        {
            type: "input",
            name: "internEmail",
            message: "Enter Intern's Email on File:"
        }
    
    ]). then(function(data){
        const intern = new Intern(data.nameIntern, data.internID, data.internSchool, data.internEmail);
        employeeMembers.push(intern);
        emptyID.push(data.internID);
        team();
    });
};

//Function for Engineers and questions
function forEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"engineerName",
            message: "Enter Employee Engineer's Name:"
        },
        {
            type: "input",
            name:"engineerID",
            message: "Enter Employee Engineer's ID:"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "Enter Employee Engineer's GitHub Username:"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Enter Employee Engineer's Email on File:"
        }

    ]). then(function(data){
        const engineer = new Engineer(data.engineerName, data.engineerID, data.engineerGithub, data.engineerEmail);
        employeeMembers.push(engineer);
        emptyID.push(data.engineerID);
        team();
    });
};

//Ending function
function outputTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employeeMembers), "utf-8");
}

forManager();
