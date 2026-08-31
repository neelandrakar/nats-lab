"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to load session in Navbar:", err);
      }
    };
    fetchSession();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        setIsOpen(false);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getHref = (hash) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <nav>
      <div className="container nav-inner">
        <Link href="/" className="logo">
          NATS<span>Lab</span>
        </Link>
        
        {/* Desktop Links - hidden automatically at 850px by style.css */}
        <div className="links">
          <Link href={getHref("#services")}>Services</Link>
          <Link href={getHref("#approach")}>Approach</Link>
          
          {user ? (
            <>
              {user.role === "ADMIN" ? (
                <Link href="/admin">Admin</Link>
              ) : (
                <Link href="/user">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="hover:text-[#171717] text-left cursor-pointer" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>

        {/* Start a Project / Hamburger */}
        <div className="flex items-center gap-4">
          <Link href={getHref("#contact")} className="btn btn-dark md-btn-desktop">
            Start a Project
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md-menu-toggle text-[#6d6d68] hover:text-[#171717] focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md-mobile-menu border-t border-[#deddd6] bg-[#f7f6f2] px-[18px] py-4 space-y-4">
          <div className="flex flex-col gap-3 font-medium text-sm text-[#6d6d68]">
            <Link href={getHref("#services")} onClick={() => setIsOpen(false)} className="hover:text-[#171717] py-1">
              Services
            </Link>
            <Link href={getHref("#approach")} onClick={() => setIsOpen(false)} className="hover:text-[#171717] py-1">
              Approach
            </Link>
            
            {user ? (
              <>
                {user.role === "ADMIN" ? (
                  <Link href="/admin" onClick={() => setIsOpen(false)} className="hover:text-[#171717] py-1">
                    Admin
                  </Link>
                ) : (
                  <Link href="/user" onClick={() => setIsOpen(false)} className="hover:text-[#171717] py-1">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="hover:text-[#171717] text-left py-1 cursor-pointer" style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-[#171717] py-1">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="hover:text-[#171717] py-1">
                  Sign Up
                </Link>
              </>
            )}
            
            <Link href={getHref("#contact")} onClick={() => setIsOpen(false)} className="btn btn-dark w-full text-center mt-2">
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
