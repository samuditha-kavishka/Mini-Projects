let display = document.getElementById('display');

function addToDisplay(value) {

  display.value = display.value + value;
}

function clearAll() {
  display.value = "";       
}

function calculate() {
  try {
    
    let result = eval(display.value);
    display.value = result;
  }
  catch(err) {
    display.value = "Error";  
  }
}