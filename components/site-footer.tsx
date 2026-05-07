import { Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-[14px] font-medium text-muted-foreground/80 transition-opacity hover:text-muted-foreground">
          <span>Copyright &copy; 2026 iDevice Model Identifier.</span>
          <span>All Rights Reserved.</span>
          <span className="inline-flex items-center gap-1">
            <span>Made with</span>
            <Heart
              className="footer-heart-glow size-3 text-rose-500"
              aria-hidden="true"
            />
            <span>by Zig Zag</span>
          </span>
        </p>
      </div>
    </footer>
  )
}
