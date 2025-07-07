"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, TrendingUp, Heart,  Star } from "lucide-react"

export function NavigationTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("home")

type Tab = {
  id: string
  label: string
  icon: React.ElementType
  href: string
  badge?: React.ReactNode
}

const tabs: Tab[] = [
  {
    id: "home",
    label: "For You",
    icon: Home,
    href: "/user",
  },
  {
    id: "trending",
    label: "Trending",
    icon: TrendingUp,
    href: "/user/trending",
  },
  {
    id: "watchlist",
    label: "Watchlist",
    icon: Heart,
    href: "/user/watchlist",
  },
  // {
  //   id: "history",
  //   label: "History",
  //   icon: Clock,
  //   href: "/user/history",
  // },
  {
    id: "favorites",
    label: "Favorites",
    icon: Star,
    href: "/user/favorites",
  },
]

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.href === pathname)
    if (currentTab) {
      setActiveTab(currentTab.id)
    }
  }, [pathname])

  const handleTabClick = (tab: typeof tabs[number]) => {
    setActiveTab(tab.id)
    router.push(tab.href)
  }

  return (
    <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => handleTabClick(tab)}
          className="flex items-center space-x-2 relative"
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
          {tab.badge && (
            <Badge variant={activeTab === tab.id ? "secondary" : "outline"} className="ml-1 text-xs h-5">
              {tab.badge}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}
