import { Navigate} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    const { children } = props;

    if (user) return children;
    return <Navigate to="/login" />
  
};

export default PrivateRoute;
