//Function to handle errors
function handleError(err) {
    console.log("Error occured, generating report..")
    console.log(err)
    console.log("For more information about what possibly caused this error go to https://tool.fastpgp.com/errors/")
    alert(err + "\n\nFor more information about what possibly caused this error go to https://tool.fastpgp.com/errors/")
    throw "Canceling execution"
}



//Function to select button and open the selected option (generate, encrypt, decrypt, verify)
function menuSelect(button, option) {
    //Check if there is already selected button
    const selectedButton = document.querySelector("button.selected")
    if(selectedButton) {
        //If there is, deselected it
        selectedButton.classList.remove("selected")
    }
    
    //Select clicked button
    button.classList.add("selected")



    //Check if there is already selected option
    const selectedOption = document.querySelector(".option.selected")
    if(selectedOption) {
        //If there is, deselected it
        selectedOption.classList.remove("selected")
    }
    
    //Select option
    const selectOption = document.querySelector(`.${option}`)
    selectOption.classList.add("selected")
}



//Function for copying values from inputs/textareas
function copy(inputName) {
    //Get value from input
    const value = document.querySelector(`[name=${inputName}]`).value

    //Write value into clipboard
    navigator.clipboard.writeText(value)
}



//Function for clearing all inputs on website
function _clear() {
    //Clear inputs
    for (let i = 0; i < document.querySelectorAll("input").length; i++) {
        document.querySelectorAll("input")[i].value = ""
    }


    
    //Clear textareas
    for (let i = 0; i < document.querySelectorAll("textarea").length; i++) {
        document.querySelectorAll("textarea")[i].value = ""
    }
}
