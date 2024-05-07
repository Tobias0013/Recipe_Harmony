import url from "../config"

type Query = {
    tags?: string[];
    cookTimeLess?: number;
    limit: number;
    skip: number;
}

async function get(query: Query): Promise<any> {
    const { limit, skip, tags, cookTimeLess } = query;
    
    let fetchURL = url;
    fetchURL += "/api/recipes";
    
    const queryParams: string[] = [];

    queryParams.push(`limit=${limit}`);
    queryParams.push(`skip=${skip}`);
    
    cookTimeLess && queryParams.push(`cookTimeLess=${cookTimeLess}`);
    
    if (tags && tags.length > 0) {
        tags.length > 1 ? queryParams.push(`tag=${tags.join(",")}`) : queryParams.push(`tag=${tags[0]}`)
        console.log("DEBUG ", "test");
    }

    fetchURL += `?${queryParams.join("&")}`;
    try {
        const res = await fetch(fetchURL);
        const data = await res.json();
        return {error: null, recipes: data};        
    }
    catch (e) {
        return {error: e, recipes: null}
    }
}

async function getByName(name:string, limit: number, skip: number){
    let fetchURL = url;
    fetchURL += `/api/recipes?name=${name}&limit=${limit}&skip=${skip}`;

    try {
        const res = await fetch(fetchURL);
        const data = await res.json();
        return {error: null, recipes: data};        
    }
    catch (e) {
        return {error: e, recipes: null}
    }
}

export default {
    get,
    getByName
}
