import catalog from '../data/data.json'
import CategorySection from '../components/CategorySection'

export default function HomePage() {
  const grouped = catalog.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  return (
    <main className="home-container">

      <div className="home-header">
        <h1 className="home-title">Product Catalog</h1>
        <p className="home-subtitle">
          Browse {catalog.length} items across {categories.length} categories
        </p>

        <div className="cat-pills">
          {categories.map((cat) => (
            <a key={cat} href={`#${cat}`} className="cat-pill">
              {cat} ({grouped[cat].length})
            </a>
          ))}
        </div>
      </div>

      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          items={grouped[category]}
        />
      ))}

    </main>
  )
}
