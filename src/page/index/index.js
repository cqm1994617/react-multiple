import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Button from '../../component/button'
import './index.scss'

export default class Index extends Component {

  to = (href) => () => {
    location.href = href
  }

  render() {
    return (
      <div className="container">
        <Button onPress={this.to('./main')}>Main</Button>
        <Button onPress={this.to('./person')}>Person</Button>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))