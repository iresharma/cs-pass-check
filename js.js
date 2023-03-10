const requirements = [
    { re: /[0-9]/, label: "Includes number", id: 'number' },
    { re: /[a-z]/, label: "Includes lowercase letter", id: 'lower' },
    { re: /[A-Z]/, label: "Includes uppercase letter", id: 'upper' },
    { re: null, label: 'length', id: 'length' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol", id: 'symbol' },
];

const commonPassword = [
    '12345',
    '123456',
    '123456789',
    'test1',
    'password',
    '12345678',
    'zinch',
    'g_czechout',
    'asdf',
    'qwerty',
    '1234567890',
    '1234567',
    'Aa123456.',
    'iloveyou',
    '1234',
    'abc123',
    '111111',
    '123123',
    'dubsmash',
    'test',
    'princess',
    'qwertyuiop',
    'sunshine',
    'BvtTest123',
    '11111',
    'ashley',
    '00000',
    '000000',
    'password1',
    'monkey',
    'livetest',
    '55555',
    'soccer',
    'charlie',
    'asdfghjkl',
    '654321',
    'family',
    'michael',
    '123321',
    'football',
    'baseball',
    'q1w2e3r4t5y6',
    'nicole',
    'jessica',
    'purple',
    'shadow',
    'hannah',
    'chocolate',
    'michelle',
    'daniel',
    'maggie',
    'qwerty123',
    'hello',
    '112233',
    'jordan',
    'tigger',
    '666666',
    '987654321',
    'superman',
    '12345678910',
    'summer',
    '1q2w3e4r5t',
    'fitness',
    'bailey',
    'zxcvbnm',
    'fuckyou',
    '121212',
    'buster',
    'butterfly',
    'dragon',
    'jennifer',
    'amanda',
    'justin',
    'cookie',
    'basketball',
    'shopping',
    'pepper',
    'joshua',
    'hunter',
    'ginger',
    'matthew',
    'abcd1234',
    'taylor',
    'samantha',
    'whatever',
    'andrew',
    '1qaz2wsx3edc',
    'thomas',
    'jasmine',
    'animoto',
    'madison',
    '987654321',
    '54321',
    'flower',
    'Password',
    'maria',
    'babygirl',
    'lovely',
    'sophie',
    'Chegg123',
    'computer',
    'qwe123',
    'anthony',
    '1q2w3e4r',
    'peanut',
    'bubbles',
    'asdasd',
    'qwert',
    '1qaz2wsx',
    'pakistan',
    '123qwe',
    'liverpool',
    'elizabeth',
    'harley',
    'chelsea',
    'familia',
    'yellow',
    'willia',
    'george',
    '7777777',
    'lovem',
    '123abc',
    'letmein',
    'oliver',
    'batman',
    'cheese',
    'banana',
    'testing',
    'secret',
    'angel',
    'friends',
    'jackson',
    'aaaaaa',
    'softball',
    'chicken',
    'lauren',
    'andrea',
    'welcome',
    'asdfgh',
    'robert',
    'orange',
    'Testing1',
    'pokemon',
    '555555',
    'melissa',
    'morgan',
    '123123123',
    'qazwsx',
    'diamond',
    'brandon',
    'jesus',
    'mickey',
    'olivia',
    'changeme',
    'danielle',
    'victoria',
    'gabrie',
    '123456a',
    '0.00000000',
    'loveyou',
    'hockey',
    'freedom',
    'azert',
    'snoopy',
    'skinny',
    'myheritage',
    'qwerty1',
    '159753',
    'forever',
    'iloveu',
    'killer',
    'joseph',
    'master',
    'mustang',
    'hellokitty',
    'school',
    'Password1',
    'patrick',
    'blink182',
    'tinkerbell',
    'rainbow',
    'nathan',
    'cooper',
    'onedirection',
    'alexander',
    'jordan23',
    'lol123',
    'jasper',
    'junior',
    'q1w2e3r4',
    '222222',
    '11111111',
    'benjami',
    'jonathan',
    'passw0rd',
    '123456789',
    'a123456',
    'samsung',
    '123',
    'love123',
];

const hashBrowser = val =>
    crypto.subtle
        .digest('SHA-256', new TextEncoder('utf-8').encode(val))
        .then(h => {
            let hexes = [],
                view = new DataView(h);
            for (let i = 0; i < view.byteLength; i += 4)
                hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
            return hexes.join('');
        });

const input = document.querySelector('input');
input.onkeyup = getStrength

function getStrength() {
    const password = document.querySelector('input').value;
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
        if (commonPassword.includes(password.toLowerCase())) {
            document.querySelector(`#commonPass`).style.color = 'red';
            multiplier += 1;
        } else {
            document.querySelector(`#commonPass`).style.color = 'green';
        }
    });

    const str = Math.max(100 - (100 / (requirements.length + 2)) * multiplier, 0);
    document.querySelector('progress').value = str;
    hashBrowser(password).then(data => {
        document.querySelector('code').innerHTML = data

        if (password.length == 0) {
            document.querySelector('code').innerHTML = 'Hash code here'
            document.querySelector(`#commonPass`).style.color = 'red';
            document.querySelector('progress').value = 0;
            return;
        }
    })

}
