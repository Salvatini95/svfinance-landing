// ============================================================
// SV Finance — main.js
// ============================================================

// ── FLOATING NUMBERS (canvas na hero) ──────────────────────
(function () {
  const canvas = document.createElement('canvas')
  canvas.id = 'sv-float-canvas'
  canvas.style.cssText = `
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 1;
  `

  const hero = document.querySelector('.hero')
  if (!hero) return
  hero.insertBefore(canvas, hero.firstChild)

  const ctx = canvas.getContext('2d', { willReadFrequently: false })

  function resize () {
    canvas.width  = hero.offsetWidth
    canvas.height = hero.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  const symbols = [
    '+2.4%', 'R$', '↑', '▲', '1.847', '%',
    '+R$320', '▲12%', '€', '$', '+4.1%',
    '3.500', '↗', 'R$1k', '▼', '+18%',
    'R$0', 'DRE', 'MEI', '+R$1.2k', '99%'
  ]

  // 3 camadas: fundo lento/pequeno → frente rápido/grande
  const layers = [
    { count: 10, speedMin: 0.25, speedMax: 0.55, sizeMin: 9,  sizeMax: 12, opacityMax: 0.07 },
    { count: 8,  speedMin: 0.55, speedMax: 1.0,  sizeMin: 13, sizeMax: 17, opacityMax: 0.11 },
    { count: 5,  speedMin: 1.0,  speedMax: 1.7,  sizeMin: 18, sizeMax: 26, opacityMax: 0.18 },
  ]

  const particles = []
  layers.forEach((layer, li) => {
    for (let i = 0; i < layer.count; i++) {
      const sym = symbols[Math.floor(Math.random() * symbols.length)]
      particles.push({
        x:          Math.random() * window.innerWidth,
        y:          window.innerHeight + Math.random() * 400,
        speed:      layer.speedMin + Math.random() * (layer.speedMax - layer.speedMin),
        opacity:    0,
        maxOpacity: 0.03 + Math.random() * layer.opacityMax,
        size:       layer.sizeMin + Math.random() * (layer.sizeMax - layer.sizeMin),
        symbol:     sym,
        drift:      (Math.random() - 0.5) * 0.15,
        layer:      li,
        positive:   /[+▲↑↗]/.test(sym),
      })
    }
  })

  // Fade suave no scroll — começa a desaparecer aos 40% da hero,
  // some completamente ao chegar na próxima seção
  let canvasOpacity = 1
  window.addEventListener('scroll', () => {
    const heroH   = hero.offsetHeight
    const raw     = window.scrollY / (heroH * 0.55)
    canvasOpacity = Math.max(0, 1 - raw)
    canvas.style.opacity = canvasOpacity
  }, { passive: true })

  let animId, lastTime = 0
  function animate (timestamp) {
    if (canvasOpacity <= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      animId = requestAnimationFrame(animate)
      return
    }

    // throttle ~30fps para não pesar na landing
    if (timestamp - lastTime < 34) { animId = requestAnimationFrame(animate); return }
    lastTime = timestamp

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.y -= p.speed
      p.x += p.drift

      // fade in ao surgir
      if (p.opacity < p.maxOpacity) p.opacity += 0.002

      // fade out no topo da hero (20% superior)
      if (p.y < canvas.height * 0.2) p.opacity -= 0.005

      // reposiciona quando sai de cena
      if (p.y < -40 || p.opacity <= 0) {
        p.y       = canvas.height + Math.random() * 150
        p.x       = Math.random() * canvas.width
        p.opacity = 0
        const s   = symbols[Math.floor(Math.random() * symbols.length)]
        p.symbol   = s
        p.positive = /[+▲↑↗]/.test(s)
        const l    = layers[p.layer]
        p.speed    = l.speedMin + Math.random() * (l.speedMax - l.speedMin)
      }

      ctx.globalAlpha = Math.max(0, p.opacity)
      // positivos em verde, negativos/neutros em índigo
      ctx.fillStyle = p.positive ? '#22c55e' : '#818cf8'
      ctx.font = `${Math.round(p.size)}px monospace`
      ctx.fillText(p.symbol, p.x, p.y)
    })

    ctx.globalAlpha = 1
    animId = requestAnimationFrame(animate)
  }
  animId = requestAnimationFrame(animate)
})()

// ── SCROLL REVEAL ───────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible')
      revealObs.unobserve(e.target)
    }
  })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

// ── NAV HIGHLIGHT ───────────────────────────────────────────
const navSections = document.querySelectorAll('[id]')
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 80
  navSections.forEach(s => {
    const link = document.querySelector(`nav a[href="#${s.id}"]`)
    if (!link) return
    const active = pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight
    link.classList.toggle('active', active)
  })
}, { passive: true })

// ── NEWSLETTER ──────────────────────────────────────────────
const form = document.getElementById('nl-form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = form.querySelector('input').value
    console.log('Newsletter:', email)
    // TODO: integrar com POST /api/newsletter
    form.style.display = 'none'
    document.getElementById('nl-success').style.display = 'block'
  })
}
