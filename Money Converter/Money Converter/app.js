document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const convertBtn = document.getElementById("convertBtn");
    const resultDiv = document.getElementById("result");

    const apiKey = "376d510ceaf2e3e559f9eeeb";
    const apiUrl = `https://v6.exchangerate-api.com/v6/376d510ceaf2e3e559f9eeeb/latest/USD`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "error") {
          throw new Error(data["error-type"]);
        }
        const rates = data.conversion_rates;
        const currencies = Object.keys(rates);
  
        currencies.forEach((currency) => {
          const option1 = document.createElement("option");
          const option2 = document.createElement("option");
          option1.text = currency;
          option2.text = currency;
          fromSelect.add(option1);
          toSelect.add(option2);
        });
  
        function convertCurrency() {
          const amount = parseFloat(amountInput.value);
          const fromCurrency = fromSelect.value;
          const toCurrency = toSelect.value;
  
          if (!isNaN(amount)) {
            const convertedAmount = amount * (rates[toCurrency] / rates[fromCurrency]);
            resultDiv.textContent = `${amount.toFixed(2)} ${fromCurrency} is equivalent to ${convertedAmount.toFixed(2)} ${toCurrency}`;
          } else {
            resultDiv.textContent = "Please enter a valid amount.";
          }
        }
  
        convertBtn.addEventListener("click", convertCurrency);
      })
      .catch((error) => {
        console.error("Error fetching data from ExchangeRate-API:", error);
      });
  });
