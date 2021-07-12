import React, { useState, useEffect } from 'react'
import { hot } from "react-hot-loader/root"

import Question from './Question'
import FAQForm from "./FAQForm"

const FAQList = props => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/v1/questions")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      // debugger
      setQuestions(responseBody.questions)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const addNewQuestion = async (formData) => {
    // need the form inputs
    // debugger
    try {
      // make fetch request
      const response = await fetch("/api/v1/questions", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      // receive new question object
      // debugger
      
      // update state with new question
      setQuestions([
        ...questions,
        responseBody.question
      ])
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    fetchQuestions()
  }, [])

  const toggleQuestionSelect = id => {
    if (id === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(id)
    }
  }

  const questionListItems = questions.map(question => {
    let selected
    if (selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => {
      toggleQuestionSelect(question.id)
    }

    return (
      <Question
        key={question.id}
        question={question.question}
        answer={question.answer}
        selected={selected}
        handleClick={handleClick}
      />
    )
  })

  return (
    <div className="page">
      <h1>We Are Here To Help</h1>
      <FAQForm 
        addNewQuestion={addNewQuestion}
      />
      <div className="question-list">{questionListItems}</div>
    </div>
  )
}

export default hot(FAQList)
