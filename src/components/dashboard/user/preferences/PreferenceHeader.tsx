import { Settings2 } from "lucide-react"

export function PreferencesHeader() {
  return (
    <div className="text-center space-y-2">
      <div className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-2">
        <Settings2 className="w-4 h-4" />
        <span>Customize Recommendations</span>
      </div>
      {/* <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Your Preferences</h1> */}
      <p className="text-sm text-muted-foreground max-w-xl mx-auto">
        Select genres you enjoy and adjust how different aspects influence your recommendations.
      </p>
    </div>
  )
}
