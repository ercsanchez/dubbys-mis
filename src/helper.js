(() =>
{
	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

	document.querySelector('.logout > a[href="#"]').textContent = localStorage.getItem('username');
})();

function isAdmin()
{
	return localStorage.getItem('role') === 'admin';
}