/* 
 * summation() function
 * input: a single number variable value n
 * output: the result from the summation of all the integer numbers from 1 to n
 *         1 + 2 + ... + n   OR   n(n+1)/2
 */
function summation(){
    let n1 = document.getElementById("num1").value;
    let out = 0;
    for (i = 1; i <= n1; i++){
        out += i;
    }
    document.getElementById("output").innerHTML = out;
}

/* 
 * addition() function
 * input: two number variables value n1 and n2
 * output: the result from the addition of n1 and n2
 *         n1 + n2
 */
function addition() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 + n2;
    document.getElementById("output").innerHTML = out;
}

/* 
 * subtraction() function
 * input: two number variables value n1 and n2
 * output: the result from the subtraction of n1 and n2
 *         n1 - n2
 */
function subtraction() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 - n2;
    document.getElementById("output").innerHTML = out;
}

/*
 * multiplication() function
 * input: two number variables value n1 and n2
 * output: the result from the multiplication of n1 and n2
 *         n1 *  n2
 */
function multiplication() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 * n2;
    document.getElementById("output").innerHTML = out;
}

/*
 * division() function
 * input: two number variables value n1 and n2
 * output: the result from the division of n1 and n2
 *         n1 / n2
 */
function division() {
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let out = n1 / n2;
    document.getElementById("output").innerHTML = out;
}