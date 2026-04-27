import catalog from '../../../data/data.json'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return catalog.map((item) => ({
    id: encodeURIComponent(item.itemname),
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const name = decodeURIComponent(id)
  const item = catalog.find((i) => i.itemname === name)
  return {
    title: item ? `${item.itemname} — Catalog` : 'Not Found',
  }
}

const BADGE_CLASS = {
  Cars: 'badge-cars',
  Bikes: 'badge-bikes',
  Phones: 'badge-phones',
  Computers: 'badge-computers',
}

export default async function ItemDetailPage({ params }) {
  const { id } = await params
  const name = decodeURIComponent(id)
  const item = catalog.find((i) => i.itemname === name)

  if (!item) notFound()

  const badgeClass = BADGE_CLASS[item.category] || ''

  const related = catalog
    .filter((i) => i.category === item.category && i.itemname !== item.itemname)
    .slice(0, 4)

  return (
    <main className="detail-container">

      <Link href="/" className="back-btn">
        ← Back to catalog
      </Link>

      <div className="detail-card">

        <div className="detail-image-wrap">
          <Image
            src={item.image}
            alt={item.itemname}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, 50vw"
            unoptimized
          />
          <span className={`detail-cat-badge category-badge ${badgeClass}`}>
            {item.category}
          </span>
        </div>

        <div className="detail-info">
          <div>
            <h1 className="detail-name">{item.itemname}</h1>

            <p className="specs-label">Specifications</p>

            {item.itemprops.map((prop) => (
              <div key={prop.label} className="spec-row">
                <span className="spec-label">{prop.label}</span>
                <span className="spec-value">{prop.value}</span>
              </div>
            ))}
          </div>

          <div className="detail-footer">
            Category: <strong>{item.category}</strong>
            &nbsp;·&nbsp;
            {item.itemprops.length} spec{item.itemprops.length !== 1 ? 's' : ''}
          </div>
        </div>

      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2 className="related-title">More in {item.category}</h2>
          <div className="related-grid">
            {related.map((rel) => (
              <Link key={rel.itemname} href={`/item/${encodeURIComponent(rel.itemname)}`}>
                <div className="related-card">
                  <div className="related-card-img-wrap">
                    <Image
                      src={rel.image}
                      alt={rel.itemname}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="25vw"
                      unoptimized
                    />
                  </div>
                  <div className="related-card-body">
                    <p className="related-card-name">{rel.itemname}</p>
                    {rel.itemprops[0] && (
                      <p className="related-card-prop">
                        {rel.itemprops[0].label}: {rel.itemprops[0].value}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </main>
  )
}
