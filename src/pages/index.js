import { Component, Fragment } from 'react';
import './index.css';
import Entrance from './Entrance';
import Main from './Main'

class App extends Component {
    constructor() {
        super();
        this.state = {
            loginState: true
        }
    }
    handleLoginState = () => {
        this.setState((state) => ({
            loginState: !state.loginState
        }))
    }
    render() {
        return (
            <Fragment>
                {
                    this.state.loginState ?
                        <Entrance handleLoginState={this.handleLoginState} />
                        :
                        <Main />
                }

            </Fragment>
        )
    }
}

export default App;