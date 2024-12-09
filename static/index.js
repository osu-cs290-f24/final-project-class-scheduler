function unhideElement(){
    document.getElementById("modal-backdrop").classList.remove("hidden");
    document.getElementById("add-class-modal").classList.remove("hidden");
}

function hideElement(){
    document.getElementById("modal-backdrop").classList.add("hidden");
    document.getElementById("add-class-modal").classList.add("hidden");

    // Reset Elements values
    document.getElementById("class-name-input").value = "";
    document.getElementById("class-subject-input").value = "";
    document.getElementById("class-to-time-input").value = undefined;
    document.getElementById("class-from-time-input").value = undefined;
    document.getElementById("input-days-monday").checked = false;
    document.getElementById("input-days-tuesday").checked = false;
    document.getElementById("input-days-wednesday").checked = false;
    document.getElementById("input-days-thursday").checked = false;
    document.getElementById("input-days-friday").checked = false;
}

/*function checkEmpty(){
    var name = document.getElementById("class-name-input").value;
    var subject = document.getElementById("class-subject-input").value;
    var to_time = document.getElementById("class-to-time-input").value;
    var from_time = document.getElementById("class-from-time-input").value;
    var monday = document.getElementById("input-days-monday").checked;
    var tuesday = document.getElementById("input-days-tuesday").checked;
    var wednesday = document.getElementById("input-days-wednesday").checked;
    var thursday = document.getElementById("input-days-thursday").checked;
    var friday = document.getElementById("input-days-friday").checked;

    if (name == "" || subject == "" || from_time == undefined || to_time == undefined
        || (!monday && !tuesday && !wednesday && !thursday && !friday)){
           alert("One or more required fields is empty!");
           return true;
    } else {
        return false;
    }
}*/


function handleModalAcceptClick() {
    var newClass = document.getElementById("class-name-input").value;
    var newSubject = document.getElementById("class-subject-input").value;
    var newFromTime = document.getElementById("class-from-time-input").value.trim(); 
    var newToTime = document.getElementById("class-to-time-input").value.trim(); 
    var newDays = [];
    var daysField = [];
    daysField = document.querySelectorAll('[name="input-days"]');
    for(var i=0; i < daysField.length; i++){
        if(daysField[i].checked){
            newDays.push(daysField[i].value);
        }
    }
    if (!newClass || !newSubject || !newFromTime || !newToTime || !newDays) { // newDays check does not work
        alert("One or more required fields is empty!");
    }  //else if (newFromTime < '7:00' || newToTime > '21:00'){ // Does not work
       //  alert("The specified time is not allowed!")
    //}
    else {    
        fetch('/addClass', {
            method: "POST",
            body: JSON.stringify({
                name: newClass,
                subject: newSubject,
                fromTime: newFromTime,
                toTime: newToTime,
                days: newDays
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.status === 200) {
                hideElement();
            // Does the template stuff
            /*
              var photoCardTemplate = Handlebars.templates.photoCard
              var newPhotoCardHTML = photoCardTemplate({
                url: photoURL,
                caption: caption
              })
              var photoCardContainer = document.querySelector('.photo-card-container')
              photoCardContainer.insertAdjacentHTML('beforeend', newPhotoCardHTML)*/
            } else {
                /*
              alert("An error occurred saving the photo card.")
              */
            }
          }).catch(function (err) {
            /*
            alert("An error occurred saving the photo card.")
            */
          })
    }

}

var modalAcceptButton = document.getElementById('modal-accept')
modalAcceptButton.addEventListener('click', handleModalAcceptClick)

document.getElementById("footer-button").addEventListener("click", unhideElement);

document.getElementById("modal-close").addEventListener("click", hideElement);

// document.getElementById("modal-accept").addEventListener("click", checkEmpty);


