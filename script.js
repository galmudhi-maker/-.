// ===============================
// المسابقة التفاعلية
// ===============================

const questions = [
    {
        question: "ما حكم تناول لحم الخنزير؟",
        answers: ["حلال", "حرام", "مستحب"],
        correct: 1,
        explanation: "لحم الخنزير من الأطعمة التي حرّمها الله."
    },
    {
        question: "بماذا نبدأ الطعام اقتداءً بالنبي ﷺ؟",
        answers: ["بسم الله", "الحمد لله", "السلام عليكم"],
        correct: 0,
        explanation: "نبدأ الطعام بقول بسم الله."
    },
    {
        question: "كم نوعًا من الأنهار ذُكر في سورة محمد؟",
        answers: ["نوعان", "ثلاثة", "أربعة"],
        correct: 2,
        explanation: "الماء واللبن والخمر والعسل."
    },
    {
        question: "بأي يد نأكل؟",
        answers: ["اليسرى", "اليمنى", "كلتا اليدين"],
        correct: 1,
        explanation: "من هدي النبي ﷺ الأكل باليد اليمنى."
    },
    {
        question: "ما وصف العسل المذكور في أنهار الجنة؟",
        answers: ["مصفّى", "مخلوط", "متغير"],
        correct: 0,
        explanation: "قال تعالى: وأنهار من عسل مصفّى."
    },
    {
        question: "ما السلوك الصحيح عند تناول الطعام؟",
        answers: ["الإسراف", "عيب الطعام", "الاعتدال والشكر"],
        correct: 2,
        explanation: "المسلم يعتدل في طعامه ويحمد الله على نعمه."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const numberElement = document.getElementById("question-number");
const progressFill = document.getElementById("progress-fill");
const resultElement = document.getElementById("result");

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    numberElement.textContent =
        `السؤال ${currentQuestion + 1} من ${questions.length}`;

    progressFill.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "عرض النتيجة"
        : "السؤال التالي";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const allButtons = document.querySelectorAll(".answer-btn");

    allButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === q.correct) {
            button.classList.add("correct");
        }
    });

    if (selected === q.correct) {

        score++;

        feedbackElement.textContent =
            "أحسنتِ! إجابة صحيحة 🌟";

        feedbackElement.style.color = "#4b8b5a";

    } else {

        selectedButton.classList.add("wrong");

        feedbackElement.textContent =
            "ليست الإجابة الصحيحة، " + q.explanation;

        feedbackElement.style.color = "#b45e52";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});

function showResult() {

    questionElement.textContent = "انتهت المسابقة! 🎉";

    answersElement.innerHTML = "";
    feedbackElement.textContent = "";

    progressFill.style.width = "100%";

    numberElement.textContent = "النتيجة النهائية";

    nextButton.style.display = "none";

    let message = "";

    if (score === 6) {
        message = "رائعة! حصلتِ على الدرجة الكاملة 👑";
    } else if (score >= 4) {
        message = "ممتازة! لديكِ معلومات جميلة 🌷";
    } else {
        message = "محاولة جميلة! راجعي المعلومات وحاولي مجددًا 🤍";
    }

    resultElement.hidden = false;

    resultElement.innerHTML = `
        <h3>${score} / 6</h3>
        <p>${message}</p>
        <button class="main-btn" onclick="restartQuiz()">
            إعادة المسابقة
        </button>
    `;
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    nextButton.style.display = "inline-block";
    resultElement.hidden = true;

    showQuestion();
}

showQuestion();


// ===============================
// لعبة صح أم خطأ
// ===============================

const trueFalseQuestions = [
    {
        question: "نبدأ الطعام بقول بسم الله.",
        answer: true,
        explanation: "صحيح! من آداب الطعام التسمية."
    },
    {
        question: "الإسراف في الطعام من السلوكيات المحمودة.",
        answer: false,
        explanation: "خطأ! الإسلام ينهانا عن الإسراف."
    },
    {
        question: "من أنهار الجنة نهر من عسل مصفّى.",
        answer: true,
        explanation: "صحيح! ورد ذلك في سورة محمد."
    },
    {
        question: "يجوز تناول كل مشروب حتى لو كان مسكرًا.",
        answer: false,
        explanation: "خطأ! كل مسكر حرام."
    },
    {
        question: "من هدي النبي ﷺ الأكل باليد اليمنى.",
        answer: true,
        explanation: "أحسنتِ! هذا من آداب الطعام النبوية."
    },
    {
        question: "من طعام أهل الجنة الفاكهة ولحم الطير.",
        answer: true,
        explanation: "صحيح! ورد ذلك في سورة الواقعة."
    }
];

let tfIndex = 0;
let tfAnswered = false;

function checkTF(choice) {

    if (tfAnswered) return;

    tfAnswered = true;

    const q = trueFalseQuestions[tfIndex];
    const feedback = document.getElementById("tf-feedback");

    if (choice === q.answer) {

        feedback.textContent = "إجابة صحيحة! 🌟 " + q.explanation;
        feedback.style.color = "#4b8b5a";

    } else {

        feedback.textContent = "إجابة غير صحيحة. " + q.explanation;
        feedback.style.color = "#b45e52";
    }
}

function nextTF() {

    tfIndex++;

    if (tfIndex >= trueFalseQuestions.length) {
        tfIndex = 0;
    }

    tfAnswered = false;

    document.getElementById("tf-question").textContent =
        trueFalseQuestions[tfIndex].question;

    document.getElementById("tf-feedback").textContent = "";
}


// ===============================
// زر العودة إلى أعلى الصفحة
// ===============================

const topButton = document.getElementById("top-btn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 350) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});

topButton.style.display = "none";
