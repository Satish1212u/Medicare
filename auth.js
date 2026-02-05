/**
 * MediCare - Login & Register (separate pages)
 * Runs on login.html and register.html. Saves user to localStorage and redirects to index.html on success.
 */
(function () {
  'use strict';

  var isLoginPage = window.location.pathname.endsWith('login.html') || window.location.pathname.includes('login.html');
  var isRegisterPage = window.location.pathname.endsWith('register.html') || window.location.pathname.includes('register.html');
  if (!isLoginPage && !isRegisterPage) return;

  // Simple math CAPTCHA state
  var captcha = { login: { a: 0, b: 0 }, register: { a: 0, b: 0 } };

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateCaptcha(formType) {
    var a = randomInt(1, 10);
    var b = randomInt(1, 10);
    captcha[formType] = { a: a, b: b };
    var display = document.getElementById(formType + 'CaptchaDisplay');
    if (display) display.textContent = a + ' + ' + b + ' = ?';
    var input = document.getElementById(formType + 'Captcha');
    if (input) { input.value = ''; input.classList.remove('error'); }
    var err = document.getElementById(formType + 'CaptchaError');
    if (err) err.textContent = '';
  }

  function validateCaptcha(formType) {
    var input = document.getElementById(formType + 'Captcha');
    var errEl = document.getElementById(formType + 'CaptchaError');
    var value = (input && input.value.trim()) || '';
    var expected = captcha[formType].a + captcha[formType].b;
    if (!value) {
      if (errEl) errEl.textContent = 'Please complete the captcha.';
      if (input) input.classList.add('error');
      return false;
    }
    if (Number(value) !== expected) {
      if (errEl) errEl.textContent = 'Incorrect answer. Try again.';
      if (input) input.classList.add('error');
      return false;
    }
    if (errEl) errEl.textContent = '';
    if (input) input.classList.remove('error');
    return true;
  }

  function showError(fieldId, errorId, msg) {
    var field = document.getElementById(fieldId);
    var err = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (err) err.textContent = msg;
  }

  function clearError(fieldId, errorId) {
    var field = document.getElementById(fieldId);
    var err = document.getElementById(errorId);
    if (field) field.classList.remove('error');
    if (err) err.textContent = '';
  }

  function showFormMessage(formId, msg, type) {
    var elMsg = document.getElementById(formId + 'FormMessage');
    if (!elMsg) return;
    elMsg.textContent = msg;
    elMsg.className = 'form-message show ' + (type || '');
    elMsg.style.display = 'block';
  }

  function hideFormMessage(formId) {
    var elMsg = document.getElementById(formId + 'FormMessage');
    if (elMsg) { elMsg.textContent = ''; elMsg.className = 'form-message'; elMsg.style.display = 'none'; }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
  }

  // ----- Login page -----
  if (isLoginPage) {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailEl = document.getElementById('loginEmail');
        var passEl = document.getElementById('loginPassword');
        var email = (emailEl && emailEl.value.trim()) || '';
        var password = (passEl && passEl.value) || '';

        clearError('loginEmail', 'loginEmailError');
        clearError('loginPassword', 'loginPasswordError');
        hideFormMessage('login');

        var valid = true;
        if (!email) {
          showError('loginEmail', 'loginEmailError', 'Email is required.');
          valid = false;
        } else if (!validateEmail(email)) {
          showError('loginEmail', 'loginEmailError', 'Please enter a valid email address.');
          valid = false;
        }
        if (!password) {
          showError('loginPassword', 'loginPasswordError', 'Password is required.');
          valid = false;
        }
        if (!validateCaptcha('login')) valid = false;
        if (!valid) return;

        var users = [];
        try {
          users = JSON.parse(localStorage.getItem('medicare_users') || '[]');
        } catch (_) {}
        var user = users.find(function (u) { return u.email === email && u.password === password; });

        if (!user) {
          showFormMessage('login', 'Invalid email or password. Please try again.', 'error');
          generateCaptcha('login');
          return;
        }

        localStorage.setItem('medicare_user', JSON.stringify({ name: user.name, email: user.email }));
        showFormMessage('login', 'Login successful! Redirecting...', 'success');
        setTimeout(function () {
          window.location.href = 'index.html';
        }, 800);
      });
    }

    document.getElementById('refreshLoginCaptcha').addEventListener('click', function () { generateCaptcha('login'); });
    generateCaptcha('login');
  }

  // ----- Register page -----
  if (isRegisterPage) {
    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (document.getElementById('registerName') && document.getElementById('registerName').value.trim()) || '';
        var email = (document.getElementById('registerEmail') && document.getElementById('registerEmail').value.trim()) || '';
        var password = (document.getElementById('registerPassword') && document.getElementById('registerPassword').value) || '';
        var confirm = (document.getElementById('registerConfirmPassword') && document.getElementById('registerConfirmPassword').value) || '';

        clearError('registerName', 'registerNameError');
        clearError('registerEmail', 'registerEmailError');
        clearError('registerPassword', 'registerPasswordError');
        clearError('registerConfirmPassword', 'registerConfirmPasswordError');
        hideFormMessage('register');

        var valid = true;
        if (!name) {
          showError('registerName', 'registerNameError', 'Name is required.');
          valid = false;
        } else if (name.length < 2) {
          showError('registerName', 'registerNameError', 'Name must be at least 2 characters.');
          valid = false;
        }
        if (!email) {
          showError('registerEmail', 'registerEmailError', 'Email is required.');
          valid = false;
        } else if (!validateEmail(email)) {
          showError('registerEmail', 'registerEmailError', 'Please enter a valid email address.');
          valid = false;
        }
        if (!password) {
          showError('registerPassword', 'registerPasswordError', 'Password is required.');
          valid = false;
        } else if (password.length < 8) {
          showError('registerPassword', 'registerPasswordError', 'Password must be at least 8 characters.');
          valid = false;
        }
        if (!confirm) {
          showError('registerConfirmPassword', 'registerConfirmPasswordError', 'Please confirm your password.');
          valid = false;
        } else if (password !== confirm) {
          showError('registerConfirmPassword', 'registerConfirmPasswordError', 'Passwords do not match.');
          valid = false;
        }
        if (!validateCaptcha('register')) valid = false;
        if (!valid) return;

        var users = [];
        try {
          users = JSON.parse(localStorage.getItem('medicare_users') || '[]');
        } catch (_) {}
        if (users.some(function (u) { return u.email === email; })) {
          showFormMessage('register', 'This email is already registered. Please login.', 'error');
          generateCaptcha('register');
          return;
        }

        users.push({ name: name, email: email, password: password });
        localStorage.setItem('medicare_users', JSON.stringify(users));
        localStorage.setItem('medicare_user', JSON.stringify({ name: name, email: email }));

        showFormMessage('register', 'Account created successfully! Redirecting...', 'success');
        setTimeout(function () {
          window.location.href = 'index.html';
        }, 800);
      });
    }

    document.getElementById('refreshRegisterCaptcha').addEventListener('click', function () { generateCaptcha('register'); });
    generateCaptcha('register');
  }

  // ----- Password show/hide (both pages) -----
  document.querySelectorAll('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = this.closest('.input-with-toggle');
      var input = wrap && wrap.querySelector('input');
      var eye = wrap && wrap.querySelector('.fa-eye');
      var eyeSlash = wrap && wrap.querySelector('.fa-eye-slash');
      if (!input) return;
      var isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      if (eye) eye.style.display = isPass ? 'none' : 'inline-block';
      if (eyeSlash) eyeSlash.style.display = isPass ? 'inline-block' : 'none';
    });
  });
})();
