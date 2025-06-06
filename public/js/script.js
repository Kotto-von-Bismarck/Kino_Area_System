import moviePageContent from './modules/moviePageConstructor'

import pagesContent from './modules/allPagesContent';
import actors from './modules/actorsCardsForMoviePages';
import achievements from './modules/achievementsConstructor';
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
        filterTabs();
        videoPlayer();
        lastNews();
        tabs()
        sliders();
        upElement();
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
        // tokenVerification();
        // pagesContent();
        // actors();
        // achievements();
        // reviews();
        // modalWindows();
        // postFormData();
        // searchItems();
        // search();
        // mobileMenu();
        // filterTabs();
        // videoPlayer();
        // upElement();   
    }
});