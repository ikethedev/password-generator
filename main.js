const input = document.querySelector(".range_slider");
const symbol = document.querySelector("#symbol");
const uppercaseLetter = document.querySelector("#uppercase");
const lowercaseLetter = document.querySelector("#lowercase");
const number = document.querySelector("#numbers");
const strength = document.querySelector(".uppercase");
const slider = document.querySelector("#range_slider");
let possibleCharacters = [];
let count = 0;
let passwordLength;

const incrementCount = () => {
  count++;
  passwordStrengthCount();
};

const decrementCount = () => {
  count--;
  passwordStrengthCount();
};

const uppercaseLettersArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const symbolsArr = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "|",
  ";",
  ":",
  '"',
  ",",
  ".",
  "<",
  ">",
  "?",
  "/",
  "~",
  "`",
];

const lowercaseLettersArr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Change password length
const changePasswordLength = () => {
  let val = input.value;
  passwordLength = val;
  generatePassword(val);
};

// active password length and update text
const generatePassword = (numOfCharacters) => {
  let newPassword = [];
  for (let i = 1; i <= numOfCharacters; i++) {
    let randanIndex = Math.floor(Math.random() * possibleCharacters.length);
    newPassword.push(possibleCharacters[randanIndex]);
    // can be pulled out to do somewhere else
    document.querySelector(".number").textContent = numOfCharacters;
  }
   
  return newPassword.join("");
};

// I need to add to the count every time checkbox is clicked
// count controls the strength level
const strengthMap = {
  1: {
    text: "Too Weak!",
    colors: ["red", "transparent", "transparent", "transparent"],
  },
  2: {
    text: "Weak!",
    colors: ["orange", "orange", "transparent", "transparent"],
  },
  3: {
    text: "Medium",
    colors: ["yellow", "yellow", "yellow", "transparent"],
  },
  4: { text: "Strong", colors: ["green", "green", "green", "green"] },
};

const boxOne = document.querySelector("#box__one");
const boxTwo = document.querySelector("#box__two");
const boxThree = document.querySelector("#box__three");
const boxFour = document.querySelector("#box__four");

const passwordStrengthCount = () => {
  if (strengthMap[count]) {
    strength.textContent = strengthMap[count].text;
    const [color1, color2, color3, color4] = strengthMap[count].colors;
    boxOne.style.backgroundColor = color1;
    boxTwo.style.backgroundColor = color2;
    boxThree.style.backgroundColor = color3;
    boxFour.style.backgroundColor = color4;
  }
};


const updateCharacterSet = (isChecked, characterArray) => {
  if (isChecked) {
    possibleCharacters = possibleCharacters.concat(characterArray);
    incrementCount();
  } else {
    possibleCharacters = possibleCharacters.filter(
      (char) => !characterArray.includes(char)
    );
    decrementCount();
  }
  generatePassword(passwordLength);
};

// concat is favored here because it doesnt modidify the existing array
const addSymbols = () => updateCharacterSet(symbol.checked, symbolsArr);

const addNumbers = () => updateCharacterSet(numbers.checked, numbersArr);

const addUpperCaseLetters = () => updateCharacterSet(uppercaseLetter.checked, uppercaseLettersArr);

const addLowerCaseLetters = () => updateCharacterSet(lowercaseLetter.checked, lowercaseLettersArr);

// generate password
const showGeneratedPassword = (e) => {
  e.preventDefault();
  document.querySelector(".password").value = generatePassword(passwordLength);
};

const copyText = () => {
  const copyText = document.querySelector(".password");
  copyText.select();
  navigator.clipboard.writeText(copyText.textContent);
  document.querySelector(".copied_message").classList.toggle("hide");
};



input.addEventListener("change", changePasswordLength);
symbol.addEventListener("click", addSymbols);
lowercaseLetter.addEventListener("click", addLowerCaseLetters);
uppercaseLetter.addEventListener("click", addUpperCaseLetters);
number.addEventListener("click", addNumbers);
document
  .querySelector("button")
  .addEventListener("click", showGeneratedPassword);
document.querySelector(".icon").addEventListener("click", copyText);
slider.addEventListener("input", () => {
  document.querySelector("#progress__bar").style.width = slider.value * 5 + "%";
})
