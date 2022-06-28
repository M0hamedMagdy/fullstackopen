import PropTypes from 'prop-types'

function LoginForm({handleLogin, username, password , handlePasswordChange , handleUserChange}) { 

    
    return( 
        <>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
            <label htmlFor="user">Username:</label>
            <input 
                type="text"
                id="user"
                value={username}
                placeholder="Username"
                onChange={handleUserChange} />
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password" 
                value={password} 
                placeholder="password" 
                onChange={handlePasswordChange}/>
            <button type="submit">Login</button>
        </form>
        </>
    )

}

LoginForm.prototype = { 
    handleLogin : PropTypes.func.isRequired,
    username: PropTypes.string.isRequired, 
    password: PropTypes.string.isRequired,
    handleUserChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired  

}

export default LoginForm