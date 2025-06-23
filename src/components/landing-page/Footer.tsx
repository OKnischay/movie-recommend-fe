"use client"

import { useState } from "react"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"



const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "How it Works", href: "#" },
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "FAQ", href: "#" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ]
  }
]

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 border-t border-slate-200/50 dark:border-slate-800/50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative px-4 py-12">
        {/* Simple Footer Content */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Brand Section - Simplified */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <Film className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                CineMatch
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover your next favorite movie with our AI-powered recommendation system.
            </p>

            {/* Simple stats */}
            <div className="flex space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-slate-900 dark:text-white">50K+</div>
                <div className="text-slate-600 dark:text-slate-400">Users</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900 dark:text-white">4.9</div>
                <div className="text-slate-600 dark:text-slate-400">Rating</div>
              </div>
            </div>
          </div>

          {/* Navigation Links - Simplified */}
          {footerLinks.slice(0, 2).map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Simple Newsletter Section */}
        

        {/* Bottom Section - Simplified */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-3 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            &copy; {new Date().getFullYear()} CineMatch. All rights reserved.
          </p>
        </div>
      </div>

      {/* Minimal decorative elements */}
      {/* <div className="absolute bottom-4 right-4 opacity-10">
        <Film className="w-8 h-8 text-blue-500" />
      </div> */}
    </footer>
  )
}