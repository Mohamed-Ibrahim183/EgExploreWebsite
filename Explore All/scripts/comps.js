function setupDropdown(wrapperClassName, countries) {
  const wrapper = document.querySelector(`.${wrapperClassName}`);
  const selectBtn = wrapper.querySelector(".select-btn");
  const searchInp = wrapper.querySelector("input");
  const options = wrapper.querySelector(".options");

  function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach((country) => {
      let isSelected = country === selectedCountry ? "selected" : "";
      let li = `<li class="${isSelected}">${country}</li>`;
      options.insertAdjacentHTML("beforeend", li);
    });
  }
  addCountry();

  function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
  }

  options.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      updateName(event.target);
    }
  });

  searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries
      .filter((data) => {
        return data.toLowerCase().startsWith(searchWord);
      })
      .map((data) => {
        let isSelected =
          data === selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li class="${isSelected}">${data}</li>`;
      })
      .join("");
    options.innerHTML = arr
      ? arr
      : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
  });

  selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
}

const countriesSet1 = [
  "Cairo",
  "Luxor",
  "Giza",
  "6th October",
  "Aswan",
  "Alexandria",
  // Add countries for dropdown 1 here
];

const countriesSet2 = [
  "Pharaonic",
  "Islamic",
  "Coptic",
  "entertainment",
  "museums",
  // Add countries for dropdown 2 here
];

setupDropdown("select1", countriesSet1);
setupDropdown("select2", countriesSet2);

// --------------------------- START PRICE RANGE -----------------------------------
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
