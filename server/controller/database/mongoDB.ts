import mongoose from "mongoose";
import Employee from '../mongoose/employee';
import Project from '../mongoose/project';
import Assignment from '../mongoose/assignment';

async function addEmployee(id: Number, full_name: String, email: String, password: String){
    const newEmployee = new Employee({
        id,
        full_name,
        email,
        password
    });

    try{
        const res = await Employee.find({id: id});
        if (res.length > 0) {            
            return {error: 409, res};
        }

        const employee = await newEmployee.save();
        return {error: null, employee};
    }
    catch (e){
        return{error: e, employee: null}
    }
}

async function addProject(project_code: String, name: String, description: String){
    const newProject = new Project({
        project_code,
        name,
        description
    });

    try{
        const res = await Project.find({project_code: project_code});
        if (res.length > 0) {
            return {error: 409, res};
        }

        const project = await newProject.save();
        return {error: null, project};
    }
    catch (e){
        return{error: e, project: null}
    }
}

async function addAssignment(employee_id: Number, project_code: String, start_date: Date){
    const newAssignment = new Assignment({
        employee_id,
        project_code,
        start_date
    });

    try{
        const assignment = await newAssignment.save();
        return {error: null, assignment};
    }
    catch (e){
        return{error: e, assignment: null}
    }
}

async function getAllEmployee() {
    try {
        const employees = await Employee.find();
        return {error: null, employees};
        
    } 
    catch (e) {
        return {error: e, employees: null}  
    }
}

async function getAllProjects() {
    try {
        const projects = await Project.find();
        return {error: null, projects};
        
    } 
    catch (e) {
        return {error: e, projects: null}  
    }
}

async function getLatestAssignments(limit: number) {
    try {
        const assignments = await Assignment.find()
        .sort({"start_date": -1})
        .limit(limit);
        return {error: null, assignments};
        
    } 
    catch (e) {
        return {error: e, assignments: null}  
    }
}

export default {
    employee: {
        add: addEmployee,
        get: getAllEmployee
    },
    project: {
        add: addProject,
        get: getAllProjects
    },
    assignment: {
        add: addAssignment,
        getLatest: getLatestAssignments
    }
}



export const connect = (uri: string): void =>{
    mongoose.connect(uri)
    .then(() => console.log("MongoDB and Mongoose connected!"))
    .catch(error => console.error("Error in connection!", error));
};
