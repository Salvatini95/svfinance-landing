// ============================================================
// SV Finance — main.js
// ============================================================

// ── MOBILE MENU ─────────────────────────────────────────────
const mobileBtn     = document.getElementById('nav-mobile-btn')
const mobileMenu    = document.getElementById('mobile-menu')
const mobileOverlay = document.getElementById('mobile-menu-overlay')
const mobileClose   = document.getElementById('mobile-menu-close')

function openMobileMenu()  { mobileMenu?.classList.add('open'); mobileOverlay?.classList.add('open'); }
function closeMobileMenu() { mobileMenu?.classList.remove('open'); mobileOverlay?.classList.remove('open'); }

mobileBtn?.addEventListener('click', openMobileMenu)
mobileClose?.addEventListener('click', closeMobileMenu)

// ── NAV SCROLL ──────────────────────────────────────────────
const mainNav = document.getElementById('main-nav')
window.addEventListener('scroll', () => {
  mainNav?.classList.toggle('scrolled', window.scrollY > 40)
}, { passive: true })

// ── TOGGLE PLANOS MENSAL/ANUAL ───────────────────────────────
let isAnnual = false

function togglePlans() {
  isAnnual = !isAnnual
  const toggle = document.getElementById('plan-toggle')
  const lblMonthly = document.getElementById('lbl-monthly')
  const lblYearly  = document.getElementById('lbl-yearly')

  toggle?.classList.toggle('annual', isAnnual)

  if (lblMonthly) lblMonthly.classList.toggle('active', !isAnnual)
  if (lblYearly)  lblYearly.classList.toggle('active',  isAnnual)

  document.querySelectorAll('.plan-price-monthly').forEach(el => {
    el.classList.toggle('show', !isAnnual)
  })
  document.querySelectorAll('.plan-price-yearly').forEach(el => {
    el.classList.toggle('show', isAnnual)
  })
}

// ── FLOATING NUMBERS (canvas na hero) ──────────────────────
;(function () {
  const canvas = document.createElement('canvas')
  canvas.id = 'sv-float-canvas'
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:1;'
  const hero = document.querySelector('.hero')
  if (!hero) return
  hero.insertBefore(canvas, hero.firstChild)
  const ctx = canvas.getContext('2d', { willReadFrequently: false })

  function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
  resize()
  window.addEventListener('resize', resize)

  const symbols = ['+2.4%','R$','↑','▲','1.847','%','+R$320','▲12%','€','$','+4.1%','3.500','↗','R$1k','▼','+18%','R$49','DRE','MEI','+R$1.2k','99%','NF-e']
  const layers = [
    { count:10, speedMin:0.25, speedMax:0.55, sizeMin:9,  sizeMax:12, opacityMax:0.07 },
    { count:8,  speedMin:0.55, speedMax:1.0,  sizeMin:13, sizeMax:17, opacityMax:0.11 },
    { count:5,  speedMin:1.0,  speedMax:1.7,  sizeMin:18, sizeMax:26, opacityMax:0.18 },
  ]
  const particles = []
  layers.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      const sym = symbols[Math.floor(Math.random() * symbols.length)]
      particles.push({ x:Math.random()*window.innerWidth, y:window.innerHeight+Math.random()*400, speed:layer.speedMin+Math.random()*(layer.speedMax-layer.speedMin), opacity:0, maxOpacity:0.03+Math.random()*layer.opacityMax, size:layer.sizeMin+Math.random()*(layer.sizeMax-layer.sizeMin), symbol:sym, drift:(Math.random()-0.5)*0.15, layer:li, positive:/[+▲↑↗]/.test(sym) })
    }
  })

  let canvasOpacity = 1
  window.addEventListener('scroll', () => {
    const heroH = hero.offsetHeight
    canvasOpacity = Math.max(0, 1 - window.scrollY / (heroH * 0.55))
    canvas.style.opacity = canvasOpacity
  }, { passive: true })

  let lastTime = 0
  function animate(timestamp) {
    if (canvasOpacity <= 0) { ctx.clearRect(0, 0, canvas.width, canvas.height); requestAnimationFrame(animate); return }
    if (timestamp - lastTime < 34) { requestAnimationFrame(animate); return }
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.y -= p.speed; p.x += p.drift
      if (p.opacity < p.maxOpacity) p.opacity += 0.002
      if (p.y < canvas.height * 0.2) p.opacity -= 0.005
      if (p.y < -40 || p.opacity <= 0) {
        p.y = canvas.height + Math.random()*150; p.x = Math.random()*canvas.width; p.opacity = 0
        const s = symbols[Math.floor(Math.random()*symbols.length)]
        p.symbol = s; p.positive = /[+▲↑↗]/.test(s)
        const l = layers[p.layer]; p.speed = l.speedMin + Math.random()*(l.speedMax-l.speedMin)
      }
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.positive ? '#22c55e' : '#818cf8'
      ctx.font = `${Math.round(p.size)}px monospace`
      ctx.fillText(p.symbol, p.x, p.y)
    })
    ctx.globalAlpha = 1
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
})()

// ── FALLBACK IMAGENS MOCKUP ─────────────────────────────────
;(function () {
  function checkImg(imgId, placeholderId) {
    const img = document.getElementById(imgId)
    const ph  = document.getElementById(placeholderId)
    if (!img || !ph) return
    img.addEventListener('load', () => { ph.style.display = 'none' })
    img.addEventListener('error', () => { img.style.display = 'none'; ph.style.display = 'flex' })
    if (img.complete && img.naturalWidth > 0) { ph.style.display = 'none' }
    else if (img.complete) { img.style.display = 'none'; ph.style.display = 'flex' }
  }
  checkImg('mac-preview', 'mac-placeholder')
  checkImg('iphone-preview', 'iphone-placeholder')
})()

// ── SCROLL REVEAL (suporta reveal, reveal-left, reveal-right) ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      revealObs.unobserve(e.target)
    }
  })
}, { threshold: 0.08 })

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el))

// ── NAV HIGHLIGHT ───────────────────────────────────────────
const navSections = document.querySelectorAll('[id]')
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 80
  navSections.forEach(s => {
    const link = document.querySelector(`nav a[href="#${s.id}"]`)
    if (!link) return
    link.classList.toggle('active', pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight)
  })
}, { passive: true })

// ── NEWSLETTER ──────────────────────────────────────────────
const form = document.getElementById('nl-form')
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name  = document.getElementById('nl-name')?.value  || ''
    const email = document.getElementById('nl-email')?.value || ''
    try {
      await fetch('https://api.svfinance.com.br/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
    } catch (err) {
      console.log('Newsletter:', name, email)
    }
    form.style.display = 'none'
    document.getElementById('nl-success').style.display = 'block'
  })
}

// ── PARALLAX SUAVE NOS CARDS DE PLANO ───────────────────────
;(function () {
  const cards = document.querySelectorAll('.glass-card')
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(-8px)`
    })
    card.addEventListener('mouseleave', () => {
      // Respeita classe featured
      const isFeatured = card.classList.contains('featured')
      card.style.transform = isFeatured ? 'scale(1.03)' : ''
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)'
    })
  })
})()