import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Home, TrendingUp, Menu, LogIn, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { isAuthenticated, removeToken } from "../utils/auth";
import { useState, useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [location.pathname]);

  const handleLogout = () => {
    removeToken();
    setIsAuth(false);
    navigate("/");
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Progress", href: "/progress", icon: TrendingUp },
  ];

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link key={item.name} to={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-[#7a1c1c] to-[#4a1111] text-[#f5f5dc] w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                भ
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#7a1c1c] to-[#4a1111] bg-clip-text text-transparent hidden sm:inline-block">
                Bharatanatyam Guru
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2 items-center">
              <NavLinks />
              <div className="h-6 w-px bg-slate-200 mx-2 text-transparent" aria-hidden="true" />
              {isAuth ? (
                <Button variant="ghost" className="text-[#7a1c1c]" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="bg-[#7a1c1c] hover:bg-[#5a1515] text-white">
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center md:hidden gap-2">
              {isAuth ? (
                <Button variant="ghost" size="icon" className="text-[#7a1c1c]" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="icon" className="text-[#7a1c1c]">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-600">
            © 2026 Bharatanatyam Guru. Master the divine dance, one step at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}