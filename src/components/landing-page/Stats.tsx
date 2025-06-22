import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    number: "1M+",
    label: "Movies Analyzed",
    description: "Comprehensive database of films",
  },
  {
    number: "50K+",
    label: "Active Users",
    description: "Growing community of movie lovers",
  },
  {
    number: "95%",
    label: "Accuracy Rate",
    description: "Highly precise recommendations",
  },
  {
    number: "24/7",
    label: "Real-time Updates",
    description: "Continuous algorithm improvements",
  },
]

export function Stats() {
  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Trusted by Movie Enthusiasts</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Join thousands of users who have discovered their new favorite movies through our intelligent recommendation
            system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
