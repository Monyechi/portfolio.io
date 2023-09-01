window.onload = sendApiRequest;

async function sendApiRequest() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple"
  );
  const data = await response.json();
  quizApp(data.results[0]);
}

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
    button.addEventListener("click", () =>
      compareAnswer(answers[index], correct_answer)
    );
  });
}

function compareAnswer(selectedAnswer, correctAnswer) {
  const message =
    selectedAnswer === correctAnswer
      ? "Correct! YOU ARE SO SMART!"
      : `You are so Wrong! The Correct Answer is ${correctAnswer}`;
  alert(message);
  location.reload();
}
const myForm = document.getElementById("myForm");
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let text = document.getElementById("inputText").value;
  let newText = ReverseString(text);
  document.querySelector("#reversedString").innerHTML = newText;
  console.log("Form has been submitted");
  console.log(newText);
});

function ReverseString(anyString) {
  const newString = anyString.split("").reverse().join("");

  return newString;
}
// Calculate age based on birthdate
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
