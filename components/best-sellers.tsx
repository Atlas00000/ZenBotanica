import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Tranquil Evening Blend",
    description: "Chamomile, lavender, and lemon balm for peaceful nights",
    price: "$24.99",
    image: "/elegant-tea-package-with-chamomile-flowers.png",
    benefits: ["Promotes relaxation", "Improves sleep quality", "Reduces anxiety"],
  },
  {
    name: "Morning Clarity Tea",
    description: "Ginkgo, green tea, and mint for mental focus",
    price: "$28.99",
    image: "/premium-green-tea-package-with-mint-leaves.png",
    benefits: ["Enhances focus", "Boosts energy", "Supports memory"],
  },
  {
    name: "Stress Relief Blend",
    description: "Ashwagandha, holy basil, and rose petals for calm",
    price: "$32.99",
    image: "/herbal-tea-package-with-rose-petals-and-herbs.png",
    benefits: ["Reduces stress", "Balances mood", "Promotes calm"],
  },
  {
    name: "Digestive Harmony",
    description: "Ginger, fennel, and peppermint for gut wellness",
    price: "$26.99",
    image: "/digestive-tea-package-with-ginger-and-mint.png",
    benefits: ["Aids digestion", "Soothes stomach", "Reduces bloating"],
  },
]

export function BestSellers() {
  return (
    <section id="products" className="py-20 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            Best Selling Blends
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Discover our most beloved tea blends, each carefully crafted to bring you moments of peace and wellness in
            every cup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden"
            >
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                    <div className="text-center text-primary-foreground">
                      <h4 className="font-serif text-lg mb-3">Benefits:</h4>
                      <ul className="space-y-1 text-sm">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center justify-center">
                            <span className="w-1 h-1 bg-primary-foreground rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium text-foreground mb-3 text-balance">{product.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-medium text-primary">{product.price}</span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-transform duration-200"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-200"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
