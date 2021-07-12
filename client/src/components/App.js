import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import FAQList from "./FAQList"
import LauncherList from "./LauncherList"
import LauncherShow from "./LauncherShow"

const App = (prop) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FAQList} />
        <Route exact path="/launchers" component={LauncherList} />
        <Route exact path="/launchers/:id" component={LauncherShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App