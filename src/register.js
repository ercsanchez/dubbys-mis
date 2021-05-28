axios.defaults.baseURL = 'https://cmsc209-api.herokuapp.com/api/v1';

const registerForm = document.querySelector('#register-form');


async function registerUser(username, email, password, passwordConfirm) {
    try {
        const data = {
            username,
            email,
            password,
            passwordConfirm
        }
        let token;

        const response = await axios.post(
            '/users/signup',
            data
        );
        console.log('response:', response);
        console.log('response.data:', response.data);
        // console.log('axios.defaults.headers.common[\'Authorization\']:', axios.defaults.headers.common['Authorization']);
        // localStorage.setItem('jwt', 'Bearer ' + response.data.token);

        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

        // config.headers['Authorization'] = 'Bearer ' + response.data.token;
        // console.log('config.headers[\'Authorization\']:', config.headers['Authorization']);

        // console.log(window.location.origin);
        // console.log(window.location);
        window.location.href = window.location.origin + '/login.html'
    }
    catch (err) {
        // alert(err.message);
        alert(err.message);
        console.error('err.response:', err.response);
    }
}


registerForm.addEventListener('submit', event => {
    event.preventDefault();
    const enteredUsername = event.currentTarget.querySelector('#username').value;
    const enteredEmail = event.currentTarget.querySelector('#email').value;
    const enteredPassword = event.currentTarget.querySelector('#password').value;
    const enteredPasswordConfirm = event.currentTarget.querySelector('#passwordConfirm').value;
    console.log(enteredUsername, enteredEmail, enteredPassword, enteredPasswordConfirm);
    registerUser(enteredUsername, enteredEmail, enteredPassword, enteredPasswordConfirm);
});
