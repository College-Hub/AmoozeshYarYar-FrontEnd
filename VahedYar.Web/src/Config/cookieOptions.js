export const cookieOptions = {
    path: '/', // Optional: specify the URL path for which the cookie is available
    maxAge: 3600, // Optional: set the cookie's expiration time in seconds
    expires: new Date('2030-12-31T23:59:59'), // Optional: specify an exact expiration date
    domain: 'http://localhost:3000/', // Optional: set the domain where the cookie is available
    //secure: true, // Optional: enable the "Secure" attribute for HTTPS-only
};