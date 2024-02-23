/* eslint-disable react/prop-types */
// const specialAvatarArray=[{name:'google',svgString:`<svg xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:'white'}} width="2443" height="2500" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>`}]
// export default function creator(message){
//     if(find(message).decision){
//         const parser = new DOMParser();

// // Parse the SVG string
// const svgDocument = parser.parseFromString(find(message).svg, "image/svg+xml");

// // Extract the root <svg> element
// const svgElement = svgDocument.documentElement;
//         return svgElement;
//     }
//     return message[0];
// }
// function find(mess){
 
//     for (let index = 0; index < specialAvatarArray.length; index++) {
//        if(mess.includes(specialAvatarArray[index].name)){
          
//           return {decision:true,svg:specialAvatarArray[index].svgString};
//        }
        
//     }
//     return {decision:false};
// }
import Avatar from '@mui/material/Avatar';
const specialAvatarArray = [
    {
        name:'google',
        OptionalUppercasename:'Google',
        svgString:`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-380.2 274.7 65.7 65.8" id="google"><circle cx="-347.3" cy="307.6" r="32.9" fill="#e0e0e0"></circle><circle cx="-347.3" cy="307.1" r="32.4" fill="#fff"></circle><g><defs><path id="a" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"></use></clipPath><path fill="#fbbc05" d="M-370.8 320.3v-26l17 13z" clip-path="url(#b)"></path><defs><path id="c" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path></defs><clipPath id="d"><use overflow="visible" xlink:href="#c"></use></clipPath><path fill="#ea4335" d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z" clip-path="url(#d)"></path><g><defs><path id="e" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path></defs><clipPath id="f"><use overflow="visible" xlink:href="#e"></use></clipPath><path fill="#34a853" d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z" clip-path="url(#f)"></path></g><g><defs><path id="g" d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path></defs><clipPath id="h"><use overflow="visible" xlink:href="#g"></use></clipPath><path fill="#4285f4" d="M-322.8 331.3l-31-24-4-3 35-10z" clip-path="url(#h)"></path></g></g></svg>`
    },
    {
        name:'chrome',
        OptionalUppercasename:'Chrome',
        svgString:`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" data-name="Layer 1" viewBox="0 0 32 32" id="chrome"><path fill="#00ac47" d="M4.7434,22.505A12.9769,12.9769,0,0,0,14.88,28.949l5.8848-10.1927L16,16.0058,11.2385,18.755l-1.5875-2.75L8.4885,13.9919,5.3553,8.5649A12.9894,12.9894,0,0,0,4.7434,22.505Z"></path><path fill="#ea4435" d="M16,3.0072A12.9769,12.9769,0,0,0,5.3507,8.5636l5.8848,10.1927L16,16.0057V10.5072H27.766A12.99,12.99,0,0,0,16,3.0072Z"></path><path fill="#ffba00" d="M27.2557,22.505a12.9772,12.9772,0,0,0,.5124-12H15.9986v5.5011l4.7619,2.7492-1.5875,2.75-1.1625,2.0135-3.1333,5.4269A12.99,12.99,0,0,0,27.2557,22.505Z"></path><circle cx="15.999" cy="16.007" r="5.5" fill="#fff"></circle><circle cx="15.999" cy="16.007" r="4.25" fill="#4285f4"></circle></svg>`
    }
];

export default function Creator({message}) {
    if(message){
    const foundAvatar = specialAvatarArray.find(avatar => (message.includes(avatar.name)||message.includes(avatar.OptionalUppercasename)));
    if (foundAvatar) {
        // Create a data URL from the SVG string
        const svgURL = `data:image/svg+xml;base64,${btoa(foundAvatar.svgString)}`;
        // Return the Avatar component with the src attribute set to the SVG data URL
        return <Avatar alt={foundAvatar.name} src={svgURL} />;
    }
    // Return the first character of the message as a fallback
    return <Avatar>{message[0].toUpperCase()}</Avatar>;
}
return;  
}