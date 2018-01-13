import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

export default class Main extends Component {

  back = () => {
    history.go(-1)
  }

  render() {
    return (
      <div>
        Main
        <div className="back" onClick={this.back}>back</div>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('app'))