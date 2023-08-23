const inputSlider = document.querySelector("[data-sliderLength]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyText = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#special");
const generateBtn = document.querySelector("#generate");
const indicator = document.querySelector("[data-strengthIndicator]");
const checkBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '-!~`@#$%^&*(){}:;[]<>/?|';

//initialize the default values
let password="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set strength circle color to grey
setIndicator("#ccc");


//set password length
function handleSlider(){
    inputSlider.value=passwordLength; //slider length change
    lengthDisplay.innerText = passwordLength;
     //number change kr raha h

     //kitne percent part ko colour krna h wo nikalne ke liye ye find krte h
    //  const min = inputSlider.min;
    //  const max= inputSlider.max;
    //  inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100%"
}
// const sl = document.getElementsByClassName("slider")
// const min = sl.min;
// const max = sl.max;
// const value = sl.value;

// sl.style.background = `linear-gradient(to right, red 0%, red ${(value-min)/(max-min)*100}%, #DEE2E6 ${(value-min)/(max-min)*100}%, #DEE2E6 100%)`;

// sl.oninput = function() {
//   this.style.background = `linear-gradient(to right, red 0%, red ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 ${(this.value-this.min)/(this.max-this.min)*100}%, #DEE2E6 100%)`
// };

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateRandomSymbol(){
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calStrength(){
    let hasUpper= false;
    let hasLower= false;
    let hasNum= false;
    let hasSymbol = false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSymbol=true;
    if(hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8){
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper)
        && (hasNum || hasSymbol) 
        && passwordLength >= 6 ){
            setIndicator("#ff0");
    } else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyText.innerText = "Copied";
        copyText.style.display="inline";
    }
    catch(e){
        copyText.innerText = "Failed";
    }
    copyText.classList.add("active");
    setTimeout(()=> {
    copyText.classList.remove("active");},
    2000);
}

function shufflePassword(array){
    //Fisher Yates Method to shuffle elements of a array
    for(let i= array.length;i>0;i--){
        const j =Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str="";
    array.forEach((el)=>(str +=el));
    return str;
}

function handleCheckboxChange(){
    checkCount=0;
    checkBox.forEach((cBox)=>{
    if(cBox.checked)
        checkCount++;})

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

checkBox.forEach((checkBox)=>{
    checkBox.addEventListener('change', handleCheckboxChange);
})

inputSlider.addEventListener('input', (e)=> {
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener("click", ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener("click", ()=>{
    //none checkbox selected
    if(checkCount == 0){
        return;
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    console.log("start");
    //new password searching start
    //remove old passwordd

    //creating new passwrod
    // if(uppercaseCheck.checked){
    //     password += generateRandomUpperCase();
    // }
    // if(lowercaseCheckcaseCheck.checked){
    //     password += generateRandomLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateRandomSymbol();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked)
        funcArr.push(generateRandomUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateRandomLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateRandomSymbol);

    console.log("fucArr length is: ");
    console.log(funcArr.length);
    console.log(passwordLength);
    let b= passwordLength-funcArr.length;
    console.log(b);
    //all the compulsory character
    let password=""
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    console.log(funcArr);
    console.log("compulsory");
    //for the remaining length
    for(let i=0;i<b;i++){
        let randomIndex=  Math.floor(Math.random() * Math.floor(funcArr.length));
        console.log("random index "+ randomIndex);
        password += funcArr[randomIndex]();
    }
    console.log("remaining");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("shuffle");
    //show the password
   p= password.split("undefined").join("");
    passwordDisplay.value = p;
    console.log(password.length);
    console.log("created");
    calStrength();
})

