export function Footer() {
  return (
    <footer className="border-t bg-background">
      {/* Top footer */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} InvoicePro. All rights reserved.
        </p>

        <nav className="flex gap-6">
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </a>
          <a
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Brand section */}
      <div className="bg-muted/40 dark:bg-muted/20">
        <p
          className="
            text-center select-none font-extrabold tracking-tight
            text-[18vw] md:text-[14vw] leading-none
            text-foreground/10 dark:text-foreground/5
          "
        >
          INVOICEPRO
        </p>
      </div>
    </footer>
  )
}
