import '../app/globals.css'

export const metadata = {
  title: 'Catalog-app',
  description: 'multi-category product catalog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-inner">
            <span className="navbar-logo">ProductCatalog</span>
            <span className="navbar-sub">Browse all categories</span>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}
