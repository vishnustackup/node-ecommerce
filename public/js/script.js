const nameid = document.getElementById('name')
const emailid = document.getElementById('email')
const phoneid = document.getElementById('phone')
const passwordid = document.getElementById('password')
const cpasswordid = document.getElementById('cpassword')


const error1 = document.getElementById('error1')
const error2 = document.getElementById('error2')
const error3 = document.getElementById('error3')
const error4 = document.getElementById('error4')
const error5 = document.getElementById('error5')
const signup = document.getElementById('signupform')



function nameValidateChecking() {
    const nameval = nameid.value
    const namepattern = /^[A-Za-z\s]+$/

    if (nameval.trim === '') {
        error1.style.display = "block"
        error1.innerHTML = "please enter a valid name"
    } else if (!namepattern.test(nameval)) {
        error1.style.display = "block"
        error1.innerHTML = "name can only contain alphabets and spaces"
    } else {
        error1.style.display = "none"
        error1.innerHTML = " "
    }
}

function emailValiatechecking() {
    const emailval = emailid.value
    const emailpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


    if (!emailpattern.test(emailval)) {
        error2.style.display = "block"
        error2.innerHTML = "invalid email"
    } else {
        error2.style.display = "none"
        error2.innerHTML = " "
    }

}

function phoneValiatechecking() {

    const phoneval = phoneid.value


    if (phoneval.trim === '') {
        error3.style.display = "block"
        error3.innerHTML = "please enter a valid number"
    } else if (phoneval.length < 10 || phoneval.length > 10) {
        error3.style.display = "block"
        error3.innerHTML = "enter valid phone number"
    } else {
        error3.style.display = "none"
        error3.innerHTML = " "
    }

}


function passwordValiatechecking() {

    const passwordval = passwordid.value;
    const cpasswordval = cpasswordid.value


    if (passwordval.length < 5) {
        error4.style.display = "block"
        error4.innerHTML = "password should contain atleast 5 characters"
    } else {
        error4.style.display = "none"
        error4.innerHTML = " "
    } if (passwordval !== cpasswordval) {
        error5.style.display = "block"
        error5.innerHTML = "passwords does not match"
    } else {
        error4.style.display = "none"
        error4.innerHTML = " "
    }

}

document.addEventListener('DOMContentLoaded', () => {
    signup.addEventListener('submit', (event) => {
        nameValidateChecking(),
            emailValiatechecking(),
            phoneValiatechecking(),
            passwordValiatechecking()


        if (!nameid ||
            !emailid ||
            !passwordid ||
            !cpasswordid ||
            !error1 ||
            !error2 ||
            !error3 ||
            !error4 ||
            !error5 ||
            !signup
        ) {
            console.error("input box cannot be empty");

        }
        if (!error1.innerHTML ||
            !error2.innerHTML ||
            !error3.innerHTML ||
            !error4.innerHTML ||
            !error5.innerHTML) 
            {
            event.preventDefault()
        }
    })

})

//------------------------------------------------------------------------------------------------------//




