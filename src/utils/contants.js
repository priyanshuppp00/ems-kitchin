export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const getMenuUrl = (lat, lng, restaurantId) => 
  `https://food-wagon-backend.onrender.com/api/menu?lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

export const getRestaurantsUrl = (lat, lng) =>
  `https://food-wagon-backend.onrender.com/api/restaurants?lat=${lat}&lng=${lng}`;

export const ERROR_IMG =
  "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/12/23/Pictures/_ae26fc2c-4520-11eb-bcf5-ed790659da7b.jpg";

export const MENU_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

export const DEFAULT_LOCATION = {
  lat: 25.61011402528211,
  lng: 85.116419903934
};
