document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            repeatPassword: document.getElementById('repeatPassword').value,
            _csrf: document.querySelector('[name=_csrf]').value
        };


        try {
            const response = await fetch('/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': formData._csrf 
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Kayıt başarılı!');
                window.location.href = '/login'; 
            } else {
                const error = await response.json();
                alert(error.message || 'Kayıt sırasında bir hata oluştu');
            }
        } catch (error) {
            console.error('Kayıt hatası:', error);
            alert('Bir hata oluştu, lütfen tekrar deneyin');
        }
    });
});
