
import Togglable from './Togglable'
export default function LoginForm(props) {

    return (
        <Togglable buttonLabel={'Show login'}>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <input
                        type='text'
                        value={props.username}
                        name='Username'
                        placeholder='Username'
                        onChange={props.handleUsernameChange}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        value={props.password}
                        name='Password'
                        placeholder='Password'
                        onChange={props.handlePasswordChange}
                        handleSubmit={props.handleLogin}
                    />
                </div>
                <button>Login</button>
            </form>
        </Togglable>
    )
}