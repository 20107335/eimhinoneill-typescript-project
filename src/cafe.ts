import { MenuItem, ComboDeal, OrderLine, KitchenTicket, AllergyCard } from "./menuTypes";

const soup: MenuItem = { id: 1, name: "Roast Tomato Soup", course: "starter", price: 5.5, nutrition: { calories: 180, allergens: ["celery"] }, discountPercent: 10 };
const risotto: MenuItem = { id: 2, name: "Mushroom Risotto", course: "main", price: 14.0, nutrition: { calories: 620, allergens: ["milk"] } };
const brownie: MenuItem = { id: 3, name: "Chocolate Brownie", course: "dessert", price: 6.0, nutrition: { calories: 450, allergens: ["milk", "eggs", "gluten"] }, availableFrom: new Date("2025-01-01") };

const menu: MenuItem[] = [soup, risotto, brownie];
const lunchCombo: ComboDeal = { id: 101, name: "Soup & Sweet", items: [soup, brownie], price: 10.0 };
const currentOrder: OrderLine[] = [risotto, lunchCombo, soup];

function describe(item: MenuItem) {
  return `${item.name} (${item.course}) - EUR ${item.price.toFixed(2)}`;
}

function lineTotal(line: OrderLine) {
  if ("items" in line) return line.price;
  return line.price;
}

function orderTotal(lines: OrderLine[]) {
  return lines.reduce((t, l) => t + lineTotal(l), 0);
}

function filterMenu(items: MenuItem[], predicate: (item: MenuItem) => boolean) {
  return items.filter(predicate);
}

function cheapest(items: MenuItem[], max?: number) {
  return items.sort((a, b) => a.price - b.price).slice(0, max);
}

function firstMatch<T>(data: T[], criteria: (d: T) => boolean): T | undefined {
  return data.find(criteria);
}

function updateItem(item: MenuItem, changes: Partial<MenuItem>): MenuItem {
  return { ...item, ...changes };
}

function kitchenTicket(item: MenuItem): KitchenTicket {
  return { name: item.name, course: item.course };
}

function allergyCard(item: MenuItem): AllergyCard {
  return { id: item.id, name: item.name, course: item.course, price: item.price, warning: `Contains: ${item.nutrition.allergens.join(", ")}` };
}
// Tests
console.log(describe(risotto));
console.log(orderTotal(currentOrder));
console.log(filterMenu(menu, (i) => i.nutrition.calories < 500));
console.log(cheapest(menu, 2));
console.log(cheapest(menu));
console.log(firstMatch(menu, (i) => i.course === "dessert"));
console.log(updateItem(soup, { price: 6.0, discountPercent: 10 }));
console.log(kitchenTicket(brownie));
console.log(allergyCard(brownie));
console.log(describe(soup));                                     
console.log(updateItem(soup, { price: 7.0 }));                   
console.log(firstMatch(menu, (i) => i.nutrition.calories < 300)); 