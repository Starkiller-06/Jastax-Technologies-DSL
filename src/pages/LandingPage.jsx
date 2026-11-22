import { Link, useNavigate } from 'react-router-dom'
import './LandingPage.css'

/* ── Small CSS-art tower for product cards ───────────────── */
function TowerArt() {
  return (
    <div className="pc-art pc-art--tower">
      <div className="tower-body">
        <div className="tower-led" />
        <div className="tower-stripe" />
        <div className="tower-led" style={{ background: '#7c7c7c', boxShadow: 'none' }} />
        <div className="tower-stripe" />
      </div>
      <div className="tower-base" />
    </div>
  )
}

/* ── Small CSS-art laptop for product cards ─────────────── */
function LaptopArt() {
  return (
    <div className="pc-art pc-art--laptop">
      <div className="laptop-screen">
        <div className="laptop-screen-inner">
          <div className="laptop-screen-line">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div className="laptop-base" />
    </div>
  )
}

/* ── Large device art for the chooser section ────────────── */
function DesktopDeviceArt() {
  return (
    <div className="device-art device-art--tower">
      <div className="d-tower-body">
        <div className="d-tower-led" />
        <div className="d-tower-stripe" />
        <div className="d-tower-vent">
          <div /><div /><div /><div />
        </div>
        <div className="d-tower-stripe" />
        <div className="d-tower-led" style={{ background: '#7c7c7c', boxShadow: 'none' }} />
      </div>
      <div className="d-tower-base" />
    </div>
  )
}

function LaptopDeviceArt() {
  return (
    <div className="device-art device-art--laptop">
      <div className="d-laptop-screen">
        <div className="d-laptop-screen-inner">
          <div className="d-laptop-line" />
          <div className="d-laptop-line" />
          <div className="d-laptop-line" />
          <div className="d-laptop-line" />
        </div>
      </div>
      <div className="d-laptop-base" />
    </div>
  )
}

/* ── Sample product data ─────────────────────────────────── */
const products = [
  {
    id: 'alpha-tower',
    name: 'Alpha Tower',
    desc: 'Six-core desktop powerhouse. DDR5 memory, NVMe SSD, ATX form factor.',
    type: 'desktop',
    Art: TowerArt,
  },
  {
    id: 'ultra-workstation',
    name: 'Ultra Workstation',
    desc: 'High-end desktop build for creators and engineers. 128 GiB max RAM.',
    type: 'desktop',
    Art: TowerArt,
  },
  {
    id: 'blade-slim',
    name: 'Blade Slim',
    desc: 'Featherweight laptop for everyday power users. All-day battery life.',
    type: 'laptop',
    Art: LaptopArt,
  },
  {
    id: 'pro-mobile',
    name: 'Pro Mobile',
    desc: 'Professional-grade laptop. Studio-quality display, premium chassis.',
    type: 'laptop',
    Art: LaptopArt,
  },
]

/* ── Main component ──────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            Jastax<span>.</span>
          </Link>
          <ul className="navbar__links">
            <li>
              <a href="#about" className="navbar__link">About us</a>
            </li>
            <li>
              <a href="#products" className="navbar__link">Products</a>
            </li>
            <li>
              <a href="#build" className="navbar__link navbar__link--cta" id="nav-build-cta">
                Build
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="about" aria-label="About Jastax">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__inner">
          <div className="hero__tag">Custom PC Builder</div>
          <h1 className="hero__heading">
            Build your perfect<br />
            <em>machine, your way.</em>
          </h1>

          <div className="hero__body-wrap">
            <p className="hero__body">
              We believe everyone deserves hardware that fits their lifestyle exactly.
              Jastax Technologies lets you configure every component from the ground up —
              CPU, memory, storage, graphics — with real-time compatibility validation
              so your build is always correct on the first try. No compromises.
              Just the machine you&apos;ve always wanted.
            </p>

            <div className="hero__image-box" role="img" aria-label="Custom PC visualization">
              <div className="hero__image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
                <span>Jastax Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="products section" id="products" aria-label="Our products">
        <div className="container">
          <h2 className="section-heading">Some of our products</h2>
          <div className="products__grid">
            {products.map(({ id, name, desc, type, Art }) => (
              <article
                key={id}
                className="product-card"
                role="button"
                tabIndex={0}
                aria-label={`Configure ${name}`}
                onClick={() => navigate(`/build/${type}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/build/${type}`)}
              >
                <div className="product-card__image">
                  <div className="product-card__image-inner">
                    <Art />
                  </div>
                </div>
                <div className="product-card__info">
                  <div className="product-card__name">{name}</div>
                  <div className="product-card__desc">{desc}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Device Chooser ── */}
      <section className="chooser section" id="build" aria-label="Choose device type">
        <div className="container">
          <h2 className="section-heading">Choose the device to build</h2>
          <div className="chooser__grid">

            {/* Desktop */}
            <Link
              to="/build/desktop"
              className="chooser-card"
              id="chooser-desktop"
              aria-label="Build a Desktop PC"
            >
              <div className="chooser-card__visual" aria-hidden="true">
                <DesktopDeviceArt />
              </div>
              <div className="chooser-card__label">
                <div className="chooser-card__title">Desktop</div>
                <div className="chooser-card__subtitle">
                  Full-tower power. Maximum upgradability.
                </div>
                <div className="chooser-card__arrow">
                  Start configuring →
                </div>
              </div>
            </Link>

            {/* Laptop */}
            <Link
              to="/build/laptop"
              className="chooser-card"
              id="chooser-laptop"
              aria-label="Build a Laptop"
            >
              <div className="chooser-card__visual" aria-hidden="true">
                <LaptopDeviceArt />
              </div>
              <div className="chooser-card__label">
                <div className="chooser-card__title">Laptop</div>
                <div className="chooser-card__subtitle">
                  Portable performance. Built for the road.
                </div>
                <div className="chooser-card__arrow">
                  Start configuring →
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <p>&copy; 2026 Jastax Technologies. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
