export interface TemplateItem {
  name: string;
  price: number;
  description?: string;
}

export interface TemplateCategory {
  name: string;
  items: TemplateItem[];
}

export interface MenuTemplate {
  type: string;
  label: string;
  categories: TemplateCategory[];
}

export const MENU_TEMPLATES: MenuTemplate[] = [
  {
    type: "restaurant",
    label: "Restaurant",
    categories: [
      {
        name: "Starters",
        items: [
          { name: "Caesar Salad", price: 9.5, description: "Romaine lettuce, croutons, parmesan, Caesar dressing" },
          { name: "Bruschetta", price: 7, description: "Toasted bread with tomatoes, basil, and olive oil" },
          { name: "Soup of the Day", price: 6.5 },
        ],
      },
      {
        name: "Main Courses",
        items: [
          { name: "Grilled Salmon", price: 18, description: "With seasonal vegetables and lemon butter sauce" },
          { name: "Beef Steak", price: 22, description: "200g tenderloin with mashed potatoes" },
          { name: "Chicken Parmesan", price: 15, description: "Breaded chicken with marinara sauce and mozzarella" },
          { name: "Pasta Carbonara", price: 13, description: "Spaghetti with bacon, egg, and parmesan" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Tiramisu", price: 7, description: "Classic Italian coffee dessert" },
          { name: "Chocolate Cake", price: 6.5 },
          { name: "Ice Cream", price: 5, description: "Three scoops of your choice" },
        ],
      },
      {
        name: "Drinks",
        items: [
          { name: "Water", price: 2.5 },
          { name: "Soft Drink", price: 3 },
          { name: "Coffee", price: 3 },
          { name: "Fresh Juice", price: 4.5 },
        ],
      },
    ],
  },
  {
    type: "pizzeria",
    label: "Pizzeria",
    categories: [
      {
        name: "Classic Pizzas",
        items: [
          { name: "Margherita", price: 10, description: "Tomato sauce, mozzarella, fresh basil" },
          { name: "Pepperoni", price: 12, description: "Tomato sauce, mozzarella, pepperoni" },
          { name: "Quattro Formaggi", price: 13, description: "Mozzarella, gorgonzola, parmesan, ricotta" },
          { name: "Hawaiian", price: 12, description: "Tomato sauce, mozzarella, ham, pineapple" },
        ],
      },
      {
        name: "Special Pizzas",
        items: [
          { name: "Truffle Pizza", price: 16, description: "Truffle cream, mozzarella, mushrooms, arugula" },
          { name: "BBQ Chicken", price: 14, description: "BBQ sauce, chicken, red onion, mozzarella" },
          { name: "Prosciutto e Rucola", price: 15, description: "Tomato sauce, mozzarella, prosciutto, arugula, parmesan" },
        ],
      },
      {
        name: "Sides",
        items: [
          { name: "Garlic Bread", price: 5 },
          { name: "Mixed Salad", price: 6 },
          { name: "French Fries", price: 4.5 },
        ],
      },
      {
        name: "Drinks",
        items: [
          { name: "Water", price: 2.5 },
          { name: "Soft Drink", price: 3 },
          { name: "Beer", price: 5 },
          { name: "House Wine", price: 5 },
        ],
      },
    ],
  },
  {
    type: "sushi-bar",
    label: "Sushi Bar",
    categories: [
      {
        name: "Rolls",
        items: [
          { name: "California Roll", price: 10, description: "Crab, avocado, cucumber" },
          { name: "Spicy Tuna Roll", price: 12, description: "Tuna, spicy mayo, cucumber" },
          { name: "Dragon Roll", price: 14, description: "Shrimp tempura, avocado, eel sauce" },
          { name: "Philadelphia Roll", price: 11, description: "Salmon, cream cheese, cucumber" },
        ],
      },
      {
        name: "Nigiri & Sashimi",
        items: [
          { name: "Salmon Nigiri (2 pcs)", price: 6 },
          { name: "Tuna Nigiri (2 pcs)", price: 7 },
          { name: "Sashimi Platter", price: 18, description: "Chef's selection of 12 pieces" },
        ],
      },
      {
        name: "Hot Dishes",
        items: [
          { name: "Miso Soup", price: 4 },
          { name: "Edamame", price: 5 },
          { name: "Chicken Teriyaki", price: 14, description: "Grilled chicken with teriyaki sauce and rice" },
        ],
      },
      {
        name: "Drinks",
        items: [
          { name: "Green Tea", price: 3 },
          { name: "Sake", price: 8 },
          { name: "Japanese Beer", price: 6 },
          { name: "Soft Drink", price: 3 },
        ],
      },
    ],
  },
  {
    type: "burger-joint",
    label: "Burger Joint",
    categories: [
      {
        name: "Burgers",
        items: [
          { name: "Classic Burger", price: 10, description: "Beef patty, lettuce, tomato, pickles, special sauce" },
          { name: "Cheeseburger", price: 11, description: "Beef patty, cheddar, lettuce, tomato, pickles" },
          { name: "Bacon Burger", price: 13, description: "Beef patty, crispy bacon, cheddar, BBQ sauce" },
          { name: "Veggie Burger", price: 10, description: "Plant-based patty, lettuce, tomato, vegan mayo" },
          { name: "Double Smash", price: 15, description: "Two smashed patties, American cheese, caramelized onions" },
        ],
      },
      {
        name: "Sides",
        items: [
          { name: "French Fries", price: 4 },
          { name: "Onion Rings", price: 5 },
          { name: "Coleslaw", price: 3.5 },
          { name: "Sweet Potato Fries", price: 5 },
        ],
      },
      {
        name: "Drinks",
        items: [
          { name: "Milkshake", price: 6, description: "Vanilla, chocolate, or strawberry" },
          { name: "Soft Drink", price: 3 },
          { name: "Craft Beer", price: 6 },
          { name: "Lemonade", price: 4 },
        ],
      },
    ],
  },
  {
    type: "cafe",
    label: "Cafe",
    categories: [
      {
        name: "Coffee",
        items: [
          { name: "Espresso", price: 2.5 },
          { name: "Cappuccino", price: 4 },
          { name: "Latte", price: 4.5 },
          { name: "Americano", price: 3 },
          { name: "Flat White", price: 4.5 },
        ],
      },
      {
        name: "Tea & Other",
        items: [
          { name: "Black Tea", price: 3 },
          { name: "Green Tea", price: 3 },
          { name: "Hot Chocolate", price: 4.5 },
          { name: "Fresh Juice", price: 5 },
        ],
      },
      {
        name: "Food",
        items: [
          { name: "Croissant", price: 3.5 },
          { name: "Avocado Toast", price: 8, description: "Sourdough bread, avocado, cherry tomatoes, poached egg" },
          { name: "Pancakes", price: 7, description: "With maple syrup and fresh berries" },
          { name: "Club Sandwich", price: 9, description: "Chicken, bacon, lettuce, tomato, mayo" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Cheesecake", price: 6 },
          { name: "Carrot Cake", price: 5.5 },
          { name: "Muffin", price: 3.5 },
        ],
      },
    ],
  },
  {
    type: "bar",
    label: "Bar",
    categories: [
      {
        name: "Cocktails",
        items: [
          { name: "Mojito", price: 10, description: "Rum, lime, mint, sugar, soda" },
          { name: "Margarita", price: 10, description: "Tequila, lime juice, triple sec" },
          { name: "Old Fashioned", price: 12, description: "Bourbon, sugar, bitters, orange peel" },
          { name: "Aperol Spritz", price: 9, description: "Aperol, prosecco, soda" },
          { name: "Gin & Tonic", price: 9 },
        ],
      },
      {
        name: "Beer",
        items: [
          { name: "Draft Beer", price: 5 },
          { name: "Craft IPA", price: 7 },
          { name: "Wheat Beer", price: 6 },
        ],
      },
      {
        name: "Wine",
        items: [
          { name: "Red Wine (glass)", price: 7 },
          { name: "White Wine (glass)", price: 7 },
          { name: "Prosecco (glass)", price: 8 },
        ],
      },
      {
        name: "Snacks",
        items: [
          { name: "Nachos", price: 8, description: "With cheese, salsa, and guacamole" },
          { name: "Chicken Wings", price: 10, description: "6 pieces with BBQ or buffalo sauce" },
          { name: "Bruschetta", price: 7 },
          { name: "Mixed Nuts", price: 5 },
        ],
      },
    ],
  },
  {
    type: "bakery",
    label: "Bakery",
    categories: [
      {
        name: "Bread",
        items: [
          { name: "Sourdough Loaf", price: 5 },
          { name: "Baguette", price: 3 },
          { name: "Ciabatta", price: 3.5 },
          { name: "Whole Wheat Bread", price: 4 },
        ],
      },
      {
        name: "Pastries",
        items: [
          { name: "Croissant", price: 3 },
          { name: "Pain au Chocolat", price: 3.5 },
          { name: "Cinnamon Roll", price: 4 },
          { name: "Danish Pastry", price: 3.5 },
        ],
      },
      {
        name: "Cakes & Sweets",
        items: [
          { name: "Chocolate Cake (slice)", price: 5 },
          { name: "Cheesecake (slice)", price: 5.5 },
          { name: "Macarons (6 pcs)", price: 8 },
          { name: "Cookies (3 pcs)", price: 4 },
        ],
      },
      {
        name: "Drinks",
        items: [
          { name: "Coffee", price: 3 },
          { name: "Cappuccino", price: 4 },
          { name: "Tea", price: 3 },
          { name: "Fresh Juice", price: 5 },
        ],
      },
    ],
  },
  {
    type: "hotel",
    label: "Hotel",
    categories: [
      {
        name: "Breakfast",
        items: [
          { name: "Continental Breakfast", price: 12, description: "Croissant, jam, butter, juice, coffee" },
          { name: "Full English Breakfast", price: 15, description: "Eggs, bacon, sausage, beans, toast, tomato" },
          { name: "Pancakes", price: 10, description: "With maple syrup and fresh berries" },
          { name: "Fresh Fruit Plate", price: 8 },
        ],
      },
      {
        name: "Lunch & Dinner",
        items: [
          { name: "Caesar Salad", price: 12 },
          { name: "Club Sandwich", price: 14, description: "Triple-decker with chicken, bacon, egg" },
          { name: "Grilled Salmon", price: 22, description: "With asparagus and hollandaise sauce" },
          { name: "Beef Tenderloin", price: 28, description: "With roasted vegetables and red wine sauce" },
          { name: "Pasta Primavera", price: 16, description: "Seasonal vegetables in light cream sauce" },
        ],
      },
      {
        name: "Room Service",
        items: [
          { name: "Cheese Plate", price: 15, description: "Selection of local and imported cheeses" },
          { name: "Mixed Nuts", price: 6 },
          { name: "Chocolate Truffles", price: 8 },
        ],
      },
      {
        name: "Beverages",
        items: [
          { name: "Espresso", price: 3.5 },
          { name: "Cappuccino", price: 5 },
          { name: "Fresh Juice", price: 6 },
          { name: "Mineral Water", price: 3 },
          { name: "Glass of Wine", price: 9 },
        ],
      },
    ],
  },
  {
    type: "other",
    label: "Other",
    categories: [
      {
        name: "Food",
        items: [
          { name: "Item 1", price: 10 },
          { name: "Item 2", price: 12 },
          { name: "Item 3", price: 8 },
        ],
      },
      {
        name: "Drinks",
        items: [
          { name: "Water", price: 2.5 },
          { name: "Soft Drink", price: 3 },
          { name: "Coffee", price: 3 },
        ],
      },
    ],
  },
];

export function getMenuTemplate(type: string): MenuTemplate | undefined {
  return MENU_TEMPLATES.find((t) => t.type === type);
}
