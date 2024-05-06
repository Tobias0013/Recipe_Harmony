import url from "../config"

type Query = {
    limit?: number;
    skip?: number;
    tag?: string[];
    cookTimeLess?: number;
}

async function get(query: Query): Promise<any> {
    const { limit, skip, tag, cookTimeLess } = query;
    let fetchURL = url;
    fetchURL += "/api/recipes";
    
    const queryParms: string[] = [];

    limit && queryParms.push(`limit=${limit}`);
    skip && queryParms.push(`skip=${skip}`);
    cookTimeLess && queryParms.push(`cookTimeLess=${cookTimeLess}`);
    if (tag) {
        tag.length > 1 ? queryParms.push(tag.join(",")) : queryParms.push(tag[0])
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
