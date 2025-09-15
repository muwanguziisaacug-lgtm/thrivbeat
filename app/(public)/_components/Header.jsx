'use client'
import { useState, useTransition } from "react";
import { Menu, X, Heart, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserDropDown } from "./UserDropDown";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data: session, status} = authClient.useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
    const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully');
            router.push('/');
          },
          onError: () => toast.error('Failed to log out. Please try again'),
        },
      });
    });
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/shop" },
    { name: "Courses", href: "/courses" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background text-foreground shadow-sm border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-5 h-5 text-white fill-current" />
            </motion.div>
            <span className="text-xl font-bold text-foreground">ThrivBeat</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-foreground hover:text-red-600 font-medium transition-colors duration-200 relative"
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
      <motion.div 
        className="hidden md:flex items-center space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {status === 'loading' ? (
          <Button variant="outline" size="sm" disabled>
            <Loader2 className="w-4 h-4 animate-spin" />
          </Button>
        ) : session ? (
          <>
            {/* 1) User menu trigger: */}
            <UserDropDown session={ session }/>  
          </>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </motion.div>
        )}

        <Link href="/shop" passHref>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Subscribe Now
          </Button>
        </Link>
        <ModeToggle />
      </motion.div>


          {/* Mobile menu button */}
          <div className="md:hidden flex">
          <motion.div 
              className="flex md:hidden items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {status === 'loading' ? (
                <Button variant="outline" size="sm" disabled>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
              ) : session ? (
                <>
                  <UserDropDown session={ session }/>  
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </motion.div>
              )}

</motion.div>

            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden border-t bg-background"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-3 py-2 hover:text-red-600 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-4 space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {status === 'loading' ? (
                    <Button variant="outline" size="sm" disabled>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </Button>
                  ) : session ? (
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <><LogOut className="w-4 h-4 mr-1" />Log Out</>
                      )}
                    </Button>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                    
                    </motion.div>
                  )}
                  <div
                    className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] px-4 py-2"
                    style={{ userSelect: 'none' }}
                    tabIndex={0}
                    role="button"
                  >
                    Change Theme
                  </div>
                  <ModeToggle />

                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;