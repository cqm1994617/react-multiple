import 'babel-polyfill'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App1 extends Component {

  render() {
    console.log(Promise)
    return (
      <div>
        APP1
      </div>
    )
  }
}

ReactDOM.render(<App1 />, document.getElementById('app'))
