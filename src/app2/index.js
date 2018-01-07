import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App2 extends Component {

  render() {
    console.log(Promise)
    return (
      <div>
        APP2
      </div>
    )
  }
}

ReactDOM.render(<App2 />, document.getElementById('app'))
