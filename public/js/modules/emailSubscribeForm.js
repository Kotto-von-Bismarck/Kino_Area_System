import MainPageRequest from "../services/MainPageRequests";

function postEmailSubscribe () {
    const subscribeBtn = document.querySelector('.subscribe__content .subscribeBtn');
    subscribeBtn.addEventListener('click', (e) => {
        let thisForm = subscribeBtn.parentElement.parentElement;

        let SubscriberMail = { email: thisForm.email.value }
        if (SubscriberMail.email) {
            if (thisForm.agree.checked) {
                e.preventDefault();
                MainPageRequest('/api/newEmailSubscriber',`${SubscriberMail.email}`);
                thisForm.email.value = '';
            }
        }
    })
}
export default postEmailSubscribe;