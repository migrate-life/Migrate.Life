# Migrate.Life #

**"Find where you flourish"**

## Developers ##

- Jon *"Big J"* Gentry (https://github.com/jong9000)

- Ian *"Hype Man"* Gifford (https://github.com/IanGifford261)

- Spencer *"Wild Card"* Hirata (https://github.com/shiratap)

- Tanner *"SKNY-TannMann"* Percival (https://github.com/Tanner253)

## About Migrate.Life ##
### Version 1.0.8 ###

Team **Migrate.Life** came up with the question "what if I am unhappy with where I live... But I do not know where to go?". That birthed our idea of a place picker, a migration application. Pick a general geographical location, a list of the nearest cities populates with the overview of each city, a quick summary of the places that match *your* criteria. Welcome to **Migrate.Life**.

### Problem Domain ###

Do you want to live somewhere else? Are you unhappy with where you live? You pick anywhere on our map, a list of cities will populate for you based on that selection. After, you will be able to refine your selections further by our filters to customize where your final locations to pick from will be. Upon final filtering, you will be able to save/compare/delete your choices until you reach your final decision. All thats left is for you to find that one place that fits you. Our application uses the latest and up to date APIs for the information that you need to "find where you flourish".

## Libraries/NPM's/API's
- Libraries/NPM's
- [x] Express

- [x] CORS

- [x] Superagent

- [x] PG

- [x] Method-Override

- [x] EJS

- [x] Nodemon

- [x] Dotenv

- API's
- [x] Open Weather (https://openweathermap.org/current)

- [x] Numbeo (https://www.numbeo.com)

### How to set up locally ###

- Clone the repository onto your machine
   - Once Repo is cloned and set up within VS Code, you have to npm initialize for your package.json/package-lock, as well as install all required dependencies (express, CORS, Superagent, PG, Method-Override, EJS, dotenv) as well as 

   - Once all dependencies are installed and verified to be in your package.json and any other npm modules are up to date, you may begin to set prepare the application for a local deployment. You need to create a .env file and declare your PORT as well as your API keys that you source from "Numbeo" and "Open Weather".
   **Note** - If you do not pay for the Numbeo API key, you have to request the academic license. **IT IS NOT FOR COMMERCIAL USAGE**

   - Using our schema.sql file, you should build your database table within your command console and link it to your repository

   - If you have any alterations or want to fine tune the application for your usage, you may. Otherwise, start your NODEMON and visit localhost in your browser.

### USER STORIES ###

- As a User, I want a streamlined site that is easy to understand and obvious to navigate without prompts.

- As a User, I want the ability to search for a "new" location to live, so that I can discover a better environment for myself.

- As a User, I want my searched locations to be returned in a list form containing information that relates to my preferences such as temperature/population density, local economy/cost of living.

- As a User, when looking through my options, I want to be able to save my options.

- As a User, when looking through my saved options, I would like to be able to compare them.

## DEV STORIES ##

- As a Developer, I want my application to be complete to meet my MVP.

- As a Developer, I want my users to be able to navigate my application with a simple clean look and a presentable interface.

- As a Developer, I want to have an application that pulls from reliable APIs to render the results I specify for my users.

- As a Developer, I want accurate information from my APIs such as temperature/population density, local economy/cost of living.

### API Endpoints and Call/Response Sample ###

- Example call:
/api/indices?api_key=your_api_key&query=Belgrade

- Example response:
{
   "health_care_index":50.06172839506173,
   "crime_index":38.21801747014595,
   "traffic_time_index":26.666666666666664,
   "purchasing_power_incl_rent_index":40.12168845492055,
   "cpi_index":54.03955667194646,
   "pollution_index":57.01433623847417,
   "traffic_index":66.73884343652705,
   "quality_of_life_index":57.23822054840707,
   "cpi_and_rent_index":35.19777836239038,
   "groceries_index":42.26947260306218,
   "safety_index":61.78198252985405,
   "name":"Belgrade, Serbia",
   "rent_index":14.941072506714569,
   "traffic_co2_index":707.361111111111,
   "restaurant_price_index":45.41139043722476,
   "traffic_inefficiency_index":63.001434294260044,
   "property_price_to_income_ratio":19.047619047619047
}


- Example call:
/api/city_prices?api_key=your_api_key&query=Belgrade

- Example response:
{
  "monthLastUpdate":4,
  "contributors":91,
  "name":"Belgrade, Serbia",
  "prices":[
     {
        "average_price":5.443478260869566,
        "item_name":"Meal, Inexpensive Restaurant, Restaurants",
        "highest_price":7,
        "item_id":1,
        "lowest_price":4,
        "data_points": 50
     },
     {
        "average_price":1.8523809523809522,
        "item_name":"Imported Beer (0.33 liter bottle), Restaurants",
        "highest_price":2.3,
        "item_id":5,
        "lowest_price":1.5,
        "data_points": 40
     },
     {
        "average_price":0.3611111111111111,
        "item_name":"Lettuce (1 head), Markets",
        "highest_price":0.5,
        "item_id":113,
        "lowest_price":0.25,
        "data_points": 27
     },
     {
        "average_price":1.3,
        "item_name":"Cappuccino (regular), Restaurants",
        "highest_price":1.5,
        "item_id":114,
        "lowest_price":1.2,
        "data_points": 20
     }
  ],
  "yearLastUpdate":2012,
  "currency":"EUR"
}
