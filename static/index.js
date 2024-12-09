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
    var newFromTime = document.getElementById("class-from-time-input").value; 
    var newToTime = document.getElementById("class-to-time-input").value; 
    var newDays = [];
    var daysField = [];
    daysField = document.querySelectorAll('[name="input-days"]');

    for(var i=0; i < daysField.length; i++){
        if(daysField[i].checked){
            newDays.push(daysField[i].value);
        }
    }
    
    // Ensure the class isn't at another time as another class 
    var collidingTimes = false;

    /*
    for(var i = 0; i < newDays.length; i++){
        for(var j = 0; j < classData.length; j++){
            for(var k = 0; k < classData[j].days.length; k++){
                if(newDays[i] == classData[j].days[k]){
                    if((newFromTime < classData[j].fromTime && newToTime > classData[j].fromTimeTime) 
                        || (classData[j].fromTime < newFromTime && classData[j].toTime > newFromTime)){
                        collidingTimes = true;
                        break;
                    }
                }
            }
        }
    }*/

    if (!newClass || !newSubject || !newFromTime || ! newToTime || newDays[0] == null) {
        alert("One or more required fields is empty!");
    } 
    // Ensure the class is between 7:00 AM and 8:00 PM
    else if((newFromTime < "07:00" || newFromTime > "18:00") || (newToTime < "08:00" || newToTime > "20:00")){
        alert("Classes must be between 7:00 AM and 8:00 PM");
    }
    // Ensure the class isn't at another time as another class 
    else if(collidingTimes){
        alert("Class time collides with another class!");
    }
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