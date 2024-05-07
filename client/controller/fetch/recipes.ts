import url from "../config"

type Query = {
    limit?: number;
    skip?: number;
    tags?: string[];
    cookTimeLess?: number;
}

async function get(query: Query): Promise<any> {
    const { limit, skip, tags, cookTimeLess } = query;
    console.log(url);
    
    let fetchURL = url;
    fetchURL += "/api/recipes";
    
    const queryParms: string[] = [];

    limit && queryParms.push(`limit=${limit}`);

    skip && queryParms.push(`skip=${skip}`);
    
    cookTimeLess && queryParms.push(`cookTimeLess=${cookTimeLess}`);
    
    if (tags) {
        tags.length > 1 ? queryParms.push(`tag=${tags.join(",")}`) : queryParms.push(`tag=${tags[0]}`)
    }

    if (queryParms.length > 0) {
        fetchURL += `?${queryParms.join("&")}`;
    }

    try {
        const res = await fetch(fetchURL);
        const data = await res.json();
        return {error: null, recipes: data};        
    }
    catch (e) {
        return {error: e, recipes: null}
    }
}

async function getByName(name:string){
    let fetchURL = url;
    fetchURL += `/api/recipes?name=${name}`;

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
