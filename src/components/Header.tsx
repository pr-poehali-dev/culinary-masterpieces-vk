import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`text-4xl transition-transform duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              👨‍🍳
            </div>
            <div>
              <h1 className={`font-bold transition-all duration-300 ${
                scrolled ? 'text-2xl' : 'text-3xl'
              } bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent`}>
                Вкусная планета
              </h1>
              <p className="text-xs text-muted-foreground">Кулинарные рецепты мира</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#recipes" className="text-sm font-medium hover:text-primary transition-colors">
              Рецепты
            </a>
            <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
              Категории
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              О нас
            </a>
            <Button size="sm" className="ml-2">
              <Icon name="ChefHat" size={16} className="mr-2" />
              Добавить рецепт
            </Button>
          </nav>

          <Button size="sm" variant="outline" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
