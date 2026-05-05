const COLS = [
  {
    title: "CUSTOMER SERVICES",
    links: ["Contact Us", "Track Order", "Returns", "Shipping", "FAQs"],
  },
  {
    title: "ABOUT NNNOW",
    links: ["About Us", "Careers", "Press", "Loyalty Program", "Store Locator"],
  },
  {
    title: "POLICIES",
    links: ["Privacy Policy", "Terms of Use", "Returns Policy", "Cookies"],
  },
  {
    title: "BRANDS",
    links: ["U.S. Polo Assn.", "Tommy Hilfiger", "Calvin Klein", "Arrow", "Flying Machine"],
  },
];

export const Footer = () => (
  <footer className="mt-16 bg-secondary text-foreground/80 text-sm">
    <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      {COLS.map((c) => (
        <div key={c.title}>
          <h4 className="text-foreground font-bold tracking-wider text-xs mb-4">{c.title}</h4>
          <ul className="space-y-2">
            {c.links.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-border">
      <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-foreground/60">
        <span>© {new Date().getFullYear()} NNNOW by Arvind. All rights reserved.</span>
        <span>100% Authentic · Easy Returns · COD Available</span>
      </div>
    </div>
  </footer>
);
