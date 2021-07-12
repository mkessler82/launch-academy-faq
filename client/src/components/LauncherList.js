import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const LauncherList = props => {
  const [launchers, setLaunchers] = useState([])
  
  const fetchLaunchers = async () => {
    try {
      const response = await fetch("/api/v1/launchers")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      // debugger
      setLaunchers(responseBody.launchers)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    fetchLaunchers()
  }, [])

  const launcherList = launchers.map(launcher => {
    return (
      <Link key={launcher.id} to={`/launchers/${launcher.id}`}>
        <li>{launcher.name}</li>
      </Link>
    )
  })

  return (
    <div>
      <h1>Launchers</h1>
      <ul>{launcherList}</ul>
    </div>
  )
}

export default LauncherList
