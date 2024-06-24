import "./style.css";

//validate email
const button = document.querySelector("#submit");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmation = document.querySelector("#confirmation");

function checkPassword() {
    const password = document.querySelector("#password");
    const confirmation = document.querySelector("#confirmation");
    const errormsg = document.querySelector("#password-msg")

    if(confirmation.value != ""){
        confirmation.setCustomValidity("")
    }else{
        confirmation.setCustomValidity("Please enter a value!")
        confirmation.reportValidity()
    }

    if(password.value == ""){
        password.setCustomValidity("Please enter a value!")
        password.reportValidity();
    }
    else{
        password.setCustomValidity("")
    }

    if(password.value === confirmation.value){
        errormsg.innerHTML = ""
    } else {
        errormsg.innerHTML = "Both passwords do not match."
    }
}

function checkEmailValidity(email) {
	const eRegExp = new RegExp("^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

	return eRegExp.test(email);
}

function checkZIP() {

    const country = document.querySelector("#country");
    const zip = document.querySelector("#zip");

	// For each country, defines the pattern that the ZIP has to follow
    const constraints = {
        ch: [
            "^(CH-)?\\d{4}$",
            "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
          ],
          fr: [
            "^(F-)?\\d{5}$",
            "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
          ],
          de: [
            "^(D-)?\\d{5}$",
            "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
          ],
          nl: [
            "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
            "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
          ],
    }

    // Build the constraint checker
    const constraint = new RegExp(constraints[country.value][0], "");

    // Check it!
    if (constraint.test(zip.value)) {
        // The ZIP follows the constraint, we use the ConstraintAPI to tell it
        zip.setCustomValidity("");
    } else {
        // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
        // give a message about the format required for this country
        zip.setCustomValidity(constraints[country.value][1]);
        zip.reportValidity();
    }
}



button.addEventListener("click", (event) => {
	event.preventDefault();

    checkPassword();

    checkZIP();

	if (!checkEmailValidity(email.value)) {
		email.setCustomValidity("This is wrong");
		email.reportValidity();
	} else {
        email.setCustomValidity("")
    }
});
