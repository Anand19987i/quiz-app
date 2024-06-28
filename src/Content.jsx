import React, { Component } from 'react';
import './Data/index';
import { QuizData } from './Data/index';

export default class Content extends Component {
    state = {
        userAnswer: null,
        currentIndex: 0,
        options: [],
        quizEnd: false,
        score: 0,
        disabled: true,
    };

    loadQuiz = () => {
        const { currentIndex } = this.state;
        this.setState({
            question: QuizData[currentIndex].question,
            options: QuizData[currentIndex].options,
            answer: QuizData[currentIndex].answer,
        });
    };

    nextQuestionHandler = () => {
        const { userAnswer, answer, score, currentIndex } = this.state;

        // Update score if the answer is correct
        if (userAnswer === answer) {
            this.setState({
                score: score + 1,
            });
        }

        // Advance to the next question
        this.setState(
            {
                currentIndex: currentIndex + 1,
                userAnswer: null,
                disabled: true,
            },
            () => {
                // Check if the quiz has ended
                if (this.state.currentIndex === QuizData.length) {
                    this.setState({ quizEnd: true });
                } else {
                    // Load the next question
                    this.loadQuiz();
                }
            }
        );
    };

    componentDidMount() {
        this.loadQuiz();
    }

    checkAnswer = (answer) => {
        this.setState({
            userAnswer: answer,
            disabled: false,
        });
    };

    finishHandler = () => {
        this.setState({ quizEnd: true });
    };

    render() {
        const { question, options, currentIndex, userAnswer, quizEnd, score } = this.state;

        if (quizEnd) {
            return (
                <div className="container mx-auto p-4">
                    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                        <h1 className="text-2xl font-bold mb-4">
                            Game Over. Final score is {score}
                        </h1>
                        <p className="mb-4">The correct Answers for the quiz are:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            {QuizData.map((item, index) => (
                                <li key={index}>{item.answer}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">{question}</h2>
                    <span className="block text-gray-600 mb-4">
                        {`Question ${currentIndex + 1} of ${QuizData.length}`}
                    </span>
                    <div className="space-y-2">
                        {options.map((option, index) => (
                            <p
                                key={index}
                                className={`p-4 border rounded-lg cursor-pointer hover:bg-blue-100 ${userAnswer === option ? 'bg-blue-200' : ''
                                    }`}
                                onClick={() => this.checkAnswer(option)}
                            >
                                {option}
                            </p>
                        ))}
                    </div>
                    <div className="mt-4 space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg disabled:bg-gray-400"
                            disabled={this.state.disabled}
                            onClick={this.nextQuestionHandler}
                        >
                            Next Question
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg"
                            onClick={this.finishHandler}
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
