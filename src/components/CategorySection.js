import ItemCard from './ItemCard'

const ICONS = {
  Cars: '🚗',
  Bikes: '🏍️',
  Phones: '📱',
  Computers: '💻',
}

const BADGE_CLASS = {
  Cars: 'badge-cars',
  Bikes: 'badge-bikes',
  Phones: 'badge-phones',
  Computers: 'badge-computers',
}

export default function CategorySection({ category, items }) {
  const icon = ICONS[category] || '📦'
  const badgeClass = BADGE_CLASS[category] || ''

  return (
    <section className="category-section" id={category}>

      {/* Header */}
      <div className="category-header">
        <span className={`category-badge ${badgeClass}`}>
          {icon} {category}
        </span>
        <span className="category-count">{items.length} items</span>
        <div className="category-divider" />
      </div>

      {/* Grid */}
      <div className="items-grid">
        {items.map((item) => (
          <ItemCard key={item.itemname} item={item} />
        ))}
      </div>

    </section>
  )
}
