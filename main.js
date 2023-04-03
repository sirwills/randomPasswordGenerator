const lengthSlider = document.querySelector(".password-length input");

options = document.querySelectorAll(".option input")

copyIcon = document.querySelector(".input-box span")

passwordInput = document.querySelector(".input-box input");

passwordIndicator = document.querySelector(".password-indicator");

generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbols: "`~@#$%^&*()_-+=?/>.,<|\';:{}[]",
}

const generatePassword = () => { 
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false;
    passLength = lengthSlider.value;

    options.forEach(option => { //looping through each option's checkbox
        if(option.checked) { // if checkbox is checked
            if ( option.id !== "ex-duplicate" && option.id !== "spaces")
            // adding particular key value from character object to statiPasswod
            staticPassword += characters[option.id];

        } else if( option.id !== "spaces"){
            staticPassword +=`  ${staticPassword}  `;
        } else{
            excludeDuplicate = true
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--; 
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
}

const updatePassIndicator = () => {
    passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".password-length span").innerHTML = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword)
lengthSlider.addEventListener("input", updateSlider)
generateBtn.addEventListener("click", generatePassword)