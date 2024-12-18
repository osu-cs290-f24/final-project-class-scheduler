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
    document.getElementById("class-to-time-input").value = "";
    document.getElementById("class-from-time-input").value = "";
    document.getElementById("input-days-monday").checked = false;
    document.getElementById("input-days-tuesday").checked = false;
    document.getElementById("input-days-wednesday").checked = false;
    document.getElementById("input-days-thursday").checked = false;
    document.getElementById("input-days-friday").checked = false;
}

var timeToRowMapping = {
    '07': 0, '08': 1, '09': 2, '10': 3, '11': 4, '12': 5,
    '13': 6, '14': 7, '15': 8, '16': 9, '17': 10, '18': 11,
    '19': 12, '20': 13, '21': 14
};

var daysToColumnMapping = {
    'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4
}


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
    
        // Difference of times, via stackOverflow
        let startTime = new Date().toDateString("yyyy-MM-dd") + " " + newFromTime;
        let endTime = new Date().toDateString("yyyy-MM-dd") + " " + newToTime;
        let diff = (new Date(endTime) - new Date(startTime)) / 60/ 60 / 1000;

    if (!newClass || !newSubject || !newFromTime || ! newToTime || newDays[0] == null) {
        alert("One or more required fields is empty!");
    } 
    // Ensure the class is between 7:00 AM and 8:00 PM
    else if((newFromTime < "07:00" || newFromTime > "18:00") || (newToTime < "08:00" || newToTime > "20:00")){
        alert("Classes must be between 7:00 AM and 8:00 PM");
    }
    else if(diff < 1){
        alert("Classes must be at least an hour long");
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
                location.reload();
            } else {
                alert("An error occurred saving the class.")
            }
          }).catch(function (err) {
            alert("An error occurred saving the class.")
        })
    }
}

function filter(){
    var classElems = document.getElementsByClassName('class-box')

    for (var i = 0; i < classElems.length; i++) {
        classElems[i].classList.remove("hidden");
    }

    var filterName = document.getElementById("filter-name").value.toLowerCase();
    var filterSubject = document.getElementById("filter-subject").value.toLowerCase();

    for (var i = 0; i < classElems.length; i++) {
        var className = classElems[i].querySelector('.class-name').textContent.toLowerCase()
        var classSubject = classElems[i].querySelector('.class-subject').textContent.toLowerCase()
        if ((className != filterName && filterName.length > 0)
            || (classSubject != filterSubject && filterSubject.length > 0)){
            classElems[i].classList.add("hidden");
        } else if (filterName == "" && filterSubject == ""){
            classElems[i].classList.remove("hidden");
        }
    }
}

function removeClass(removeClassButton){
    var classBox = removeClassButton.closest('.class-box')
    
    // Get the name or other identifier of the class to be deleted
    var className = classBox.querySelector('.class-name').textContent;

    // Select all class-box elements
    var allClassBoxes = document.querySelectorAll('.class-box');

    // Send a DELETE request to the server to remove the class
    fetch('/deleteClass', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: className }) // Send the class name to identify the class to remove
        })
    .then(response => {
        if (response.status === 200) {
            allClassBoxes.forEach(function(box) {
                // If the name of the class matches, remove it
                var boxName = box.querySelector('.class-name').textContent;
                if (boxName === className) {
                    box.remove(); // Remove this classBox from the DOM
                }
            });
        } else {
            console.error("Error deleting class");
        }
    })
    .catch(error => {
        console.error("Network error:", error);
    });

    
}



function positionClass(classElement, fromTime, toTime, day) {
    // Map the time to row (you'll need to ensure the time format matches)
    var startRow = timeToRowMapping[fromTime];
    var endRow = timeToRowMapping[toTime];

    // Get the column index for the day
    var columnIndex = daysToColumnMapping[day.toLowerCase()];

  //  const rowHeight = document.getElementById('tuesday-16').clientHeight;
  const rowHeight = 27.78;
    console.log(document.getElementById('tuesday-16'));
    
    const dayColumnTop = document.getElementById("hourMonday").offsetTop;


        console.log("HEIGHT:", rowHeight);
   // Calculate height and top position dynamically
   //var rowHeight = 50; // Adjust this to match your CSS height of rows
   var topPosition = dayColumnTop + (startRow * rowHeight) + 10;


   var classHeight =  rowHeight * (endRow - startRow);
   console.log("end:", endRow);
   console.log("Sttaert: ", startRow);
   console.log("classHeight: ", classHeight);


   // Apply styles to position the element
   classElement.style.top = `${topPosition}px`;
   classElement.style.height = `${classHeight}px`;

   if(endRow - startRow == 1){

   }
}

var modalAcceptButton = document.getElementById('modal-accept')
modalAcceptButton.addEventListener('click', handleModalAcceptClick)

document.getElementById("footer-button").addEventListener("click", unhideElement);

document.getElementById("modal-close").addEventListener("click", hideElement);

document.getElementById("filter-update-button").addEventListener("click", filter);


window.onload = function() {
    var allClassElements = document.querySelectorAll('.class-box');  // Select all class boxes

    // Loop through each class box and call positionClass
    allClassElements.forEach(function(classElement) {
        classElement.classList.add("hidden");

        var days = classElement.dataset.days.split(',');

        days.forEach(day => {
            var newClassElement = classElement.cloneNode(true); // Clone the class element
            newClassElement.classList.remove("hidden")

            document.querySelector(`#${day}`).appendChild(newClassElement);

            // Now position the class element
            var fromTime = newClassElement.dataset.from;
            var fromHour = fromTime.split(':')[0]
            var toTime = newClassElement.dataset.to;
            var toHour = toTime.split(':')[0]
            
            var removeClassButtons = document.querySelectorAll('.remove-class-btn');
            removeClassButtons.forEach(function(removeClassButton) {
                removeClassButton.addEventListener("click", function() {
                    removeClass(removeClassButton)
                })
            })
            positionClass(newClassElement, fromHour, toHour, day);
        })

        classElement.remove();
    });
};