`use strict`;

let questionNumber = 1;

let score = 0;

//starts the quiz when start button is clicked
function startQuiz() {
  $(".quizStart").on("click", "#start-button", event => {
    $(".quizStart").hide();
    $(".question").text(1);
    renderQuiz();
    console.log("quizStart ran");
  });
}
//generate the questions for the quiz
function generateQuiz() {
  if (questionNumber < DATA.length + 1) {
    $('body').addClass('opac');
    return `
  <form role ="question-form">
    <fieldset>
      <legend>${DATA[questionNumber -1].question}</legend>
      
      <div class ="quizContents">
        <label class="answerOption">
        <input type="radio" value="${DATA[questionNumber-1].answers[0]}" name="answer" required>
        <span>${DATA[questionNumber-1].answers[0]}</span>
        </label>
        
        <label class="answerOption">
          <input type="radio" value="${DATA[questionNumber-1].answers[1]}" name="answer" required>
          <span>${DATA[questionNumber-1].answers[1]}</span>
        </label>
        
        <label class="answerOption">
          <input type="radio" value="${DATA[questionNumber-1].answers[2]}" name="answer" required>
          <span>${DATA[questionNumber-1].answers[2]}</span>
        </label>
        
        <label class="answerOption">
          <input type="radio" value="${DATA[questionNumber-1].answers[3]}" name="answer" required>
          <span>${DATA[questionNumber-1].answers[3]}</span>
        </label>
      </div>
      
      <button type="submit" class='submitButton'>Submit</button>
    </fieldset>
  </form>
  `;
  }
}
//what happens when you submit your answer
function submitOption() {
  $(".quizQuestions").on("submit","form", event => {
    event.preventDefault();
    answer = $("input:checked").val();
    correct = `${DATA[questionNumber - 1].correctAnswer}`;

    //check answer
    if (answer === correct) {
      ifRight();
      updateScore();
    } else {
      ifWrong();
    }

    console.log("submitOption ran");
  });
}
//if the user is right
function ifRight() {
  $("body").removeClass("opac");
  $(".quizQuestions").html(`
  <section role ="right-feedback-page">
    <div class ="feedback">
      <h1>Nice!!<i class="em em---1" alt="thumbs up emoji"></i><h1>
      <img src="https://media.giphy.com/media/1dLOe2mutCAhEX9pDw/giphy.gif" alt ="iron man" class="gif">
      </div>
      <button type="button" id=next-button>Next</button>
  </section>
  `);
  console.log("ifRight ran");
}
// if user is wrong
function ifWrong() {
  $("body").removeClass("opac");
  correct = `${DATA[questionNumber - 1].correctAnswer}`;
  $(".quizQuestions").html(`
  <section role ="wrong-feedback-page">
    <div class ="feedback">
      <h1>Nope!!<i class="em em--1" alt="thumbs down emoji"></i><h1>
      <p>The correct answer is ${DATA[questionNumber - 1].correctAnswer}</p>
      <img src="https://media.giphy.com/media/X7Z4lDnPqcF0dyY2dX/giphy.gif" alt ="thanos" class="gif">
      </div>
      <button type="button" id=next-button>Next</button>
  </section>
  `);
  console.log("ifWrong ran");
}
//go to next question
function nextQuestion() {
  $(".quizQuestions").on("click", "#next-button", event => {
    changeQuestionNumber();
    if (questionNumber <= 10) {
      renderQuiz();
      console.log("else ran");
    } else {
      results();
      console.log("if ran");
    }
  });
}
//update the score if user is right
function updateScore() {
  changeScore();
  $(".score").text(score);
}
//change the score
function changeScore() {
  score++;
}
//change the question number
function changeQuestionNumber() {
  questionNumber++;
  if (questionNumber <= 10) {
    $(".question").text(questionNumber);
  }
}
//view results
function results() {
  console.log("results" + score);
  if (score >= 8) {
    $(".quizQuestions").html(`
    <section role="results-page">
      <div class =results>
        <h1><i class="em em-clap" alt="clap emoji"></i></h1>
        <img src="https://media.giphy.com/media/39DgbczxByiPQ3Eweq/giphy.gif" alt='thanos2' class="gif">
        <p>Your score is ${score}!</p>
      </div>

    
    <button id="restart-button">Play Again?</button>
</section>
    `);
  } else if (score <= 7 && score >= 4) {
    $(".quizQuestions").html(`
    <section role="results-page">
      <div class =results>
        <h1><i class="em em-smiley" alt="smile emoji"></i></h1>
        <img src="https://media.giphy.com/media/pNTxtmpDVOLToFpoDp/giphy.gif" alt='black panther ready for battle' class="gif">
        <p>Your score is ${score}!</p>
      </div>
    
    
    <button id="restart-button">Play Again?</button>
</section>
    `);
  } else {
    $(".quizQuestions").html(`
    <section role="results-page">
      <div class =results>
        <h1><i class="em em-dizzy_face" alt="dizzy face"></i></h1>
        <img src="https://media.giphy.com/media/3o6fIQbDFtkc4wprIQ/giphy.gif" alt='black panther scene' class="gif">
        <p>Your score is ${score}!</p>
      </div>

    
    <button type="reset" id="restart-button">Play Again?</button>
</section>
    `);
  }
  console.log("results ran");
}
//restart quiz
function restartQuiz() {
  $('.quizQuestions').on('click', '#restart-button', (event) => {
    
    questionNumber  = 1;
    score = 0;
    renderQuiz();
    $('.question').text(1);
    $('.score').text(0);

    console.log('restart quiz ran');
  });
}
//render the quiz in the DOM
function renderQuiz() {
  $(".quizQuestions").html(generateQuiz);
}
//activate quiz
function activateQuiz() {
  startQuiz();
  submitOption();
  nextQuestion();
  restartQuiz();
}
$(activateQuiz);
