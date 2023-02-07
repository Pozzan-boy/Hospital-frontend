import { RouterProvider } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import router from '../../routes/router';
import { accountFetching, accountFetched, accountFetchingError } from '../Login/loginSlice';

import './app.scss';

const App = () => {

	const dispatch = useDispatch();
	const token = localStorage.getItem('token');
	if(token !== 'undefined') {
		dispatch(accountFetching());
        axios.post('/auth/login', {}, {
			headers: {
				'Authorization': token
			}
		})
        .then(res => {
            dispatch(accountFetched(res.data));
            localStorage.setItem('token', res.data.token);
        })
        .catch(() => dispatch(accountFetchingError()));
	}

	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	)
}

export default App;
