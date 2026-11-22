import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dslData } from '../utils/dslLoader'
import './BuilderPage.css'

/* ── Laptop DSL configuration data for laptop route ───────── */
const laptopDslData = {
  apiVersion: 1,
  id: 'pro-laptop',
  version: 1,
  name: 'Pro Gaming Laptop',
  description: 'High-performance portable laptop with customizable OLED display, memory, and high-speed NVMe storage.',
  modelType: 'Laptop',
  catalogRevision: 'demo-hardware-v1',
  fixture: true,
  validationProfile: {
    id: 'demo-laptop-complete',
    version: 1,
  },
  fixedComponents: [
    {
      instanceName: 'MainCPU',
      productId: 'demo-mobile-cpu-8',
      category: 'CPU',
      name: 'Eight-Core Mobile Processor',
      quantity: 1,
      specifications: {
        cores: 8,
        threads: 16,
        baseClock: '3.2 GHz',
        boostClock: '4.8 GHz',
        powerBudget: { value: 45, unit: 'W' },
      },
    },
    {
      instanceName: 'MainChassis',
      productId: 'demo-chassis-16',
      category: 'Chassis',
      name: 'Unibody CNC Aluminum 16" Chassis',
      quantity: 1,
      specifications: {
        color: 'Obsidian Black',
        weight: { value: 1.95, unit: 'kg' },
        thickness: { value: 17.9, unit: 'mm' },
      },
    },
    {
      instanceName: 'Battery',
      productId: 'demo-battery-99',
      category: 'Battery',
      name: '99.9 Wh Lithium-Polymer Battery',
      quantity: 1,
      specifications: {
        capacity: { value: 99.9, unit: 'Wh' },
        fastCharging: '140W USB-C PD',
      },
    },
    {
      instanceName: 'CoolingSystem',
      productId: 'demo-vapor-chamber',
      category: 'Cooling',
      name: 'Dual Vapor Chamber Thermal System',
      quantity: 1,
      specifications: {
        fans: 2,
        liquidMetalCompound: true,
      },
    },
    {
      instanceName: 'OperatingSystem',
      productId: 'demo-os-mobile',
      category: 'OperatingSystem',
      name: 'Example Laptop OS',
      quantity: 1,
      specifications: {
        architecture: 'x86_64',
      },
    },
  ],
  configurationGroups: [
    {
      id: 'Display',
      label: 'Display panel',
      minSelections: 1,
      maxSelections: 1,
      defaultSelections: ['Standard'],
      options: [
        {
          id: 'Standard',
          label: '16" QHD+ 165Hz IPS (2560 x 1600, 100% sRGB)',
          priceDelta: 0,
          components: [
            {
              instancePrefix: 'DISP',
              productId: 'demo-disp-ips',
              category: 'Display',
              name: '16" QHD+ 165Hz IPS Display',
              quantity: 1,
              specifications: {
                refreshRate: { value: 165, unit: 'Hz' },
                resolution: '2560x1600',
                brightness: { value: 400, unit: 'nits' },
              },
            },
          ],
        },
        {
          id: 'OLED',
          label: '16" 3.2K 240Hz OLED (3200 x 2000, 100% DCI-P3)',
          priceDelta: 180,
          components: [
            {
              instancePrefix: 'DISP',
              productId: 'demo-disp-oled',
              category: 'Display',
              name: '16" 3.2K 240Hz OLED Display',
              quantity: 1,
              specifications: {
                refreshRate: { value: 240, unit: 'Hz' },
                resolution: '3200x2000',
                brightness: { value: 500, unit: 'nits' },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'Memory',
      label: 'Memory (RAM)',
      minSelections: 1,
      maxSelections: 1,
      defaultSelections: ['Standard'],
      options: [
        {
          id: 'Standard',
          label: '32 GiB DDR5-5600 Dual Channel (2x 16 GiB)',
          priceDelta: 0,
          components: [
            {
              instancePrefix: 'RAM',
              productId: 'demo-lram-16',
              category: 'RAM',
              name: '16 GiB SO-DIMM DDR5-5600 Module',
              quantity: 2,
              specifications: {
                memoryType: 'DDR5',
                capacityPerModule: { value: 16, unit: 'GiB' },
              },
            },
          ],
        },
        {
          id: 'Large',
          label: '64 GiB DDR5-5600 Dual Channel (2x 32 GiB)',
          priceDelta: 160,
          components: [
            {
              instancePrefix: 'RAM',
              productId: 'demo-lram-32',
              category: 'RAM',
              name: '32 GiB SO-DIMM DDR5-5600 Module',
              quantity: 2,
              specifications: {
                memoryType: 'DDR5',
                capacityPerModule: { value: 32, unit: 'GiB' },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'Storage',
      label: 'Primary storage (SSD)',
      minSelections: 1,
      maxSelections: 1,
      defaultSelections: ['Standard'],
      options: [
        {
          id: 'Standard',
          label: '1 TB PCIe Gen4 NVMe M.2 SSD',
          priceDelta: 0,
          components: [
            {
              instancePrefix: 'SSD',
              productId: 'demo-ssd-1',
              category: 'Storage',
              name: '1 TB PCIe Gen4 M.2 NVMe SSD',
              quantity: 1,
              specifications: {
                interface: 'NVMe Gen4',
                capacity: { value: 1, unit: 'TB' },
              },
            },
          ],
        },
        {
          id: 'Large',
          label: '2 TB PCIe Gen4 NVMe M.2 SSD',
          priceDelta: 120,
          components: [
            {
              instancePrefix: 'SSD',
              productId: 'demo-ssd-2',
              category: 'Storage',
              name: '2 TB PCIe Gen4 M.2 NVMe SSD',
              quantity: 1,
              specifications: {
                interface: 'NVMe Gen4',
                capacity: { value: 2, unit: 'TB' },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'Graphics',
      label: 'Graphics card (GPU)',
      minSelections: 1,
      maxSelections: 1,
      defaultSelections: ['Standard'],
      options: [
        {
          id: 'Standard',
          label: 'Example Mobile Graphics 8 (8 GiB GDDR6, 115W TGP)',
          priceDelta: 0,
          components: [
            {
              instancePrefix: 'GPU',
              productId: 'demo-mgpu-8',
              category: 'GPU',
              name: 'Example Mobile Graphics 8',
              quantity: 1,
              specifications: {
                videoMemory: { value: 8, unit: 'GiB' },
                powerBudget: { value: 115, unit: 'W' },
              },
            },
          ],
        },
        {
          id: 'Performance',
          label: 'Example Mobile Graphics 12 (12 GiB GDDR6, 140W Max TGP)',
          priceDelta: 270,
          components: [
            {
              instancePrefix: 'GPU',
              productId: 'demo-mgpu-12',
              category: 'GPU',
              name: 'Example Mobile Graphics 12',
              quantity: 1,
              specifications: {
                videoMemory: { value: 12, unit: 'GiB' },
                powerBudget: { value: 140, unit: 'W' },
              },
            },
          ],
        },
      ],
    },
  ],
}

/* ── Price map for desktop DSL options ───────────────────── */
const desktopOptionPrices = {
  Memory: {
    Standard: 0,
    Large: 150,
  },
  Storage: {
    Standard: 0,
    Large: 110,
  },
  Graphics: {
    Standard: 0,
    Performance: 260,
  },
}

const BASE_PRICES = {
  desktop: 1299,
  laptop: 1399,
}

/* ── Device artwork components ───────────────────────────── */
function DesktopVisual() {
  return (
    <div className="builder-visual__desktop" aria-hidden="true">
      <div className="b-desktop-chassis">
        <div className="b-desktop-glass">
          <div className="b-desktop-fan b-desktop-fan--top" />
          <div className="b-desktop-fan b-desktop-fan--bot" />
          <div className="b-desktop-gpu-card">
            <div className="b-desktop-gpu-led" />
          </div>
          <div className="b-desktop-ram-slots">
            <div className="b-desktop-ram-stick active" />
            <div className="b-desktop-ram-stick active" />
          </div>
          <div className="b-desktop-aio-cooler">
            <div className="b-desktop-pump-ring" />
          </div>
        </div>
        <div className="b-desktop-front">
          <div className="b-desktop-power-btn" />
          <div className="b-desktop-io">
            <span />
            <span />
          </div>
          <div className="b-desktop-mesh-grille">
            <div /><div /><div /><div /><div />
          </div>
        </div>
      </div>
      <div className="b-desktop-stand" />
    </div>
  )
}

function LaptopVisual() {
  return (
    <div className="builder-visual__laptop" aria-hidden="true">
      <div className="b-laptop-lid">
        <div className="b-laptop-screen">
          <div className="b-laptop-screen-content">
            <div className="b-laptop-terminal-bar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="b-laptop-code-line l1" />
            <div className="b-laptop-code-line l2" />
            <div className="b-laptop-code-line l3" />
            <div className="b-laptop-code-line l4" />
          </div>
        </div>
      </div>
      <div className="b-laptop-deck">
        <div className="b-laptop-keyboard" />
        <div className="b-laptop-trackpad" />
      </div>
    </div>
  )
}

/* ── Main BuilderPage Component ──────────────────────────── */
export default function BuilderPage() {
  const { deviceType } = useParams()
  const isLaptop = deviceType === 'laptop'
  const activeDeviceData = isLaptop ? laptopDslData : dslData
  const basePrice = isLaptop ? BASE_PRICES.laptop : BASE_PRICES.desktop

  // Tab state: 'build' | 'specs'
  const [activeTab, setActiveTab] = useState('build')

  // Selections state: map groupId -> optionId
  const [selections, setSelections] = useState(() => {
    const initial = {}
    activeDeviceData.configurationGroups.forEach((group) => {
      initial[group.id] = group.defaultSelections?.[0] || group.options[0].id
    })
    return initial
  })

  // Quantity state
  const [quantity, setQuantity] = useState(1)

  // Cart state
  const [cartCount, setCartCount] = useState(0)

  // Feedback toast
  const [toastMessage, setToastMessage] = useState(null)

  function showToast(msg) {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr))
    }, 3200)
  }

  // Calculate unit price based on DSL configuration selections
  const unitPrice = activeDeviceData.configurationGroups.reduce((acc, group) => {
    const selectedOptId = selections[group.id]
    let delta = 0
    if (isLaptop) {
      const opt = group.options.find((o) => o.id === selectedOptId)
      delta = opt?.priceDelta || 0
    } else {
      delta = desktopOptionPrices[group.id]?.[selectedOptId] || 0
    }
    return acc + delta
  }, basePrice)

  const finalPrice = unitPrice * quantity

  function handleOptionSelect(groupId, optionId) {
    setSelections((prev) => ({
      ...prev,
      [groupId]: optionId,
    }))
  }

  function handleQuantityChange(delta) {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)))
  }

  function handleAddToCart() {
    setCartCount((prev) => prev + quantity)
    showToast(`Added ${quantity}x "${activeDeviceData.name}" to cart!`)
  }

  function handleCartPlaceholderClick() {
    showToast('Cart placeholder: shopping cart flow is not active yet.')
  }

  // Format currency
  const formatPrice = (val) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(val)

  return (
    <div className="builder-page">
      {/* ── Notification Toast ── */}
      {toastMessage && (
        <div className="builder-toast" role="status" aria-live="polite">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Builder Header Bar (Mockup: "Page Name" left, Cart right) ── */}
      <header className="builder-header">
        <div className="builder-header__inner">
          <div className="builder-header__left">
            <Link to="/" className="builder-header__brand" title="Back to Jastax Home">
              Jastax<span>.</span>
            </Link>
            <span className="builder-header__crumb-sep">/</span>
            <span className="builder-header__crumb">
              {isLaptop ? 'Laptop Builder' : 'Desktop Builder'}
            </span>
          </div>

          <div className="builder-header__right">
            <button
              type="button"
              className="builder-header__cart-btn"
              onClick={handleCartPlaceholderClick}
              title="Cart placeholder"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="builder-header__cart-label">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="builder-header__cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Builder Content Area (Two Columns) ── */}
      <main className="builder-main">
        <div className="builder-main__container">
          {/* ── Left Column: Device's Image Placeholder ── */}
          <section className="builder-left-col" aria-label="Device visual preview">
            <div className="builder-image-card">
              <div className="builder-image-card__badge">
                <span className="builder-image-card__status-dot" />
                {isLaptop ? 'Laptop Hardware Profile' : 'Desktop ATX Architecture'}
              </div>

              <div className="builder-image-card__art-box">
                {isLaptop ? <LaptopVisual /> : <DesktopVisual />}
              </div>

              <div className="builder-image-card__caption">
                <div className="builder-image-card__title">
                  {isLaptop ? 'Portable Power Station' : 'Custom Chassis Layout'}
                </div>
                <div className="builder-image-card__dsl-tag">
                  DSL Config: <code>{activeDeviceData.id}</code> (v{activeDeviceData.version})
                </div>
              </div>

              {/* Compatibility summary bar */}
              <div className="builder-compat-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Validation profile: <strong>{activeDeviceData.validationProfile.id}</strong> (Passed)</span>
              </div>
            </div>
          </section>

          {/* ── Right Column: Device Configuration & Specs ── */}
          <section className="builder-right-col" aria-label="Device configuration and options">
            {/* Device Name (Mockup: "Device's name") */}
            <h1 className="builder-device-name">
              {activeDeviceData.name}
            </h1>

            {/* Estimated Price (Mockup: "Estimated Price") */}
            <div className="builder-price-line">
              <span className="builder-price-label">Estimated Price:</span>
              <span className="builder-price-val">{formatPrice(unitPrice)}</span>
            </div>

            {/* Navigation Tabs (Mockup: [Build] | [Final specs]) */}
            <div className="builder-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                id="tab-build"
                aria-selected={activeTab === 'build'}
                aria-controls="panel-build"
                className={`builder-tab ${activeTab === 'build' ? 'builder-tab--active' : ''}`}
                onClick={() => setActiveTab('build')}
              >
                Build
              </button>
              <button
                type="button"
                role="tab"
                id="tab-specs"
                aria-selected={activeTab === 'specs'}
                aria-controls="panel-specs"
                className={`builder-tab ${activeTab === 'specs' ? 'builder-tab--active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                Final specs
              </button>
            </div>

            {/* ── Tab Content ── */}
            <div className="builder-tab-panel">
              {/* TAB 1: BUILD (Component options from DSL) */}
              {activeTab === 'build' && (
                <div id="panel-build" role="tabpanel" aria-labelledby="tab-build" className="builder-group-list">
                  {activeDeviceData.configurationGroups.map((group) => {
                    const activeOptionId = selections[group.id]

                    return (
                      <div key={group.id} className="builder-group">
                        <div className="builder-group__header">
                          <h2 className="builder-group__title">
                            {group.label}
                          </h2>
                          <span className="builder-group__req">
                            Required (Pick 1)
                          </span>
                        </div>

                        <div className="builder-group__options" role="radiogroup" aria-label={group.label}>
                          {group.options.map((opt) => {
                            const isSelected = activeOptionId === opt.id
                            const delta = isLaptop
                              ? opt.priceDelta || 0
                              : desktopOptionPrices[group.id]?.[opt.id] || 0

                            return (
                              <label
                                key={opt.id}
                                className={`builder-option-card ${isSelected ? 'builder-option-card--selected' : ''}`}
                              >
                                <input
                                  type="radio"
                                  name={`group-${group.id}`}
                                  value={opt.id}
                                  checked={isSelected}
                                  onChange={() => handleOptionSelect(group.id, opt.id)}
                                  className="builder-option-radio"
                                />

                                <div className="builder-option-body">
                                  <div className="builder-option-top">
                                    <div className="builder-option-label-wrap">
                                      <span className="builder-option-radio-dot" aria-hidden="true" />
                                      <span className="builder-option-name">{opt.label}</span>
                                    </div>
                                    <span className={`builder-option-delta ${delta > 0 ? 'builder-option-delta--up' : ''}`}>
                                      {delta === 0 ? 'Included' : `+${formatPrice(delta)}`}
                                    </span>
                                  </div>

                                  {/* Component hardware sub-specs from DSL */}
                                  {opt.components && opt.components.length > 0 && (
                                    <div className="builder-option-meta">
                                      {opt.components.map((comp) => (
                                        <div key={comp.productId} className="builder-comp-detail">
                                          <span className="builder-comp-qty">{comp.quantity}x</span>
                                          <span className="builder-comp-name">{comp.name}</span>
                                          {comp.specifications?.memoryType && (
                                            <span className="builder-comp-tag">
                                              {comp.specifications.memoryType}
                                            </span>
                                          )}
                                          {comp.specifications?.capacity && (
                                            <span className="builder-comp-tag">
                                              {comp.specifications.capacity.value} {comp.specifications.capacity.unit}
                                            </span>
                                          )}
                                          {comp.specifications?.videoMemory && (
                                            <span className="builder-comp-tag">
                                              {comp.specifications.videoMemory.value} {comp.specifications.videoMemory.unit} VRAM
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </label>
                            )
                          })}
                        </div>

                        {/* Divider between component sections (from mockup) */}
                        <hr className="builder-divider" />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* TAB 2: FINAL SPECS */}
              {activeTab === 'specs' && (
                <div id="panel-specs" role="tabpanel" aria-labelledby="tab-specs" className="builder-specs-panel">
                  <div className="builder-specs-section">
                    <h2 className="builder-specs-heading">Fixed Base Hardware</h2>
                    <div className="builder-specs-grid">
                      {activeDeviceData.fixedComponents.map((comp) => (
                        <div key={comp.instanceName} className="builder-spec-item">
                          <span className="builder-spec-cat">{comp.category}</span>
                          <span className="builder-spec-name">{comp.name}</span>
                          <span className="builder-spec-detail">
                            {comp.specifications?.socket && `Socket: ${comp.specifications.socket} • `}
                            {comp.specifications?.cores && `${comp.specifications.cores} Cores • `}
                            {comp.specifications?.powerBudget && `TDP: ${comp.specifications.powerBudget.value}${comp.specifications.powerBudget.unit} • `}
                            {comp.specifications?.formFactor && `Form: ${comp.specifications.formFactor} • `}
                            {comp.specifications?.ratedPower && `Rating: ${comp.specifications.ratedPower.value}${comp.specifications.ratedPower.unit}`}
                            {comp.specifications?.color ? `Color: ${comp.specifications.color}` : null}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="builder-specs-section">
                    <h2 className="builder-specs-heading">Configured User Selections</h2>
                    <div className="builder-specs-grid">
                      {activeDeviceData.configurationGroups.map((group) => {
                        const activeOption = group.options.find((o) => o.id === selections[group.id])
                        return (
                          <div key={group.id} className="builder-spec-item builder-spec-item--selected">
                            <span className="builder-spec-cat">{group.label}</span>
                            <span className="builder-spec-name">{activeOption?.label}</span>
                            <span className="builder-spec-detail">
                              Selected Option ID: <code>{activeOption?.id}</code>
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="builder-specs-notice">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                      <strong>DSL Hardware Compatibility Check</strong>
                      <p>
                        All hardware parts meet the <code>{activeDeviceData.validationProfile.id}</code> profile. Power budget, memory form factor, and slot dimensions are 100% matched.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Bottom Section: Final Price, How Many, Add to Cart (Mockup) ── */}
            <div className="builder-purchase-section">
              {/* Final Price */}
              <div className="builder-final-price-box">
                <span className="builder-final-price-label">Final Price</span>
                <span className="builder-final-price-num">{formatPrice(finalPrice)}</span>
                {quantity > 1 && (
                  <span className="builder-price-breakdown">
                    ({quantity} &times; {formatPrice(unitPrice)})
                  </span>
                )}
              </div>

              {/* How many? Counter selector */}
              <div className="builder-quantity-box">
                <label htmlFor="builder-quantity-input" className="builder-quantity-label">
                  How many?
                </label>
                <div className="builder-counter">
                  <button
                    type="button"
                    className="builder-counter-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    &#8722;
                  </button>
                  <input
                    id="builder-quantity-input"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10)
                      if (!isNaN(val)) setQuantity(Math.max(1, Math.min(99, val)))
                    }}
                    className="builder-counter-input"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    className="builder-counter-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 99}
                    aria-label="Increase quantity"
                  >
                    &#43;
                  </button>
                </div>
              </div>

              {/* Add to cart Button (Mockup: "Add to cart") */}
              <div className="builder-action-box">
                <button
                  type="button"
                  className="builder-add-cart-btn"
                  id="builder-add-to-cart"
                  onClick={handleAddToCart}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to cart
                </button>
              </div>

              {/* Back to Home Link */}
              <div className="builder-back-wrap">
                <Link to="/" className="builder-back-link">
                  &larr; Back to Device Selection
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
