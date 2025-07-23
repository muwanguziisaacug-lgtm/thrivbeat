
import { Heart, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";



const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/story" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Community", href: "/community" },
    ],
    legal: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Medical Disclaimer", href: "/disclaimer" },
      { name: "Accessibility", href: "/accessibility" },
    ],
    resources: [
      { name: "Exercise Library", href: "/exercises" },
      { name: "Health Articles", href: "/articles" },
      { name: "Success Stories", href: "/stories" },
      { name: "Free Resources", href: "/resources" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-2xl font-bold">ThrivBeat</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Empowering mature adults with safe, guided exercise programs designed 
              to support chronic-condition recovery and lifelong heart health.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get health tips, exercise updates, and inspiring stories delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; 2024 ThrivBeat. All rights reserved.</p>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm">
                Made with <Heart className="w-4 h-4 inline fill-current text-red-500" /> for your health
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;