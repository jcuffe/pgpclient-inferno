import { version, Component } from 'inferno'
import { Route, Switch } from 'inferno-router'
import Auth from '../util/auth'

const blank = { accessToken: null, idToken: null, expiresAt: null }

class App extends Component {
  constructor() {
    super()
    this.auth = new Auth()
    this.state = blank
  }

  setSession = ({ accessToken, idToken, expiresIn }) => {
    let expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime())
    this.setState({ accessToken, idToken, expiresAt })
  }

  handleAuthentication = () => {
    this.auth.handleAuthentication()
      .then(this.setSession)
      .catch(err => console.log("Error: ", err))
      .finally(this.redirectHome)
    return null
  }

  handleLogout = () => {
    this.clearState()
    this.redirectHome()
  }

  isAuthenticated = () => new Date().getTime() < JSON.parse(this.state.expiresAt)
  clearState = () => this.setState(blank)
  redirectHome = () => this.props.history.push('')
  
  render = () => (
    <Switch>
      <Route path="/callback" component={this.handleAuthentication} />
      <Route path="" >
        <div className="App">
          {this.isAuthenticated()
            ? <button onClick={this.handleLogout}>Log out</button>
            : <button onClick={this.auth.login}>Log in</button>
          }
          <p>{this.state.accessToken}</p>
          <p>{this.state.idToken}</p>
        </div>
      </Route>
    </Switch>
  )
}

export default App
