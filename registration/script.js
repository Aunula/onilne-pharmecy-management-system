// Tab Switching
function switchTab(tab) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const tabIndicator = document.getElementById('tabIndicator');
    const cardTitle = document.getElementById('cardTitle');
    const cardSubtitle = document.getElementById('cardSubtitle');
    
    if (tab === 'signin') {
        signInForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
        signInTab.classList.add('active');
        signUpTab.classList.remove('active');
        tabIndicator.classList.remove('right');
        cardTitle.textContent = 'Welcome Back';
        cardSubtitle.textContent = 'Sign in to your account';
    } else {
        signUpForm.classList.remove('hidden');
        signInForm.classList.add('hidden');
        signUpTab.classList.add('active');
        signInTab.classList.remove('active');
        tabIndicator.classList.add('right');
        cardTitle.textContent = 'Create Your Account';
        cardSubtitle.textContent = 'Join our pharmacy family today';
    }
    
    const card = document.getElementById('authCard');
    card.style.transform = 'scale(0.98)';
    setTimeout(() => { card.style.transform = 'scale(1)'; }, 150);
}

// Password Strength
const passwordInput = document.getElementById('password');
const strengthFill = document.getElementById('strengthFill');

passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    strengthFill.className = 'strength-fill';
    
    if (password.length === 0) strengthFill.style.width = '0%';
    else if (strength === 'weak') strengthFill.classList.add('weak');
    else if (strength === 'medium') strengthFill.classList.add('medium');
    else if (strength === 'strong') strengthFill.classList.add('strong');
});

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    if (strength <= 1) return 'weak';
    if (strength <= 2) return 'medium';
    return 'strong';
}

// ==========================================
// SIGN UP - CONNECTED TO BACKEND
// ==========================================
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    if (!terms) {
        alert('Please accept the Terms and Conditions');
        return;
    }
    
    const btn = e.target.querySelector('.submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    
    btnText.textContent = 'Creating Account...';
    btnLoader.classList.remove('hidden');
    btn.disabled = true;

    // Prepare data to send
    const userData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        password: password
    };

    try {
        // Send data to backend
        const response = await fetch('../backend/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (result.success) {
            btnText.textContent = 'Success!';
            btnLoader.classList.add('hidden');
            
            // Save to localStorage
            localStorage.setItem('userName', userData.name);
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = '../products/index.html';
            }, 1000);
        } else {
            alert(result.message); // Show error from backend
            btnText.textContent = 'Sign Up';
            btnLoader.classList.add('hidden');
            btn.disabled = false;
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        btnText.textContent = 'Sign Up';
        btnLoader.classList.add('hidden');
        btn.disabled = false;
    }
});

// ==========================================
// SIGN IN - CONNECTED TO BACKEND
// ==========================================
document.getElementById('signInForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = e.target.querySelector('.submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    
    btnText.textContent = 'Signing In...';
    btnLoader.classList.remove('hidden');
    btn.disabled = true;

    const loginData = {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value
    };

    try {
        // Send data to backend
        const response = await fetch('../backend/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (result.success) {
            btnText.textContent = 'Success!';
            btnLoader.classList.add('hidden');
            
            // Save to localStorage
            localStorage.setItem('userName', result.name);
            localStorage.setItem('userEmail', loginData.email);
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = '../products/index.html';
            }, 1000);
        } else {
            alert(result.message); // Show error from backend
            btnText.textContent = 'Sign In';
            btnLoader.classList.add('hidden');
            btn.disabled = false;
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        btnText.textContent = 'Sign In';
        btnLoader.classList.add('hidden');
        btn.disabled = false;
    }
});

// Input Focus Animation
document.querySelectorAll('.input-wrapper input, .input-wrapper textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});