import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'





function Toggle(props , refs) { 
    const [visible , setVisible] = useState(false);

    const hideWhenVisible = {display : visible ? 'none' : ''}
    const showWhenVisible = {display : visible ? '' : 'none'}

    function toggleVisibility() { 
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
          toggleVisibility
        }
      })
    
    return(
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    ) 
}



const Togglable = forwardRef(Toggle);

// Togglable.displayName = 'Togglable'

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}



export default Togglable