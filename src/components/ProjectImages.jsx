import countriesInfoImage from "../assets/image/countries-api.png";
import quizApp1 from "../assets/image/quiz-app-1.png";
import quizApp2 from "../assets/image/quiz-app-2.png";
import bc1 from "../assets/image/bc-1.png";
import bc2 from "../assets/image/bc-2.png";
import bc3 from "../assets/image/bc-3.png";
import bc4 from "../assets/image/bc-4.png";
import weatherApi from "../assets/image/weather-api.png";
import productList from "../assets/image/product-list.png";
import myFoodApp1 from "/src/assets/image/food-fav-react (1).png";
import myFoodApp2 from "/src/assets/image/food-fav-react (2).png";

const imageMap = {
  "countries-api.png": countriesInfoImage,
  "quiz-app-1.png": quizApp1,
  "quiz-app-2.png": quizApp2,
  "bc-1.png": bc1,
  "bc-2.png": bc2,
  "bc-3.png": bc3,
  "bc-4.png": bc4,
  "weather-api.png": weatherApi,
  "product-list.png" : productList,
  "food-fav-react (1).png" :myFoodApp1,
  "food-fav-react (2).png": myFoodApp2
};

export function resolveImagePath(fileName) {
  return imageMap[fileName] || fileName;
}
