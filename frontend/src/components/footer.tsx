import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container relative w-full max-w-[1800px] py-8 md:py-12">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">ValidateAI</span>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <a href="#" className="text-base text-muted-foreground hover:underline">
              Terms
            </a>
            <a href="#" className="text-base text-muted-foreground hover:underline">
              Privacy
            </a>
            <a href="#" className="text-base text-muted-foreground hover:underline">
              Contact
            </a>
          </div>
          <div className="text-center text-base text-muted-foreground md:text-right">
            &copy; {new Date().getFullYear()} ValidateAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

