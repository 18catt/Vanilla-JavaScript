const countVal= document.querySelector("#num");

const decrement=()=>{
    let value= parseInt(countVal.innerText);
    value=value-1;
    countVal.innerText = value;
}

const increment=()=>{
    let value= parseInt(countVal.innerText);
    value=value+1;
    countVal.innerText = value;
}