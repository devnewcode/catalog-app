import Link from 'next/link'
import Image from 'next/image'

export default function ItemCard({ item }) {
  const id = encodeURIComponent(item.itemname)
  const firstProp = item.itemprops[0]

  return (
    <Link href={`/item/${id}`}>
      <div className="item-card">
        <div className="item-card-image-wrap">
          <Image
            src={item.image}
            alt={item.itemname}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="item-card-body">
          <p className="item-card-name">{item.itemname}</p>

          {firstProp && (
            <p className="item-card-prop">
              <span>{firstProp.label}:</span> {firstProp.value}
            </p>
          )}

          <span className="item-card-link">View details →</span>
        </div>
      </div>
    </Link>
  )
}
