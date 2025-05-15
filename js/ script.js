// Hakee näyttö (input kenttä)
const display = document.getElementById("display");

// Hakee kaikki laskimen napit
const buttons = document.querySelectorAll(".buttons .button");

// Hakee C-nappi (clear)
const clearButton = document.getElementById("clear");

// Tallentaa käyttäjän syötteen
let currentInput = "";

// Lisää kuuntelija kaikille napeille
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      calculate(); // Jos painetaan =, lasketaan tulos
    } else if ("+-*/".includes(value)) {
      appendOperator(value); // Jos painetaan operaattori, lisätään se
    } else {
      appendNumber(value); // Muuten lisätään numero
    }
  });
});

// Lisää kuuntelija C-napille (tyhjennys)
clearButton.addEventListener("click", clearDisplay);

// Lisää numero syötteeseen
function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

// Lisää operaattori syötteeseen
function appendOperator(operator) {
  if (currentInput === "") return; // Ei lisätä operaattoria, jos tyhjää
  const lastChar = currentInput.slice(-1);
  if ("+-*/".includes(lastChar)) {
    // Korvaa vanhan operaattorin uudella
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

// Tyhjentää näytön
function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

// Laskee syötteen ja näyttää tuloksen
function calculate() {
  try {
    if (currentInput === "") return; // Jos syöte on tyhjä, ei lasketa
    const lastChar = currentInput.slice(-1);
    if ("+-*/".includes(lastChar)) {
      // Poistaa viimeisen operaattorin jos sellainen on
      currentInput = currentInput.slice(0, -1);
    }
    const result = eval(currentInput); // Lasketaan tulos
    currentInput = result.toString(); // Muutetaan tulos merkkijonoksi
    updateDisplay();
  } catch (error) {
    display.value = "Error"; // Jos virhe, näytetään virheilmoitus
    currentInput = "";
  }
}

// Päivittää näytön sisällön
function updateDisplay() {
  display.value = currentInput;
}
