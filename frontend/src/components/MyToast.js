import 'react-bootstrap';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

const MyToast = (props) => {
    return (
        <ToastContainer position='bottom-center' className='position-fixed text-center'>
            <Toast show={props.show} onClose={props.handleClose} 
            autohide delay={3000} style={{color: 'white', backgroundColor: '#F48023'}}>
                <Toast.Body>
                    {props.text}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default MyToast