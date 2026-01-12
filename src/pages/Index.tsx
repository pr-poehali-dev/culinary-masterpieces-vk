import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Recipe = {
  id: number;
  title: string;
  category: string;
  image: string;
  time: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  rating: number;
  reviews: number;
  description: string;
  ingredients: string[];
  steps: string[];
};

const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Карбонара классическая',
    category: 'Паста',
    image: 'https://cdn.poehali.dev/projects/069fe387-4bf4-4f00-b434-af9c3059a839/files/b310782e-fd32-404f-80a7-7aaf20e29734.jpg',
    time: '25 мин',
    difficulty: 'Средний',
    rating: 4.8,
    reviews: 234,
    description: 'Традиционная итальянская паста с беконом, яйцами и сыром пармезан',
    ingredients: ['400г спагетти', '200г бекона', '4 яичных желтка', '100г пармезана', 'Черный перец', 'Соль'],
    steps: [
      'Отварите пасту в подсоленной воде до состояния al dente',
      'Обжарьте бекон до золотистой корочки',
      'Смешайте желтки с тертым пармезаном',
      'Смешайте горячую пасту с беконом и яичной смесью',
      'Подавайте немедленно с черным перцем'
    ]
  },
  {
    id: 2,
    title: 'Пицца Маргарита',
    category: 'Выпечка',
    image: 'https://cdn.poehali.dev/projects/069fe387-4bf4-4f00-b434-af9c3059a839/files/d0827d4b-c42e-419b-ae3f-34747c35778e.jpg',
    time: '45 мин',
    difficulty: 'Средний',
    rating: 4.9,
    reviews: 567,
    description: 'Классическая неаполитанская пицца с томатами, моцареллой и базиликом',
    ingredients: ['Тесто для пиццы', '200г томатного соуса', '250г моцареллы', 'Свежий базилик', 'Оливковое масло'],
    steps: [
      'Раскатайте тесто в круглую форму',
      'Намажьте томатным соусом',
      'Добавьте кусочки моцареллы',
      'Выпекайте при 250°C 12-15 минут',
      'Украсьте свежим базиликом'
    ]
  },
  {
    id: 3,
    title: 'Том Ям',
    category: 'Суп',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    time: '30 мин',
    difficulty: 'Сложный',
    rating: 4.7,
    reviews: 189,
    description: 'Острый тайский суп с креветками и ароматными травами',
    ingredients: ['500г креветок', 'Лемонграсс', 'Листья каффир-лайма', 'Галангал', 'Перец чили', 'Грибы', 'Помидоры черри'],
    steps: [
      'Приготовьте бульон с травами',
      'Добавьте креветки и грибы',
      'Добавьте помидоры и специи',
      'Варите 5-7 минут',
      'Подавайте с соком лайма'
    ]
  },
  {
    id: 4,
    title: 'Борщ украинский',
    category: 'Суп',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800',
    time: '1 час 30 мин',
    difficulty: 'Средний',
    rating: 4.9,
    reviews: 423,
    description: 'Традиционный украинский суп со свеклой и мясом',
    ingredients: ['500г говядины', '2 свеклы', '3 картофелины', 'Капуста', 'Морковь', 'Лук', 'Томатная паста'],
    steps: [
      'Сварите мясной бульон',
      'Обжарьте свеклу с морковью',
      'Добавьте овощи в бульон',
      'Варите до готовности овощей',
      'Подавайте со сметаной и чесноком'
    ]
  },
  {
    id: 5,
    title: 'Тирамису',
    category: 'Десерт',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
    time: '40 мин + охлаждение',
    difficulty: 'Средний',
    rating: 4.8,
    reviews: 312,
    description: 'Классический итальянский десерт с кофе и маскарпоне',
    ingredients: ['500г маскарпоне', '4 яйца', '200г печенья савоярди', 'Крепкий кофе', 'Какао-порошок', 'Сахар'],
    steps: [
      'Взбейте желтки с сахаром',
      'Добавьте маскарпоне',
      'Взбейте белки и введите в крем',
      'Окуните печенье в кофе',
      'Соберите слоями, охладите 4 часа'
    ]
  },
  {
    id: 6,
    title: 'Цезарь с курицей',
    category: 'Салат',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
    time: '20 мин',
    difficulty: 'Легкий',
    rating: 4.6,
    reviews: 289,
    description: 'Популярный салат с курицей, сухариками и соусом Цезарь',
    ingredients: ['2 куриные грудки', 'Салат Романо', 'Пармезан', 'Сухарики', 'Соус Цезарь', 'Чеснок'],
    steps: [
      'Обжарьте курицу с чесноком',
      'Нарежьте салат',
      'Приготовьте соус',
      'Смешайте все ингредиенты',
      'Посыпьте пармезаном'
    ]
  }
];

