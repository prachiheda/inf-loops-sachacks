import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold">ValidateAI</span>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Contact
          </a>
        </div>
        <div className="text-center text-sm text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} ValidateAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

