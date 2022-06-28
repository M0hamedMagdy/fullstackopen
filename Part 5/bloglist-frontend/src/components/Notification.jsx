import PropTypes from 'prop-types'

const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  

function Notification({errorMessage , successMessage }) { 

    if (successMessage === null && errorMessage === null ) { 
        return null 
    } else if (errorMessage) { 
        return (
            <div id='eroor' style={error}>
                {errorMessage}
            </div>
        )
    } else { 
        return (
            <div id='success' style={success}> 
                {successMessage}
            </div>
        )
    }

}

// check if null is a string??
Notification.prototype = { 
    errorMessage: PropTypes.string.isRequired, 
    successMessage: PropTypes.string.isRequired,
}



export default Notification