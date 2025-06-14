import constructComponent from "../services/request";

function quotes() {

    class QuotesSpumer {
        constructor(data) {
            this.quoteAuthor = data.quoteAuthor;
            this.quote = data.quote;
            this.quoteParent = document.querySelector('.movieQuotes .container');
        }
        render() {
            const quotesWrapper = document.createElement('div');
            quotesWrapper.classList.add('movieQuotes__text');
            
            quotesWrapper.innerHTML = `
                <img src="icons/Quotes.svg">
                <p class="movieQuotes__paragraph">
                    ${this.quote}
                </p><br>
                <p class="movieQuotes__author">
                    ${this.quoteAuthor}
                </p>
            `;
            this.quoteParent.append(quotesWrapper);       
        }
    };
    const localMovieID = localStorage.getItem('lastViewed');
    constructComponent('/api/getQuotes', localMovieID, QuotesSpumer);
};
export default quotes;