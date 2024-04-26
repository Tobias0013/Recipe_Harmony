import "dotenv/config";

export const port = getPort();
function getPort() {
    const port = process.env.PORT
    if (!port || Number.isInteger(port)){
        stopProcess("Missing appropriate PORT in environment file")
        return -1;
    }
    return Number.parseInt(port);
}

export const uri = getUri();
function getUri() {
    const uri = process.env.URI
    if (!uri){
        stopProcess("Missing appropriate database URI in environment file")
        return "";
    }
    return uri;
}

function stopProcess(message: string) {
    console.error(message);
    process.exit(0);
}