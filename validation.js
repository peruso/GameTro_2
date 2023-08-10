let values;
// form validation
function validate(e) {


  let inputedName = document.getElementById('inputedName');
  // console.log(inputedName);
  let inputedEmail = document.getElementById('email');
  let enteredDescription = document.getElementById('gameDescription');

  let validName = validateName(inputedName);
  let validEmail = validateEmail(inputedEmail);
  let validDescription = validateDescription(enteredDescription);

  let validGameFile = validateGameFile(selectedGameFile);
  
        e.preventDefault();

  if (validName == true && validEmail == true && validDescription == true &&validGameFile == true) {

    valid = true;

    // get the form values
    const formData = new FormData(document.getElementById("formForSub"));
    values = [...formData.entries()];
    console.log(values);

    //selecting the modal and overlay
    let overlay = document.querySelector(".contact-overlay");
    let modal = document.querySelector(".contact-modal");

    //  Selecting modal dataType
    let nameContactModal = document.querySelector("#nameContactModal");
    let emailContactModal = document.querySelector("#emailContactModal");
    let descriptionContactModal = document.querySelector("#descriptionContactModal");
    let fileContactModal = document.querySelector("#fileContactModal");

    //Defining modal data
    nameContactModal.textContent = values[0][1];
    emailContactModal.textContent = values[1][1];
    descriptionContactModal.textContent = values[2][1];
    fileContactModal.textContent = values[3][1].name;


    //Populate modal
    overlay.style.display = "block";
    modal.style.display = "flex";

    //RESET FORM VALUES
    document.getElementById("formForSub").reset();

  } else {
    valid = false;
  }

  // console.log(valid);
  return valid;
}

function validateName(obj) {
  // console.log(obj.value.length);
  if (obj.value.length < 2 || obj.value.length > 15) {
    obj.placeholder = "Enter your name with 2-15 characters"
    obj.value = '';
    obj.classList.add("formError");
    return false;
  } else {
    obj.classList.remove("formError");
    return true;
  }

}

function validateEmail(obj) {
  const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
  let emailResult = reg.test(obj.value);
  // console.log(obj.value);
  // console.log(emailResult);
  if (obj.value == '') {
    obj.placeholder = "Enter your email"
    obj.classList.add("formError");
    return false;
  }
  if (emailResult == false) {
    obj.placeholder = "Enter your email in a proper format";
    obj.value = "";
    obj.classList.add("formError");


    return false;
  } else {
    obj.classList.remove("formError");
    return true;
  }

}

function validateDescription(obj) {
  if (obj.value == "") {
    obj.placeholder = "This must be entered";
    obj.classList.add("formError");



    return false;
  } else {
    obj.classList.remove("formError");
    return true;
  }



}
function validateGameFile(obj) {
  if(obj.value == ""){
    document.getElementById("gameFile-upload").classList.add("formError");
    console.log("Please attach your game file.")
    return false;
  } else {
    console.log("yesok");
    document.getElementById("gameFile-upload").classList.remove("formError");
    return true;
  }
}

document.getElementById("formForSub").addEventListener("submit", validate);
