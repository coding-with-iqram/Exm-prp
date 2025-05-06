import React, { useEffect, useState } from "react";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // ইউজারে উত্তর সংরক্ষণ 

  const localquestions = [
    {
      question: "1. What does 'API' stand for in app development?",
      options: [
        "a) Application Programming Interface",
        "b) Automated Program Interaction",
        "c) App Performance Indicator",
        "d) Advanced Programming Interface",
      ],
      correctAnswer: "a) Application Programming Interface",
    },
    {
      question:
        "2. Which programming language is primarily used for Android app development?",
      options: ["a) Swift", "b) Kotlin", "c) C#", "d) Ruby"],
      correctAnswer: "b) Kotlin",
    },
    {
      question:
        "3. What is the official integrated development environment (IDE) for Android development?",
      options: [
        "a) Xcode",
        "b) Android Studio",
        "c) Visual Studio",
        "d) Eclipse",
      ],
      correctAnswer: "b) Android Studio",
    },
    {
      question:
        "4. Which framework is used for cross-platform mobile app development?",
      options: ["a) React Native", "b) Django", "c) Laravel", "d) Spring Boot"],
      correctAnswer: "a) React Native",
    },
    {
      question: "5. What does 'UI' stand for in app design?",
      options: [
        "a) User Interaction",
        "b) User Interface",
        "c) Unified Integration",
        "d) Universal Index",
      ],
      correctAnswer: "b) User Interface",
    },
    {
      question: "6. Which company developed the Flutter framework?",
      options: ["a) Facebook", "b) Google", "c) Microsoft", "d) Apple"],
      correctAnswer: "b) Google",
    },
    {
      question: "7. What is the primary language for iOS app development?",
      options: ["a) Java", "b) Kotlin", "c) Swift", "d) Python"],
      correctAnswer: "c) Swift",
    },
    {
      question: "8. What does 'MVP' stand for in app development?",
      options: [
        "a) Most Valuable Programmer",
        "b) Minimum Viable Product",
        "c) Mobile Verification Process",
        "d) Maximum Value Proposition",
      ],
      correctAnswer: "b) Minimum Viable Product",
    },
    {
      question: "9. Which database is commonly used for mobile apps?",
      options: ["a) MySQL", "b) SQLite", "c) Oracle", "d) MongoDB"],
      correctAnswer: "b) SQLite",
    },
    {
      question:
        "10. What is the process of finding and fixing errors in code called?",
      options: ["a) Compiling", "b) Debugging", "c) Deploying", "d) Indexing"],
      correctAnswer: "b) Debugging",
    },
  ];

  useEffect(() => {
    fetch("https://exam-preparation.glitch.me/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Could not fetch questions from server. Using local questions.");
        console.warn("Using fallback questions.", localquestions);
        setQuestions(localquestions);
        setIsLoading(false);
      });
  }, []);

  
  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = 
      selectedAnswer.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
      if(isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

     setAnswers((prevAnswers) => [
       ...prevAnswers,
       {
         question: currentQ.question,
         selected: selectedAnswer,
         correct: currentQ.correctAnswer,
       },
     ]);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]); // উত্তরগুলো ক্লিয়ার করা হচ্ছে
  };

  if (isLoading || questions.length === 0) { 
    return <div>Loading quiz questions...</div>;
  }
  
  return (
    <div
      className="quiz"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {showScore ? (
        <div
          className="score-section"
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h2>
            Your Score: {score} out of {questions.length} (
            {((score / questions.length) * 100).toFixed(0)}%)
          </h2>

          <h3> Correct & Incorrect Answers: </h3>
          <ul style={{ textAlign: "left" }}>
            {answers.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px"}}>
                <strong>{item.question}</strong>
                <br />
                {item.selected === item.correct ? (
                  <span style={{ color: "green" }}>
                    You answered: {item.selected} (Correct!)
                  </span>  
                ) : (
                  <span style={{ color: "red" }}>
                    You answered: {item.selected} | Correct Answer: {item.correct}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={restartQuiz}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div
          className="question-section"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            className="question-count"
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              color: "#6c757d",
            }}
          >
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div
            className="question-text"
            style={{
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {questions[currentQuestion].question}
          </div>
          <div
            className="answer-section"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
