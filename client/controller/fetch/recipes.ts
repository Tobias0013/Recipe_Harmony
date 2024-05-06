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

    console.log(queryParms);
    console.log(fetchURL);

    try {
        const res = await fetch(fetchURL);
        const data = await res.json();
        console.log(data);
        
    }
    catch (e) {
        throw e
    }
}

get({
    limit: 8,
    skip: 1
})


export default {
    get
}
