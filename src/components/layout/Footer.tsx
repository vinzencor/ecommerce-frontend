import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePublicPages } from '@/features/cms/hooks/useCMS'
import { Link } from 'react-router-dom'


const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { data: pages = [] } = usePublicPages()


  const footerLinks = [
    {
      title: 'Company',
      links: [
        ...pages.map((p: any) => ({ label: p.title, path: `/${p.slug}` })),
      ],
    },
    {
      title: 'For Vendors',
      links: [
        { label: 'Become A Seller', path: '/vendors/register' },
        { label: 'Admin Portal', path: 'http://localhost:5173/admin', external: true },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '/profile/support' },
        { label: 'My Orders', path: '/profile/orders' },
        { label: 'Today\'s Deals', path: '/deals' },
      ],
    },
  ]



  return (
    <footer className="w-full bg-black text-white pt-20 pb-10">
      <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 border-b border-neutral-800 pb-16">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black tracking-tighter">CODEEDEX</h2>
            <p className="text-neutral-400 max-w-xs leading-relaxed">
              Your one-stop destination for premium products and a seamless shopping experience.
            </p>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full border border-neutral-700 hover:bg-white hover:text-black transition-all"
              >
                <Facebook className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full border border-neutral-700 hover:bg-white hover:text-black transition-all"
              >
                <Instagram className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full border border-neutral-700 hover:bg-white hover:text-black transition-all"
              >
                <Twitter className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full border border-neutral-700 hover:bg-white hover:text-black transition-all"
              >
                <Mail className="size-4" />
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-lg font-bold tracking-tight">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link: any) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}

              </ul>

            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-neutral-500 text-sm font-medium">
            © {currentYear} Codeedex, All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
