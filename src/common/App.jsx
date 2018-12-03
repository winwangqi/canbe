import React from 'react'

class App extends React.Component {
  state = {
    count: 0
  }
  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={() => this.setState(state => ({ count: state.count + 1 }))}>click</button>
      </div>
    )
  }
}

export default App
