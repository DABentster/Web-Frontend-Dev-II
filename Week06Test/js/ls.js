 /******************************
* LocalStorage Helper Functions /
********************************/
export function readFromLS(key) {
    console.log('readFromLS invoked');
    //pull the stored objects from LS and parse into an array 
    let localArray = JSON.parse(localStorage.getItem(key));
    return localArray;
} 

export function writeToLS(key, data) {
    console.log('writeToLS invoked');
    //save the updated array to localstorage
    localStorage.setItem(key, JSON.stringify(data));
}