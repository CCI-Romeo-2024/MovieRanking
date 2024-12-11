const searchInput = document.querySelector('#search-input')

searchInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    const newUrl = new URL('./index.html', window.location.origin);

    newUrl.searchParams.set('q', event.target.value);
    window.location.href = newUrl.toString();
})