const signupForm = document.querySelector('.auth-form');

const beforeSubmit = (e) => {
    e.preventDefault();
    if (checkForm(this)) {
        signupForm.submit();
    }
};
const focusRed = (formElement) => {
    formElement.style.border = '1px solid red';
};

const checkForm = (form) => {
    if (form.password.value !== form.confirmPassword.value) {
        alert('A password deve coincidir com a confirmação!');
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }

    if (form.password.length < 8) {
        alert('A password deve conter pelo menos 8 caracteres!');
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }

    if (
        form.password.value === form.primeiroNome.value ||
        form.password.value === form.apelidoNome.value
    ) {
        alert(
            'A password tem de ser diferente do nome ou apelido do utilizador!'
        );
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }
    re = /[0-9]/;
    if (!re.test(form.password.value)) {
        alert('A password tem de conter pelo menos um número (0-9)!');
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }
    re = /[a-z]/;
    if (!re.test(form.password.value)) {
        alert('A password tem de conter pelo menos uma letra minúscula (a-z)!');
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }
    re = /[A-Z]/;
    if (!re.test(form.password.value)) {
        alert('A password tem de conter pelo menos uma letra maiúscula (A-Z)!');
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }
    re = /[*+!@#$%?~<>«»=&-]/;
    if (!re.test(form.password.value)) {
        alert(
            'A password tem de conter pelo menos um caracter especial (*+!@#$%?~<>«»=&-)!'
        );
        focusRed(form.password);
        focusRed(form.confirmPassword);
        form.password.focus();
        return false;
    }
};
