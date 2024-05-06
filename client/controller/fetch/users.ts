import url from "../config"

async function signup(fullName: string, password: string, email: string): Promise<Response> {
    try {
        const response = await fetch(`${url}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name: fullName,
                password: password,
                email: email
            })
        });

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export default {
    user: {
        signup: signup
    }
}
