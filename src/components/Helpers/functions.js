import { store } from 'react-notifications-component';

const notification = (title, message, type) => {
    store.addNotification({
        title,
        message,
        type,                      // 'default', 'success', 'info', 'warning'
        container: 'top-center',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
            duration: 1500 
        }     
    })
}

export default notification