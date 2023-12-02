let allBtn = document.querySelectorAll(".control");
let sections = document.querySelectorAll(".section");
let theme = document.querySelector(".theme-btn");
let headAndF = document.querySelectorAll(".page1");

allBtn.forEach((ele) => {
  ele.addEventListener("click", function () {
    // Remove active class from all buttons
    allBtn.forEach((ele1) => {
      ele1.classList.remove("active-btn");
    });

    // Add active class to the clicked button
    ele.classList.add("active-btn");
    if (ele.getAttribute("data-id") != "home") {
      headAndF.forEach((e) => {
        e.style.display = "none";
      });
    }
    if (ele.getAttribute("data-id") == "home") {
      headAndF.forEach((e) => {
        e.style.display = "block";
      });
    }

    // Remove active class from all sections
    sections.forEach((sec) => {
      sec.classList.remove("active-sec");

      // Compare the data-id of the section with the clicked button
      if (sec.id === ele.getAttribute("data-id")) {
        sec.classList.add("active-sec");
      }
    });
  });
});
theme.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
