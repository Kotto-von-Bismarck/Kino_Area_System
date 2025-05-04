import sign_In_Up from "../services/registration";
function postFormData () {
    document.querySelectorAll('.modal__inputWrapper .btn_yellow').forEach( item => {
        item.addEventListener('click', (e) => {
            let verifyType = item.parentElement.name;
            let thisForm = item.parentElement;

            let accountData = {};

            if (verifyType == 'auth') {
                accountData = {
                    nickname: thisForm.nickname.value,
                    password: thisForm.password.value
                }
                if (accountData.nickname && accountData.password) {
                    e.preventDefault();
                    sign_In_Up(accountData,`${verifyType}`);
                }
            } else if (verifyType == 'reg') {
                accountData = {
                    firstname: thisForm.firstname.value,
                    surname: thisForm.surname.value,
                    nickname: thisForm.nickname.value,                    
                    password: thisForm.password.value,
                    repeatpassword: thisForm.repeatpassword.value,
                    email: thisForm.email.value
                }
                if (accountData.firstname && accountData.surname && accountData.nickname && accountData.password && accountData.repeatpassword && accountData.email) {
                    if (accountData.password != accountData.repeatpassword) {
                        accountData = {};
                        thisForm.repeatpassword.value = '';
    
                        alert('Ошибка! Введите повторный пароль ещё раз');
                    } else {
                        if (thisForm.politicagree.checked && thisForm.personalagree.checked) {
                            e.preventDefault();
                            sign_In_Up(accountData,`${verifyType}`);
                        }
                    }
                }
            } else {
                alert('Ошибка валидации');
            }
        })
    }) 
}
export default postFormData;