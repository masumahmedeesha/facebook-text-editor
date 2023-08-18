import serverCredential from "./serverCredential.json";

export const server = pointServer();

function pointServer() {
    // if (typeof window !== 'undefined') {
    //     if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') 
    //         return serverCredential.staging.STAGING_SERVER_HOST;
    //     else return serverCredential.server.SERVER_HOST;
    // }
    // return serverCredential.staging.STAGING_SERVER_HOST;
    return serverCredential.staging.STAGING_SERVER_HOST;
}