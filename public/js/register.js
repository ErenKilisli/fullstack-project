// register.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        try {
            const response = await fetch('/register/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': document.querySelector('[name=_csrf]').value
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Kayıt başarılı!');
                window.location.href = '/login'; // Başarılı kayıttan sonra login sayfasına yönlendir
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