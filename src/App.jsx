import { useEffect, useState } from 'react'
import './App.css'
// import {format} from 'date-fns'
// import Parent from "./Parent.jsx"
// import Children from './Children.jsx'
// import UserProvider from "./Context";
// import Form from './Form.jsx'
// import Output from './OutputSearch'
// import UseEffect from './UseEffect'
import quiz from './Timeout Q&A/quiz'
import Question from './Timeout Q&A/Question'

function App() {
  const [questions, setQuestions] = useState(quiz)
  const [currentQuestionId, setCurrentQuestion] = useState(1)
  const[score, setScore] = useState(0)
  const currentQuestion = questions.find(q => q.id === currentQuestionId)

  function handleQuestionsAnswered(correct) {
    if(currentQuestionId < questions.length) {
      setCurrentQuestion((currentQuestion) => currentQuestionId + 1)
    }else {
      setCurrentQuestion(null)
    }
    if(correct) {
      setScore(score => score + 1)
    }
  }
  return (
    <main>
      
    </main>
  )
}

export default App
