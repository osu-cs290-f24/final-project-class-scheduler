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

function checkEmpty(){
    var name = document.getElementById("class-name-input").value;
    var subject = document.getElementById("class-subject-input").value;
    var to_time = document.getElementById("class-to-time-input").value;
    var from_time = document.getElementById("class-from-time-input").value;
    var monday = document.getElementById("input-days-monday").checked;
    var tuesday = document.getElementById("input-days-tuesday").checked;
    var wednesday = document.getElementById("input-days-wednesday").checked;
    var thursday = document.getElementById("input-days-thursday").checked;
    var friday = document.getElementById("input-days-friday").checked;

    if (name == "" || subject == "" || to_time == undefined || from_time == undefined
        || (!monday && !tuesday && !wednesday && !thursday && !friday)){
            alert("One or more required fields is empty!");
    } else {
        
    }
}


document.getElementById("footer-button").addEventListener("click", unhideElement);

document.getElementById("modal-close").addEventListener("click", hideElement);

document.getElementById("modal-accept").addEventListener("click", checkEmpty);
