// Read stored Objects from Local Storage into Array
export function readFromLS(key) {
    let localArray = JSON.parse(localStorage.getItem(key));
    return localArray;
} 

// Write Array of Objects to Local Storage
export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}