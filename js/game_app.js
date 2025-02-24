// =====================
// QUIZ APP LOGIC
// =====================

// Initialize the Quiz App on window load
window.onload = sendApiRequest;

// Function to send API request to fetch quiz questions
async function sendApiRequest() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple"
  );
  const data = await response.json();
  quizApp(data.results[0]);
}

// Function to shuffle the answers array
Array.prototype.shuffle = function () {
  let i = this.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
  return this;
};

// Function to initialize the quiz with data from API
function quizApp({
  correct_answer,
  incorrect_answers,
  category,
  difficulty,
  question,
}) {
  const answers = [correct_answer, ...incorrect_answers].shuffle();
  const buttons = Array.from(document.querySelectorAll(".button"));

  document.querySelector("#category").innerHTML = `Category: ${category}`;
  document.querySelector("#difficulty").innerHTML = `Difficulty: ${difficulty}`;
  document.querySelector("#question").innerHTML = `Question: ${question}`;

  buttons.forEach((button, index) => {
    button.innerHTML = answers[index];
    button.onclick = () => compareAnswer(answers[index], correct_answer);
  });
}

// Function to compare selected answer with the correct answer
function compareAnswer(selectedAnswer, correctAnswer) {
  const isCorrect = selectedAnswer === correctAnswer;
  const message = isCorrect
    ? "Correct! YOU ARE SO SMART!"
    : `You are so Wrong! The Correct Answer is ${correctAnswer}`;
  showMessage(message, isCorrect);
}

// Function to show the result in the result box
function showMessage(message, isCorrect) {
  const resultBox = document.getElementById("resultBox");
  resultBox.className = isCorrect ? "result-box success" : "result-box error";
  resultBox.innerHTML = message;
  resultBox.style.display = "block";
  
  setTimeout(() => {
    resultBox.style.display = "none"; // Hide the message after a few seconds
    sendApiRequest(); // Fetch a new question without reloading the page
  }, 3000); // Adjust the timeout duration as needed
}

// =====================
// END OF QUIZ APP LOGIC
// =====================


// ===========================
// REVERSE A STRING LOGIC
// ===========================

// Form submission event listener
const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let text = document.getElementById("inputText").value;
  let newText = ReverseString(text);
  document.querySelector("#reversedString").innerHTML = newText;
  console.log("Form has been submitted");
  console.log(newText);
});

// Function to reverse a given string
function ReverseString(anyString) {
  const newString = anyString.split("").reverse().join("");
  return newString;
}

// ============================
// END OF REVERSE A STRING LOGIC
// ============================


// ============================
// AGE CALCULATION LOGIC
// ============================

// Function to calculate age based on birthdate
function calculateAge(birthdate) {
  const birthdateObj = new Date(birthdate);
  const currentDate = new Date();

  const age = currentDate.getFullYear() - birthdateObj.getFullYear();

  if (currentDate.getMonth() < birthdateObj.getMonth() || (currentDate.getMonth() === birthdateObj.getMonth() && currentDate.getDate() < birthdateObj.getDate())) {
    return age - 1;
  }

  return age;
}

// Update the age element
const ageElement = document.getElementById('age');
ageElement.textContent = calculateAge('07/18/1990');

// ============================
// END OF AGE CALCULATION LOGIC
// ============================
