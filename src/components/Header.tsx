"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { MenuIcon, CloseIcon } from "@/components/icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-brand-700"
                      : "text-ink/70 hover:text-ink"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/buyers" variant="ghost">
            Join Buyer Network
          </Button>
          <Button href="/sell">Sell a Vehicle</Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="lg:hidden">
          <div className="space-y-1 border-t border-line bg-white px-5 pb-6 pt-3 sm:px-6">
            {mainNav.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-3 text-base font-medium ${
                    active ? "bg-brand-50 text-brand-700" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div
              className="mt-4 flex flex-col gap-3"
              onClick={() => setOpen(false)}
            >
              <Button href="/sell">Sell a Vehicle</Button>
              <Button href="/buyers" variant="secondary">
                Join the Buyer Network
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
