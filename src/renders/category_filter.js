import xIcon from '@svg/x.svg'

const render = (category) => `<div class="filter active filter-custom">${category.name}<img src="${xIcon}" alt="delete icon"/></div>`

export default render