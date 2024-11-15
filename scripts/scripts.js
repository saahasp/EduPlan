document.addEventListener("DOMContentLoaded", function () {
  var classes = [
    "apenglishlanguage",
    "apenglishliterature",
    "ibenglishlanguage",
    "ibenglishliterature",
    "apworldhistory",
    "apushistory",
    "ibhistory",
    "apgovernment",
    "appsychology",
    "ibpsychology",
    "apcalculus",
    "apstatistics",
    "ibmath",
    "apbiology",
    "apchemistry",
    "apphysics",
    "apcomputer",
    "ibcomputer",
    "ibdesign",
    "ibbusiness",
    "apspanish",
    "ibspanish",
    "apfrench",
    "ibfrench",
    "aplatin",
    "iblatin",
    "ibmusic",
    "ibtheatre",
    "ibart",
    "ibdance",
    "ibfilm",
    "ibvisualarts",
  ];
  var list = document.getElementById("classes-list");
  var selectedClassesList = document.getElementById("selected-classes");
  classes.forEach(function (className) {
    var option = document.createElement("li");
    option.textContent = className;
    option.onclick = function () {
      addClassToSelected(className);
    };
    list.appendChild(option);
  });
  function addClassToSelected(className) {
    if (
      [...selectedClassesList.children].some(
        (item) => item.textContent === className
      )
    ) {
      return;
    }
    var selectedItem = document.createElement("li");
    selectedItem.textContent = className;
    selectedItem.onclick = function () {
      selectedClassesList.removeChild(selectedItem);
    };
    selectedClassesList.appendChild(selectedItem);
  }
  document
    .getElementById("classes-search")
    .addEventListener("keyup", function () {
      var filter = this.value.toUpperCase();
      var options = list.getElementsByTagName("li");
      for (var i = 0; i < options.length; i++) {
        var txtValue = options[i].textContent || options[i].innerText;
        options[i].style.display = txtValue.toUpperCase().includes(filter)
          ? ""
          : "none";
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("eduplan-form");
  const submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const devPassword = prompt("Enter developer password to override:");
    if (devPassword === "408362") {
      window.location.href = "schedule.html";
    } else {
      if (form.checkValidity()) {
        form.submit();
      } else {
        alert(
          "Please fill out all required fields or enter the correct developer password."
        );
      }
    }
  });
});
