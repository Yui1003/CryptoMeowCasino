import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import JackpotBanner from "./JackpotBanner";
import { 
  User, 
  LogOut, 
  Settings,
  Wallet,
  TrendingUp,
  Upload,
  Download,
  Shield,
  Sparkles,
  Coins,
  Cat
} from "lucide-react";
import { useState, useEffect } from "react";

// Particle component
const Particle = ({ delay }: { delay: number }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const randomX = Math.random() * 100;
    const randomSize = Math.random() * 4 + 2;
    const randomDuration = Math.random() * 10 + 15;

    setStyle({
      left: `${randomX}%`,
      width: `${randomSize}px`,
      height: `${randomSize}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${randomDuration}s`,
    });
  }, [delay]);

  return <div className="particle" style={style} />;
};

// Coin rain component
const CoinRain = ({ delay }: { delay: number }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const randomX = Math.random() * 100;
    const randomDuration = Math.random() * 4 + 6;

    setStyle({
      left: `${randomX}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${randomDuration}s`,
    });
  }, [delay]);

  return (
    <div className="coin-rain" style={style}>
      💰
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [particles, setParticles] = useState<number[]>([]);
  const [coins, setCoins] = useState<number[]>([]);

  // Initialize particles and coin rain
  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i));
    setCoins(Array.from({ length: 8 }, (_, i) => i));
  }, []);

  if (!user && !["/login", "/register"].includes(location)) {
    return (
      <div className="relative min-h-screen background-animated flex items-center justify-center">
        {/* Particle System */}
        <div className="particles-container">
          {particles.map((particle, index) => (
            <Particle key={`particle-${particle}`} delay={index * 0.5} />
          ))}
          {coins.map((coin, index) => (
            <CoinRain key={`coin-${coin}`} delay={index * 1.2} />
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 text-crypto-pink/20 animate-float z-10">
          <Sparkles size={32} />
        </div>
        <div className="fixed top-40 right-20 text-crypto-pink/20 animate-float-delayed z-10">
          <Coins size={28} />
        </div>
        <div className="fixed bottom-32 left-20 text-crypto-pink/20 animate-float z-10">
          <Cat size={24} />
        </div>

        <div className="relative z-20 text-center animate-fade-in">
          <div className="w-20 h-20 gradient-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
            <span className="text-3xl">🐱</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-pink bg-clip-text text-transparent animate-jackpot">
            CryptoMeow
          </h1>
          <p className="text-gray-400 mb-8 animate-pulse">Please log in to access the casino</p>
          <div className="space-x-4">
            <Link href="/login">
              <Button className="gradient-pink hover:opacity-90 hover-scale transition-all">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-crypto-pink text-crypto-pink hover:bg-crypto-pink hover:text-white hover-scale transition-all">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen background-animated text-white relative">
      {/* Global Particle System */}
      {user && (
        <>
          <div className="particles-container">
            {particles.map((particle, index) => (
              <Particle key={`particle-${particle}`} delay={index * 0.5} />
            ))}
            {coins.map((coin, index) => (
              <CoinRain key={`coin-${coin}`} delay={index * 1.2} />
            ))}
          </div>

          {/* Floating decorative elements */}
          <div className="fixed top-20 left-10 text-crypto-pink/20 animate-float z-10">
            <Sparkles size={32} />
          </div>
          <div className="fixed top-40 right-20 text-crypto-pink/20 animate-float-delayed z-10">
            <Coins size={28} />
          </div>
          <div className="fixed bottom-32 left-20 text-crypto-pink/20 animate-float z-10">
            <Cat size={24} />
          </div>
        </>
      )}
      {/* Navigation Header */}
      <nav className="crypto-gray border-b border-crypto-pink/20 sticky top-0 z-50 glass relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 gradient-pink rounded-lg flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl">🐱</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold gradient-pink bg-clip-text text-transparent">
                CryptoMeow
              </h1>
            </Link>

            {/* Navigation Links */}
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Casino
                </Link>
                <Link href="/farm" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <span>🐱</span>
                  <span>Cat Farm</span>
                </Link>
                
                {/* Games Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-300 hover:text-white">
                      Games
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="crypto-gray border-crypto-pink/20">
                    <DropdownMenuItem asChild>
                      <Link href="/games/mines" className="flex items-center space-x-2">
                        <span>💣</span>
                        <span>Mines</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/games/crash" className="flex items-center space-x-2">
                        <span>📈</span>
                        <span>Crash</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/games/wheel" className="flex items-center space-x-2">
                        <span>🎡</span>
                        <span>Wheel</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/games/hilo" className="flex items-center space-x-2">
                        <span>🎯</span>
                        <span>Hi-Lo</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/games/dice" className="flex items-center space-x-2">
                        <span>🎲</span>
                        <span>Dice</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {user && (
              <>
                {/* Mobile Menu */}
                <div className="md:hidden ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white px-2">
                        ☰
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="crypto-gray border-crypto-pink/20">
                      <DropdownMenuItem asChild>
                        <Link href="/" className="flex items-center space-x-2">
                          <span>🎰</span>
                          <span>Casino</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/farm" className="flex items-center space-x-2">
                          <span>🐱</span>
                          <span>Cat Farm</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/games/mines" className="flex items-center space-x-2">
                          <span>💣</span>
                          <span>Mines</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/games/crash" className="flex items-center space-x-2">
                          <span>📈</span>
                          <span>Crash</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/games/wheel" className="flex items-center space-x-2">
                          <span>🎡</span>
                          <span>Wheel</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/games/hilo" className="flex items-center space-x-2">
                          <span>🎯</span>
                          <span>Hi-Lo</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/games/dice" className="flex items-center space-x-2">
                          <span>🎲</span>
                          <span>Dice</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* User Balance & Controls */}
                <div className="flex items-center space-x-2 md:space-x-4">
                  {/* Balance Display */}
                  <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 crypto-black/50 rounded-lg px-1 sm:px-2 md:px-4 py-1 sm:py-2 border border-crypto-pink/30">
                    <div className="text-center">
                      <div className="text-xs text-gray-400">Coins</div>
                      <div className="text-xs sm:text-sm md:text-lg font-bold crypto-green">
                        {parseFloat(user.balance).toFixed(2)}
                      </div>
                    </div>
                    <div className="w-px h-4 sm:h-6 md:h-8 bg-crypto-pink/30"></div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400">$MEOW</div>
                      <div className="text-xs sm:text-sm md:text-lg font-bold text-crypto-pink">
                        {parseFloat(user.meowBalance).toFixed(4)}
                      </div>
                    </div>
                  </div>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="crypto-pink hover:bg-crypto-pink-light flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1 sm:py-2">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline text-sm">{user.username}</span>
                        {user.isAdmin && (
                          <Badge variant="secondary" className="hidden md:flex ml-2">
                            <Shield className="w-3 h-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="crypto-gray border-crypto-pink/20">
                      <DropdownMenuItem asChild>
                        <Link href="/wallet" className="flex items-center space-x-2">
                          <Wallet className="w-4 h-4" />
                          <span>Wallet</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/deposit" className="flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>Deposit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/withdraw" className="flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Withdraw</span>
                        </Link>
                      </DropdownMenuItem>
                      {user.isAdmin && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={logout} className="flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {user && <JackpotBanner />}

      {/* Main Content */}
      <main className="relative z-20">{children}</main>
    </div>
  );
}