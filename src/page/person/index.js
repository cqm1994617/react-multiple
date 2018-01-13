import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

export default class Person extends Component {

  back = () => {
    history.go(-1)
  }

  render() {
    return (
      <div>
        Person page.
        <div className="back" onClick={this.back}>back</div>
      </div>
    )
  }
}

ReactDOM.render(<Person />, document.getElementById('app'))