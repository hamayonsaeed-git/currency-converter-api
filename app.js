const BASE_URL = "https://open.er-api.com/v6/latest";




const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('button');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
 const msg = document.querySelector('.msg');

// Populate dropdowns with currency codes and set default selections


for (let select of dropdowns) {
  for (currcode in countryList) {
    let option = document.createElement('option');
    option.value = currcode;
    option.innerText = currcode;

    if (select.id === 'from' && currcode === 'USD') {
      option.selected = "true";
    }
    else if (select.id === 'to' && currcode === 'PKR') {
      option.selected = "true";
    }
    select.appendChild(option);
  
}
select.addEventListener('change', (evt) => {
  updateFlag(evt.target);
});
}

function updateFlag(selectElement) {
  for (const code in countryList) {
    if (code === selectElement.value) {
      const imgTag = selectElement.parentElement.querySelector('img');
      imgTag.src = `https://flagcdn.com/48x36/${countryList[code].toLowerCase()}.png`;
    }
  }
}

// ...existing code...
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const amount = document.querySelector('.amount input');
  const amtValue = amount.value;
  
  if (amtValue === "" || amtValue === "0") {
    alert("Please enter a valid amount");
    return;
  }
  console.log("from currency:", fromCurrency.value);
  console.log("to currency:", toCurrency.value);
  console.log("amount:", amtValue);
  let from = fromCurrency.value;
   let to = toCurrency.value;

   let url = `${BASE_URL}/${from}`;
   let response = await fetch(url);
   let data = await response.json();
   
   const rate = data.rates[to];
  const finalAmount = amtValue * rate;

  console.log("Rate:", rate);
  console.log("Converted:", finalAmount);

  
  msg.innerText =
    `${amtValue} ${from} = ${finalAmount.toFixed(2)} ${to}`;
    msg.style.backgroundColor = "black";

});
