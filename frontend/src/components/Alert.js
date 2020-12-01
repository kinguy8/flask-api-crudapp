import React, { useEffect, useContext } from 'react'
import Context from './Context'



function Alert({ status }) {
    const styles = {
        alert: {
            visibility: status.visibility
        }
    }

    const { clearAlert } = useContext(Context)
    useEffect(() => {
        setTimeout(() =>{
            clearAlert()
        },5000)
    })

    return (
        <div className={status.alertStyle} style={styles.alert} role="alert">
            {status.alertText} 
        </div>
    )
}

export default Alert