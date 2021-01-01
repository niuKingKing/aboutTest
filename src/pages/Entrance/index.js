import { Component, Fragment } from 'react';
import '../index.css';
import loginPic from '../../asset/icons/Entry.png'

class Entrance extends Component {
    constructor() {
        super();
    }

    render() {
        let { handleLoginState } = this.props;
        return (
            <Fragment>
                <div className="entrance_sup_container">
                    <img
                        src={loginPic}
                        alt="登录按钮"
                        className="entrance_sup_container_img"
                        onClick={handleLoginState}
                    />
                </div>
            </Fragment>
        )
    }
}


export default Entrance