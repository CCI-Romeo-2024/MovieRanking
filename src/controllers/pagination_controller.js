// import { searchEngine } from "../pages/home/main.js";

import("../pages/home/main.js").then(({ searchEngine }) => {
    searchEngine.nextBtn.addEventListener('click', (event) => {
        event.preventDefault();

        searchEngine.nextPage()
    });

    searchEngine.prevBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('ze');

        searchEngine.prevPage()
    });
});