import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-light text-foreground">Zen Botanica</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#wellness" className="text-muted-foreground hover:text-foreground transition-colors">
              Wellness
            </a>
            <a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <a href="/products">Shop Now</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