const categories = ['Все рецепты', 'Паста', 'Выпечка', 'Суп', 'Десерт', 'Салат'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все рецепты');
  const [userRatings, setUserRatings] = useState<{[key: number]: number}>({});

  const filteredRecipes = selectedCategory === 'Все рецепты' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  const handleRate = (recipeId: number, rating: number) => {
    setUserRatings(prev => ({ ...prev, [recipeId]: rating }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Легкий': return 'bg-green-100 text-green-800';
      case 'Средний': return 'bg-yellow-100 text-yellow-800';
      case 'Сложный': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg transition-transform duration-300 hover:rotate-12 hover:scale-110">
                <Icon name="ChefHat" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Вкусный Гид
                </h1>
                <p className="text-xs text-muted-foreground">Шедевры кулинарии</p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/069fe387-4bf4-4f00-b434-af9c3059a839/files/8e7de345-2d32-4940-ae64-1aa72523ba77.jpg" 
                    alt="Рецепты"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/069fe387-4bf4-4f00-b434-af9c3059a839/files/b310782e-fd32-404f-80a7-7aaf20e29734.jpg" 
                    alt="Категории"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/069fe387-4bf4-4f00-b434-af9c3059a839/files/88091773-1968-4dd7-9466-58e9fcff8f75.jpg" 
                    alt="Вопросы"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/069fe387-4bf4-4f00-b434-af9c3059a839/files/58e1ac7d-dd12-4f6e-b1b3-5d1e8e17f8d2.jpg" 
                    alt="Лучшие"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            </nav>

            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-md">
              <Icon name="Plus" size={20} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{
          backgroundImage: 'url(https://cdn.poehali.dev/files/130f35b1-2965-49bf-ae7b-bdf208f033ec.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px'
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div className="relative z-10 flex items-center justify-between px-12 py-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl tracking-wide">
                ШЕДЕВРЫ<br/>КУЛИНАРИИ
              </h2>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 rounded-full text-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Icon name="Bell" size={24} />
              ПОДПИШИСЬ
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`whitespace-nowrap rounded-full px-6 py-2 transition-all hover:scale-105 duration-300 animate-fade-in ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                    : 'border-2 hover:border-primary'
                }`}
                style={{animationDelay: `${index * 0.05}s`, animationFillMode: 'backwards'}}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <Dialog key={recipe.id}>
                <DialogTrigger asChild>
                  <Card 
                    className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                  >
                    <CardHeader className="p-0 relative">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge className="bg-white/90 text-foreground backdrop-blur-sm shadow-lg">
                            <Icon name="Clock" size={14} className="mr-1" />
                            {recipe.time}
                          </Badge>
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`${getDifficultyColor(recipe.difficulty)} backdrop-blur-sm shadow-lg font-semibold`}>
                            {recipe.difficulty}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="border-primary text-primary">
                          {recipe.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {recipe.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icon
                                key={star}
                                name="Star"
                                size={16}
                                className={star <= Math.floor(recipe.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold">{recipe.rating}</span>
                          <span className="text-xs text-muted-foreground">({recipe.reviews})</span>
                        </div>
                        <Icon name="ChevronRight" className="text-primary group-hover:translate-x-1 transition-transform" size={20} />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-4">{recipe.title}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-primary text-white px-4 py-2">
                        <Icon name="Clock" size={16} className="mr-2" />
                        {recipe.time}
                      </Badge>
                      <Badge className={`${getDifficultyColor(recipe.difficulty)} px-4 py-2`}>
                        <Icon name="Signal" size={16} className="mr-2" />
                        {recipe.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-primary text-primary px-4 py-2">
                        <Icon name="Tag" size={16} className="mr-2" />
                        {recipe.category}
                      </Badge>
                    </div>

                    <p className="text-lg text-muted-foreground">{recipe.description}</p>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border-2 border-primary/20">
                      <h4 className="font-bold text-lg mb-3 flex items-center">
                        <Icon name="Star" size={20} className="mr-2 text-primary" />
                        Оцените рецепт
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRate(recipe.id, star)}
                              className="transition-transform hover:scale-125"
                            >
                              <Icon
                                name="Star"
                                size={28}
                                className={
                                  star <= (userRatings[recipe.id] || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 hover:text-yellow-400'
                                }
                              />
                            </button>
                          ))}
                        </div>
                        {userRatings[recipe.id] && (
                          <span className="text-sm font-semibold text-primary">
                            Ваша оценка: {userRatings[recipe.id]}
                          </span>
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-2xl font-bold">{recipe.rating}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                              key={star}
                              name="Star"
                              size={18}
                              className={star <= Math.floor(recipe.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({recipe.reviews} отзывов)</span>
                      </div>
                    </div>

                    <Tabs defaultValue="ingredients" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="ingredients" className="font-semibold">
                          <Icon name="ShoppingBasket" size={18} className="mr-2" />
                          Ингредиенты
                        </TabsTrigger>
                        <TabsTrigger value="steps" className="font-semibold">
                          <Icon name="List" size={18} className="mr-2" />
                          Приготовление
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="ingredients" className="space-y-3 mt-4">
                        {recipe.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <span>{ingredient}</span>
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="steps" className="space-y-4 mt-4">
                        {recipe.steps.map((step, index) => (
                          <div key={index} className="flex gap-4 p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-lg hover:from-muted transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="pt-1">{step}</p>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary">
                        <Icon name="Heart" size={18} className="mr-2" />
                        В избранное
                      </Button>
                      <Button variant="outline" className="flex-1 border-2 border-primary hover:bg-primary hover:text-white">
                        <Icon name="Share2" size={18} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Icon name="ChefHat" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold">Вкусный Гид</h3>
              </div>
              <p className="text-white/80 text-sm">
                Делитесь рецептами и вдохновляйте друг друга на кулинарные подвиги
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Категории</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Паста и ризотто</li>
                <li>Выпечка</li>
                <li>Супы</li>
                <li>Десерты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Сообщество</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Лучшие рецепты</li>
                <li>Вопросы и ответы</li>
                <li>Кулинарные советы</li>
                <li>Конкурсы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">О проекте</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>О нас</li>
                <li>Контакты</li>
                <li>Правила</li>
                <li>Реклама</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            © 2024 Вкусный Гид. Шедевры кулинарии от сообщества
          </div>
        </div>
      </footer>
    </div>
  );
}