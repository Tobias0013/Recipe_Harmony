export default async function fetchAssignments(): Promise<any> {
    try{
        const data = await (await fetch("http://localhost:3000/api/project_assignments")).json();
        data.forEach(d => d.startDate = new Date(d.startDate))
        return data;
    }   
    catch (e){
        console.error(e);
        return null
    } 
}
