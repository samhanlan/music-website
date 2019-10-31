import './audio-engineer.scss'
import createFromSelection from './js/portfolio-items-config'

const contentDisplayEl = document.getElementById('content-display')
const portfolioListEl = document.getElementById('portfolio-list')
const navLinkEls = document.querySelectorAll('nav a')
const routes = ['home','latest','credits','about','contact',]
let lastSelectedRoute = getCurrentRouteFromHash()

window.addEventListener('hashchange', applyRouteViaCurrentHash)
portfolioListEl.addEventListener('click', onPortfolioItemSelect)
window.addEventListener('touchstart', onFirstTouch, false)

applyRouteViaCurrentHash()

function onFirstTouch() {
    document.body.classList.add('hastouchevents')
    window.removeEventListener('touchstart', onFirstTouch, false)
}

function applyRouteViaCurrentHash() {
    const hash = getCurrentRouteFromHash()
    const route = routes.find(route => hash === route)
    
    if (!route) return

    applyTemplateViaRoute(route)
    applyActiveNavLinkElViaRoute(route)
    lastSelectedRoute = route
}

function getCurrentRouteFromHash() {
    return (window.location.hash || '').replace('#page-', '')
}

function applyTemplateViaRoute(route) {
    const template = document.getElementById(`template-${route}`)

    if (lastSelectedRoute) document.body.classList.remove(lastSelectedRoute)
    document.body.classList.add(route)
    
    if (!template) return window.location.hash = '#page-home'
    
    const templateClone = document.importNode(template.content, true)
    contentDisplayEl.innerHTML = ''
    contentDisplayEl.appendChild(templateClone)
}

function applyActiveNavLinkElViaRoute(route) {
    const hash = `#page-${route}`

    for (let navLinkEl of navLinkEls) {
        navLinkEl.classList.remove('active')
        if (navLinkEl.hash === hash) navLinkEl.classList.add('active')
    }
}

let lastPortfolioIdSelection = null
function onPortfolioItemSelect(event) {
    const portfolioItemEl = event.target.closest('.portfolio-item')
    const content = createFromSelection(portfolioItemEl)

    if (content.id === lastPortfolioIdSelection) {
        lastPortfolioIdSelection = null
    }
    else if (content.id !== lastPortfolioIdSelection) {
        contentDisplayEl.innerHTML = ''
        contentDisplayEl.className = ''
        contentDisplayEl.appendChild(content.documentFragment)
        lastPortfolioIdSelection = content.id
    }
}
