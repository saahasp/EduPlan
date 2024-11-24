document.addEventListener("DOMContentLoaded", function () {
  var classes = [
    // Princess Anne High School AP Classes
    "AP English Language",
    "AP English Literature",
    "AP World History",
    "AP US History",
    "AP Government",
    "AP Psychology",
    "AP Calculus AB",
    "AP Calculus BC",
    "AP Statistics",
    "AP Biology",
    "AP Chemistry",
    "AP Physics 1",
    "AP Physics 2",
    "AP Computer Science A",
    "AP Spanish Language",
    "AP French Language",
    "AP Latin",

    // Princess Anne High School IB (MYP and DP) Classes
    "IB English Language",
    "IB English Literature",
    "IB History",
    "IB Psychology",
    "IB Math Analysis and Approaches",
    "IB Math Applications and Interpretations",
    "IB Computer Science",
    "IB Design Technology",
    "IB Business Management",
    "IB Spanish Language",
    "IB French Language",
    "IB Latin",
    "IB Music",
    "IB Theatre Arts",
    "IB Visual Arts",
    "IB Dance",
    "IB Film",

    // Virtual Virginia Courses
    "AP Art History (Virtual Virginia)",
    "AP Environmental Science (Virtual Virginia)",
    "AP Human Geography (Virtual Virginia)",
    "AP Statistics (Virtual Virginia)",
    "AP Microeconomics (Virtual Virginia)",
    "AP Macroeconomics (Virtual Virginia)",
    "AP Seminar (Virtual Virginia)",
    "AP Research (Virtual Virginia)",
    "AP Music Theory (Virtual Virginia)",
    "AP World Languages (various options) (Virtual Virginia)",
    "Economics and Personal Finance (Virtual Virginia)",
    "Introduction to Cybersecurity (Virtual Virginia)",
    "Computer Programming (Virtual Virginia)",
    "Digital Media Arts (Virtual Virginia)",
    "Journalism (Virtual Virginia)",
    "Creative Writing (Virtual Virginia)",
    "Health & Physical Education (Virtual Virginia)",
    "Astronomy (Virtual Virginia)",
    "Psychology (Virtual Virginia)",
    "Sociology (Virtual Virginia)",
    "World Religions (Virtual Virginia)",
    "Introduction to Philosophy (Virtual Virginia)",
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
    const devPassword = prompt("Enter school code to continue:");
    if (devPassword === "408362") {
      window.location.href = "schedule.html";
    } else {
      if (form.checkValidity()) {
        form.submit();
      } else {
        alert(
          "Please fill out all required fields or enter the correct school code."
        );
      }
    }
  });
});
