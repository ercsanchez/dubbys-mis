// admin@example.com
// eLate5

axios.defaults.baseURL = 'https://cmsc209-api.herokuapp.com/api/v1';

const loginForm = document.querySelector('#login-form');


async function loginUser(email, password) {
    try {
        const credentials = {
            email: email,
            password: password
        }
        let token;
        console.log('login credentials:', credentials)
        const response = await axios.post(
            '/users/login',
            credentials
        );
        console.log('response:', response);
        console.log('response.data.token:', response.data.token);

        console.log('response.data.token', response.data.token)
        console.log('axios.defaults.headers.common[\'Authorization\']:', axios.defaults.headers.common['Authorization']);
        localStorage.setItem('jwt', 'Bearer ' + response.data.token);

        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

        // config.headers['Authorization'] = 'Bearer ' + response.data.token;
        // console.log('config.headers[\'Authorization\']:', config.headers['Authorization']);

        console.log(window.location.origin);
        console.log(window.location);

        window.location.href = window.location.origin + '/index.html'
    }
    catch (err) {
        // alert(err.message);
        alert('You are unauthorized!!!')
        console.error('err.response:', err.response);
    }
}


loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const enteredEmail = event.currentTarget.querySelector('#email').value;
    const enteredPassword = event.currentTarget.querySelector('#password').value;

    console.log(enteredEmail, enteredPassword);

    // change this after finalization
    loginUser(enteredEmail, enteredPassword);
    // loginUser('admin@example.com', 'eLate5');
});
