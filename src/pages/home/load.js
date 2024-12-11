const urlParams = new URLSearchParams(window.location.search)

if (urlParams.has('fs')) {
    document.getElementById('nav-search').classList.add('active')
    document.getElementById('nav-home').classList.remove('active')
}