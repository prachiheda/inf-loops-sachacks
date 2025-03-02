import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className=" w-full min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
} 