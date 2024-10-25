import { useState, useCallback, useRef } from "react";

import quizCompleteImage from '../assets/quiz-complete.png'
import Question from "./Qestion.jsx";
import QUESTIONS from "../questions.js";

export default function (){

    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUsersAnswers] = useState([]);


    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    console.log(activeQuestionIndex)

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState('answered')
        setUsersAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000);
    }, [activeQuestionIndex])


    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);


    if(quizIsComplete) {
        return (
            <div id='summary'>
                <img src={quizCompleteImage} alt="trophy icon"/>
                <h2>Quiz completed!</h2>
            </div>
        );
    }

    return (
        <div id='quiz'>
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    )
}