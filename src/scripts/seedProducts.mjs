import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Force correct absolute path to .env.local
dotenv.config({
  path: path.resolve(__dirname, "../../.env.local"),
});

console.log("Loaded URI:", process.env.MONGODB_URI); // debug check
import connectDB from "../lib/db.js";
import Product from "../Models/ProductModel.js";

const products = [
  {
    "productName": "Dresses Premium Edition 1",
    "productSellingPrice": 10010,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_1_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_1_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_1_3" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_4" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_5" }
    ],
    "productStock": { "XS": 18, "S": 12, "M": 9, "L": 11 },
    "displayAt": "new-arrivals",
    "exchangePolicy": true
  },
  {
    "productName": "Dresses Premium Edition 2",
    "productSellingPrice": 13150,
    "productOriginalPrice": 16953,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Wine", "Red"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_2_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_2_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_2_3" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_4" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_5" }
    ],
    "productStock": { "XS": 22, "S": 7, "M": 19, "L": 10 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Dresses Premium Edition 3",
    "productSellingPrice": 4363,
    "productOriginalPrice": 7339,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Blue", "Pink"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_3_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_3_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_3_3" }
    ],
    "productStock": { "XS": 10, "S": 9, "M": 14, "L": 7 },
    "displayAt": "new-arrivals",
    "exchangePolicy": true
  },
  {
    "productName": "Dresses Premium Edition 4",
    "productSellingPrice": 4847,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Beige", "Emerald"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_4_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_4_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_4_3" }
    ],
    "productStock": { "XS": 21, "S": 10, "M": 20, "L": 4 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Dresses Premium Edition 5",
    "productSellingPrice": 14944,
    "productOriginalPrice": 17955,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Wine", "Ivory"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_5_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_5_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_5_3" }
    ],
    "productStock": { "XS": 20, "S": 21, "M": 12, "L": 16 },
    "displayAt": "home",
    "exchangePolicy": false
  },
  {
    "productName": "Dresses Premium Edition 6",
    "productSellingPrice": 6950,
    "productOriginalPrice": 9685,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Ivory", "Black"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_6_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_6_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_6_3" }
    ],
    "productStock": { "XS": 15, "S": 18, "M": 14, "L": 17 },
    "displayAt": "trending",
    "exchangePolicy": true
  },
  {
    "productName": "Dresses Premium Edition 7",
    "productSellingPrice": 7005,
    "productOriginalPrice": 10710,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Red", "White"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring. Exclusive dresses designed for modern women with premium finish and elegant tailoring. Exclusive dresses designed for modern women with premium finish and elegant tailoring.Exclusive dresses designed for modern women with premium finish and elegant tailoring.Exclusive dresses designed for modern women with premium finish and elegant tailoring. Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_7_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_7_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_7_3" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_7_4" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_7_5" }
    ],
    "productStock": { "XS": 7, "S": 13, "M": 9, "L": 19 },
    "displayAt": "new-arrivals",
    "exchangePolicy": false
  },
  {
    "productName": "Dresses Premium Edition 8",
    "productSellingPrice": 6929,
    "productOriginalPrice": 8783,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Red", "Beige"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_8_3" }
    ],
    "productStock": { "XS": 9, "S": 9, "M": 13, "L": 19 },
    "displayAt": "trending",
    "exchangePolicy": false
  },
  {
    "productName": "Dresses Premium Edition 9",
    "productSellingPrice": 9261,
    "productOriginalPrice": 11724,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Pink", "Ivory"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_9_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_9_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_9_3" }
    ],
    "productStock": { "XS": 6, "S": 4, "M": 18, "L": 18 },
    "displayAt": "trending",
    "exchangePolicy": false
  },
  {
    "productName": "Dresses Premium Edition 10",
    "productSellingPrice": 11037,
    "productOriginalPrice": 13565,
    "productCategory": "69a2b55a9ef7e68ca2e3cfbc",
    "productSize": ["XS", "S", "M", "L"],
    "productColour": ["Wine", "Navy"],
    "productDescription": "Exclusive dresses designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_10_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_10_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "dresses_10_3" }
    ],
    "productStock": { "XS": 21, "S": 9, "M": 14, "L": 24 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Party Wear Premium Edition 1",
    "productSellingPrice": 10788,
    "productOriginalPrice": 12346,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Black", "Emerald"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_1_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_1_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_1_3" }
    ],
    "productStock": { "S": 16, "M": 19, "L": 14 },
    "displayAt": "home",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 2",
    "productSellingPrice": 4395,
    "productOriginalPrice": 5435,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Beige", "Blue"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_2_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_2_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_2_3" }
    ],
    "productStock": { "S": 18, "M": 11, "L": 11 },
    "displayAt": "trending",
    "exchangePolicy": true
  },
  {
    "productName": "Party Wear Premium Edition 3",
    "productSellingPrice": 11212,
    "productOriginalPrice": 14758,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Beige", "Pink"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_3_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_3_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_3_3" }
    ],
    "productStock": { "S": 16, "M": 14, "L": 14 },
    "displayAt": "new-arrivals",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 4",
    "productSellingPrice": 14025,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Pink", "Blue"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_4_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_4_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_4_3" }
    ],
    "productStock": { "S": 13, "M": 14, "L": 13 },
    "displayAt": "sale",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 5",
    "productSellingPrice": 11959,
    "productOriginalPrice": 14859,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Beige", "Blue"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_5_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_5_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_5_3" }
    ],
    "productStock": { "S": 14, "M": 17, "L": 14 },
    "displayAt": "trending",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 6",
    "productSellingPrice": 13664,
    "productOriginalPrice": 17488,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Black", "White"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_6_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_6_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_6_3" }
    ],
    "productStock": { "S": 19, "M": 13, "L": 14 },
    "displayAt": "sale",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 7",
    "productSellingPrice": 14791,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["White", "Emerald"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_7_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_7_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_7_3" }
    ],
    "productStock": { "S": 20, "M": 12, "L": 8 },
    "displayAt": "home",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 8",
    "productSellingPrice": 7529,
    "productOriginalPrice": 10228,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Beige", "Navy"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_8_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_8_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_8_3" }
    ],
    "productStock": { "S": 12, "M": 18, "L": 9 },
    "displayAt": "sale",
    "exchangePolicy": false
  },
  {
    "productName": "Party Wear Premium Edition 9",
    "productSellingPrice": 7510,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["White", "Navy"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_9_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_9_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_9_3" }
    ],
    "productStock": { "S": 9, "M": 11, "L": 12 },
    "displayAt": "trending",
    "exchangePolicy": true
  },
  {
    "productName": "Party Wear Premium Edition 10",
    "productSellingPrice": 9118,
    "productCategory": "69a2b5a69ef7e68ca2e3cfbe",
    "productSize": ["S", "M", "L"],
    "productColour": ["Pink", "Beige"],
    "productDescription": "Exclusive party wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_10_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_10_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "party_wear_10_3" }
    ],
    "productStock": { "S": 19, "M": 5, "L": 8 },
    "displayAt": "trending",
    "exchangePolicy": true
  },
  {
    "productName": "Evening Wear Premium Edition 1",
    "productSellingPrice": 7191,
    "productOriginalPrice": 8835,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Pink", "Emerald"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_1_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_1_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_1_3" }
    ],
    "productStock": { "S": 18, "M": 12, "L": 14, "XL": 8 },
    "displayAt": "trending",
    "exchangePolicy": false
  },
  {
    "productName": "Evening Wear Premium Edition 2",
    "productSellingPrice": 13171,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Wine", "White"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_2_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_2_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_2_3" }
    ],
    "productStock": { "S": 15, "M": 9, "L": 5, "XL": 14 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Evening Wear Premium Edition 3",
    "productSellingPrice": 7890,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Beige", "Ivory"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_3_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_3_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_3_3" }
    ],
    "productStock": { "S": 19, "M": 19, "L": 23, "XL": 18 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Evening Wear Premium Edition 4",
    "productSellingPrice": 13273,
    "productOriginalPrice": 14809,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Beige", "Emerald"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_4_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_4_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_4_3" }
    ],
    "productStock": { "S": 10, "M": 8, "L": 16, "XL": 14 },
    "displayAt": "home",
    "exchangePolicy": false
  },
  {
    "productName": "Evening Wear Premium Edition 5",
    "productSellingPrice": 13939,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Ivory", "Wine"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_5_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_5_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_5_3" }
    ],
    "productStock": { "S": 21, "M": 14, "L": 16, "XL": 14 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Evening Wear Premium Edition 6",
    "productSellingPrice": 12304,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_6_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_6_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_6_3" }
    ],
    "productStock": { "S": 19, "M": 17, "L": 15, "XL": 16 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Evening Wear Premium Edition 7",
    "productSellingPrice": 13975,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["White", "Wine"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_7_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_7_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_7_3" }
    ],
    "productStock": { "S": 10, "M": 14, "L": 13, "XL": 7 },
    "displayAt": "trending",
    "exchangePolicy": true
  },
  {
    "productName": "Evening Wear Premium Edition 8",
    "productSellingPrice": 12597,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_8_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_8_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_8_3" }
    ],
    "productStock": { "S": 17, "M": 20, "L": 24, "XL": 16 },
    "displayAt": "new-arrivals",
    "exchangePolicy": false
  },
  {
    "productName": "Evening Wear Premium Edition 9",
    "productSellingPrice": 14543,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Beige", "Blue"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_9_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_9_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_9_3" }
    ],
    "productStock": { "S": 15, "M": 21, "L": 8, "XL": 18 },
    "displayAt": "trending",
    "exchangePolicy": false
  },
  {
    "productName": "Evening Wear Premium Edition 10",
    "productSellingPrice": 5691,
    "productCategory": "69a2b5bb9ef7e68ca2e3cfc0",
    "productSize": ["S", "M", "L", "XL"],
    "productColour": ["Wine", "Navy"],
    "productDescription": "Exclusive evening wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_10_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_10_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "evening_wear_10_3" }
    ],
    "productStock": { "S": 14, "M": 14, "L": 12, "XL": 11 },
    "displayAt": "home",
    "exchangePolicy": false
  },
  {
    "productName": "Casual Wear Premium Edition 1",
    "productSellingPrice": 14382,
    "productOriginalPrice": 15978,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Navy", "Wine"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_1_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_1_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_1_3" }
    ],
    "productStock": { "XS": 17, "S": 10, "M": 7, "L": 18, "XL": 12 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Casual Wear Premium Edition 2",
    "productSellingPrice": 14705,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Wine", "Emerald"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_2_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_2_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_2_3" }
    ],
    "productStock": { "XS": 13, "S": 17, "M": 11, "L": 7, "XL": 14 },
    "displayAt": "sale",
    "exchangePolicy": false
  },
  {
    "productName": "Casual Wear Premium Edition 3",
    "productSellingPrice": 11035,
    "productOriginalPrice": 12048,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Blue", "Navy"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_3_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_3_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_3_3" }
    ],
    "productStock": { "XS": 18, "S": 13, "M": 11, "L": 12, "XL": 10 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Casual Wear Premium Edition 4",
    "productSellingPrice": 8011,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Navy", "Blue"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_4_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_4_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_4_3" }
    ],
    "productStock": { "XS": 15, "S": 15, "M": 10, "L": 22, "XL": 6 },
    "displayAt": "trending",
    "exchangePolicy": false
  },
  {
    "productName": "Casual Wear Premium Edition 5",
    "productSellingPrice": 6228,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Ivory", "Beige"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_5_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_5_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_5_3" }
    ],
    "productStock": { "XS": 10, "S": 13, "M": 4, "L": 14, "XL": 16 },
    "displayAt": "new-arrivals",
    "exchangePolicy": false
  },
  {
    "productName": "Casual Wear Premium Edition 6",
    "productSellingPrice": 12993,
    "productOriginalPrice": 16497,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Ivory", "Navy"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_6_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_6_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_6_3" }
    ],
    "productStock": { "XS": 8, "S": 16, "M": 17, "L": 21, "XL": 11 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Casual Wear Premium Edition 7",
    "productSellingPrice": 9739,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Wine", "Red"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_7_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_7_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_7_3" }
    ],
    "productStock": { "XS": 17, "S": 12, "M": 20, "L": 9, "XL": 22 },
    "displayAt": "new-arrivals",
    "exchangePolicy": true
  },
  {
    "productName": "Casual Wear Premium Edition 8",
    "productSellingPrice": 11884,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["White", "Pink"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_8_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_8_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_8_3" }
    ],
    "productStock": { "XS": 18, "S": 14, "M": 11, "L": 15, "XL": 13 },
    "displayAt": "new-arrivals",
    "exchangePolicy": false
  },
  {
    "productName": "Casual Wear Premium Edition 9",
    "productSellingPrice": 14522,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Emerald", "Wine"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_9_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_9_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_9_3" }
    ],
    "productStock": { "XS": 12, "S": 21, "M": 7, "L": 10, "XL": 22 },
    "displayAt": "new-arrivals",
    "exchangePolicy": false
  },
  {
    "productName": "Casual Wear Premium Edition 10",
    "productSellingPrice": 7386,
    "productOriginalPrice": 8460,
    "productCategory": "69a2b6089ef7e68ca2e3cfc2",
    "productSize": ["XS", "S", "M", "L", "XL"],
    "productColour": ["Blue", "Pink"],
    "productDescription": "Exclusive casual wear designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_10_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_10_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "casual_wear_10_3" }
    ],
    "productStock": { "XS": 14, "S": 12, "M": 8, "L": 11, "XL": 7 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 1",
    "productSellingPrice": 9848,
    "productOriginalPrice": 11473,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Emerald", "Ivory"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_1_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_1_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_1_3" }
    ],
    "productStock": { "S": 17, "M": 18, "L": 13 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 2",
    "productSellingPrice": 13760,
    "productOriginalPrice": 17308,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["White", "Wine"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_2_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_2_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_2_3" }
    ],
    "productStock": { "S": 15, "M": 14, "L": 16 },
    "displayAt": "new-arrivals",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 3",
    "productSellingPrice": 13126,
    "productOriginalPrice": 14638,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Navy", "White"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_3_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_3_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_3_3" }
    ],
    "productStock": { "S": 9, "M": 22, "L": 17 },
    "displayAt": "trending",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 4",
    "productSellingPrice": 7280,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["White", "Navy"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_4_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_4_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_4_3" }
    ],
    "productStock": { "S": 11, "M": 11, "L": 7 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 5",
    "productSellingPrice": 13098,
    "productOriginalPrice": 15087,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Emerald", "Ivory"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_5_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_5_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_5_3" }
    ],
    "productStock": { "S": 7, "M": 20, "L": 8 },
    "displayAt": "sale",
    "exchangePolicy": false
  },
  {
    "productName": "Co-ord Sets Premium Edition 6",
    "productSellingPrice": 12752,
    "productOriginalPrice": 14345,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Navy", "Emerald"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_6_1" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_6_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_6_3" }
    ],
    "productStock": { "S": 21, "M": 14, "L": 11 },
    "displayAt": "sale",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 7",
    "productSellingPrice": 8876,
    "productOriginalPrice": 12410,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Pink", "Ivory"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_7_1" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_7_2" },
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_7_3" }
    ],
    "productStock": { "S": 16, "M": 9, "L": 22 },
    "displayAt": "home",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 8",
    "productSellingPrice": 7144,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Black", "Emerald"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_8_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_8_2" },
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_8_3" }
    ],
    "productStock": { "S": 11, "M": 14, "L": 21 },
    "displayAt": "home",
    "exchangePolicy": false
  },
  {
    "productName": "Co-ord Sets Premium Edition 9",
    "productSellingPrice": 13267,
    "productOriginalPrice": 16132,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["Emerald", "Black"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_9_1" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_9_2" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_9_3" }
    ],
    "productStock": { "S": 14, "M": 16, "L": 17 },
    "displayAt": "new-arrivals",
    "exchangePolicy": true
  },
  {
    "productName": "Co-ord Sets Premium Edition 10",
    "productSellingPrice": 10888,
    "productCategory": "69a2b6279ef7e68ca2e3cfc4",
    "productSize": ["S", "M", "L"],
    "productColour": ["White", "Emerald"],
    "productDescription": "Exclusive co-ord sets designed for modern women with premium finish and elegant tailoring.",
    "productImages": [
      { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_10_1" },
      { "url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_10_2" },
      { "url": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop", "public_id": "co-ord_sets_10_3" }
    ],
    "productStock": { "S": 9, "M": 19, "L": 15 },
    "displayAt": "new-arrivals",
    "exchangePolicy": true
  }
]

async function seed() {
  try {
    await connectDB();

    console.log("Deleting old products...");
    await Product.deleteMany();

    console.log("Inserting new products...");
    for (const productData of products) {
      const product = new Product(productData);
      await product.save(); // triggers pre("save")
    }

    console.log("✅ 50 Products Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
}

seed();
