import moviePageContent from './modules/moviePageConstructor'
import studiosContent from './modules/studiosConstructor'

import frames from './modules/postersConstructor';
import actors from './modules/actorCardsConstructor';
import awrds from './modules/awardsConstructor';
import quotes from './modules/quotesConstructor';
import reviews from './modules/ReviewCards';

import modalWindows from './modules/modalWindowsAndSearch';
import postFormData from './modules/forms';
import tokenVerification from './modules/tokenVerification';
import profileGenerator from './modules/profileGenerator';
import searchItems from './modules/searchItemsConstructor';
import search from './modules/search';
import mobileMenu from './modules/mobileMenu';
import movieCards from './modules/movieCards';
import boxOffice from './modules/filmBoxOffice';
import expectedMovie from './modules/expectedMovCards';
import filterTabs from './modules/filterTabs';
import videoPlayer from './modules/trailers';
import lastNews from './modules/newsTabs';
import tabs from './modules/tabs';
import sliders from './modules/sliders';
import upElement from './modules/up';

window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.body').classList.contains('mainPageSelector')) {
        tokenVerification();
        modalWindows();
        postFormData();
        searchItems();
        search();
        mobileMenu();
        movieCards();
        boxOffice();
        expectedMovie();
        videoPlayer();
        lastNews();
        const firstAwaitInterwal = setInterval(() => {
            if (document.querySelector('.cinemaNow .cardItem')) {
                filterTabs();
                clearInterval(firstAwaitInterwal);
            }
        }, 1000);
        const secondAwaitInterwal = setInterval(() => {
            if (document.querySelector('.openTrailerWrapper')) {
                tabs();
                sliders();
                upElement();
                clearInterval(secondAwaitInterwal);
            }
        }, 1000);
    } else if (document.querySelector('.body').classList.contains('profilePageSelector')) {
        tokenVerification();
        modalWindows();
        searchItems();
        search();
        mobileMenu();
        upElement();
        profileGenerator();
    } else if (document.querySelector('.body').classList.contains('404-page')) {
        mobileMenu();
        upElement(); 
    } else {
        moviePageContent();
        tokenVerification();
        modalWindows();
        postFormData();
        searchItems();
        search();
        mobileMenu();
        const awaitMovieDataInterwal = setInterval(() => {
            if (document.querySelector('.movieDescription__thirdFlexBox')) {
                studiosContent();                
                clearInterval(awaitMovieDataInterwal);
            }
        }, 1000);
        actors();
        videoPlayer();
        awrds();
        frames();
        quotes();
        reviews();
        const awaitReviewContentInterwal = setInterval(() => {
            if (document.querySelector('.ReviewElement')) {
                filterTabs();         
                clearInterval(awaitReviewContentInterwal);
            }
        }, 1000);
        upElement();   
    }
});