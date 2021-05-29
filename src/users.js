let userId = 0;
axios.defaults.baseURL = 'https://cmsc209-api.herokuapp.com/api/v1';
const options = { headers: { authorization: localStorage.getItem('jwt') } };
const addUserModal = document.getElementById('addUserModal');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const deleteUserModal = document.getElementById('deleteUserModal');
const confirmAddUserBtn = document.getElementById('confirmAddUserBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

async function getAllUsers()
{
	try
	{
		const { data } = await axios.get('/users', options);
		const { users } = data.data;

		let tbody = '';

		users.forEach(({ id, username, email, role }) =>
		{
			tbody +=
			`
				<tr>
					<td>${username}</d>
					<td>${email}</td>
					<td>${role}</td>
					<td><a class="btn-del text-danger" onclick="confirmDelete(${id}, '${username}')">DELETE</a></td>
				</tr>
			`;
		});

		document.getElementById('tbody').innerHTML = tbody;
	}
	catch(error)
	{
		console.error(error);
	};
}

document.getElementById('addUserBtn').addEventListener('click', () =>
{
	addUserModal.style.display = 'block';
});

confirmAddUserBtn.addEventListener('click', async () =>
{
	confirmAddUserBtn.disabled = true;
	const username = usernameInput.value;
	const email = emailInput.value;
	const password = passwordInput.value;
	const passwordConfirm = passwordConfirmInput.value;

	if (!username || !email || !password || !passwordConfirm) return alert('All fields are required');

	if (password !== passwordConfirm) return alert('Passwords do not match');
	
	try
	{
		await axios.post('/users/signup', { username, email, password, passwordConfirm });
		addUserModal.style.display = 'none';
		usernameInput.value = emailInput.value = passwordInput.value = passwordConfirmInput.value = '';
		await getAllUsers();
	}
	catch (error)
	{
		console.error(error);
	}

	addUserModal.style.display = 'none';
	confirmAddUserBtn.disabled = false;
});

function confirmDelete(id, username)
{
	userId = id;
	document.getElementById('userToDelete').textContent = username;
	deleteUserModal.style.display = 'block';
}

document.getElementById('closeAddUserModalBtn').addEventListener('click', () =>
{
	addUserModal.style.display = 'none';
});

document.getElementById('closeDeleteUserModalBtn').addEventListener('click', () =>
{
	userId = 0;
	deleteUserModal.style.display = 'none';
});

confirmDeleteBtn.addEventListener('click', async () =>
{
	confirmDeleteBtn.disabled = true;

	try
	{
		await axios.delete(`/users/${userId}`, options);
		await getAllUsers();
	}
	catch (error)
	{
		console.error(error);
	}

	deleteUserModal.style.display = 'none';
	confirmDeleteBtn.disabled = false;
});