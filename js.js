const requirements = [
    { re: /[0-9]/, label: "Includes number", id: 'number' },
    { re: /[a-z]/, label: "Includes lowercase letter", id: 'lower' },
    { re: /[A-Z]/, label: "Includes uppercase letter", id: 'upper' },
    { re: null, label: 'length', id: 'length' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol", id: 'symbol' },
];

const input = document.querySelector('input');
input.onkeyup = getStrength

function getStrength() {
    const password = document.querySelector('input').value;
    console.log(password);
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (requirement.re) {
            if (!requirement.re.test(password)) {
                document.querySelector(`#${requirement.id}`).style.color = 'red';
                multiplier += 1;
            } else {
                document.querySelector(`#${requirement.id}`).style.color = 'green';
            }
        } else {
            if (password.length < 8) {
                document.querySelector(`#${requirement.id}`).style.color = 'red';
                multiplier += 1;
            } else {
                document.querySelector(`#${requirement.id}`).style.color = 'green';
            }
        }
    });

    const str = Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    document.querySelector('progress').value = str;
}