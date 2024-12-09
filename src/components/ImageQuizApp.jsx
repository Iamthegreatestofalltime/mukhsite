"use client";

import React, { useState } from "react";

const ImageQuizApp = () => {
  const [stage, setStage] = useState("start");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const imageUrl =
    "https://uploads4.wikiart.org/images/henri-rousseau/village-near-a-factory-1908.jpg!Large.jpg";

  const questions = [
    {
      question: "What color was the fence?",
      type: "radio",
      options: ["White", "Red", "Dark Gray", "Brown"],
    },
    {
      question: "What colors were the roofs of the house?",
      type: "checkbox",
      options: ["Red", "Gray", "Black", "Green", "White"],
    },
    {
      question: "There are visible hills in the background.",
      type: "radio",
      options: ["True", "False"],
    },
    {
      question: "The clouds are obstructing the sun.",
      type: "radio",
      options: ["True", "False"],
    },
    {
      question: "How many people are on the boat in the back?",
      type: "radio",
      options: ["2", "3", "1", "0"],
    },
    {
      question: "Which objects have shadows?",
      type: "radio",
      options: ["The woman", "The houses", "The boats", "No objects"],
    },
    {
      question: "Which object is the tallest?",
      type: "radio",
      options: ["The houses", "The trees", "The chimney", "The fence"],
    },
    {
      question: "How many trees are on the left-hand side of the painting?",
      type: "radio",
      options: ["4", "5", "6", "7"],
    },
    {
      question: "What are the colors of the front boat?",
      type: "checkbox",
      options: ["Black", "Brown", "Red", "White", "Green"],
    },
    {
      question: "There are reflections in the water.",
      type: "radio",
      options: ["True", "False"],
    },
  ];

  const handleStart = () => {
    setStage("image");
    setTimeout(() => {
      setStage("quiz");
    }, 5000);
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleCheckboxChange = (index, value) => {
    setAnswers((prev) => {
      const currentAnswers = prev[index] || [];
      return {
        ...prev,
        [index]: currentAnswers.includes(value)
          ? currentAnswers.filter((ans) => ans !== value)
          : [...currentAnswers, value],
      };
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting data...");
      const response = await fetch('/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
  
      const data = await response.json();
      console.log('Submission Success:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to submit your answers. Please try again.');
    }
  };
  
  const handleReset = () => {
    setStage("start");
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-300 p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Image Quiz Challenge
        </h2>
        {stage === "start" && (
          <div className="text-center">
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Start Quiz
            </button>
          </div>
        )}

        {stage === "image" && (
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt="Quiz Visual"
              className="rounded-lg max-w-full h-auto shadow-md"
            />
          </div>
        )}

        {stage === "quiz" && !submitted && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6"
          >
            {questions.map((q, index) => (
              <div key={index} className="mb-6">
                <p className="font-medium text-gray-800 mb-3">{q.question}</p>
                {q.type === "radio" &&
                  q.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 mb-2 text-gray-700"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        className="form-radio text-blue-600"
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                {q.type === "checkbox" &&
                  q.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 mb-2 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        className="form-checkbox text-blue-600"
                        onChange={(e) =>
                          handleCheckboxChange(index, e.target.value)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
              </div>
            ))}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Quiz Submitted!
            </h3>
            <p className="text-gray-700">Your answers have been recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageQuizApp;