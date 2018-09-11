import './login.scss';
import * as React from 'react';
import { IPageProps } from '../interfaces';

function FirstRunPopup() {
    return (
        <div className="dialog">
            <p>Welcome :)</p>
        </div>
    );
}

export class LoginPageComponent extends React.Component<IPageProps> {
    state: IPageProps['auth'];

    constructor(props: IPageProps) {
        super(props);
        this.state = { ...props.auth };
    }
    render() {
        if (!this.state) {
            return <div className="loginpage" />;
        }
        return (
            <div className="loginpage">
                {this.props.firstRun ? <FirstRunPopup /> : null}
                <div className="loginpage__form">
                    <p className="loginpage__component loginpage__component--mail">
                        <label htmlFor="email">uplay email</label>
                        <input
                            id="email"
                            value={this.state.email}
                            type="text"
                            onInput={this.update('email').bind(this)}
                        />
                    </p>
                    <p className="loginpage__component loginpage__component--password">
                        <label htmlFor="email">password</label>
                        <input
                            id="email"
                            value={this.state.password}
                            onInput={this.update('password').bind(this)}
                            type="password"
                        />
                    </p>
                    <p className="loginpage__component loginpage__component--inline loginpage__component--remembermail">
                        <label htmlFor="email">remember email</label>
                        <input
                            id="email"
                            checked={this.state.rememberMail}
                            onChange={this.update('rememberMail', 'checked').bind(this)}
                            type="checkbox"
                        />
                    </p>
                    <p className="loginpage__component loginpage__component--inline loginpage__component--rememberpass">
                        <label htmlFor="email">rememberpassword</label>
                        <input
                            id="email"
                            checked={this.state.rememberPass}
                            onChange={this.update('rememberPass', 'checked').bind(this)}
                            type="checkbox"
                        />
                    </p>
                    <p className="loginpage__component">
                        <button className="loginpage__submit" onClick={() => this.submit()}>
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        );
    }
    private update(stateProp: keyof IPageProps['auth'], prop = 'value') {
        return e => {
            this.setState(state => ({
                ...state,
                [stateProp]: e.target[prop],
            }));
        };
    }
    private submit() {
        if (this.state) {
            this.props.api.logIn(this.state);
        } else {
            console.warn("can't login, no state");
        }
    }
}
