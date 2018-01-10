import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App2 extends Component {

  render() {
    console.log(Promise)
    return (
      <div>
        APP2
        <p>12345</p>
      </div>
    )
  }
}

ReactDOM.render(<App2 />, document.getElementById('app'))
