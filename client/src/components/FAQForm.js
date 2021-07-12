import React, { useState } from "react"

const FAQForm = (props) => {
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: ""
  })

  const handleChange = (event) => {
    // debugger
    setNewQuestion({
      ...newQuestion,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setNewQuestion({
      question: "",
      answer: ""
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  
    props.addNewQuestion(newQuestion)
    clearForm()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question"> Question:
        <input 
          id="question"
          type="text"
          name="question"
          onChange={handleChange}
          value={newQuestion.question}
        />
      </label>

      <label htmlFor="answer"> Answer:
        <input
          id="answer"
          type="text"
          name="answer"
          onChange={handleChange}
          value={newQuestion.answer}
        />
      </label>

      <input type="submit" value="Add Question" />
      <button type="button" onClick={clearForm}>Clear Form</button>
    </form>
  )
}

export default FAQForm