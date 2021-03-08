# SOLO CAPSTONE - Learning management system (LMS)
## :computer: Check out this project's [Notion](https://www.notion.so/lidiakovac/SOLO-CAPSTONE-60bd6b2e4a254a6a8e5025db83966905) for to-dos, mocks and releases! 

## :clapper: Live demos coming soon! 

---

# Daily LOG on the [FRONTEND REPO](https://github.com/LidiaKovac/learning-management-system-FE)

**:exclamation: When setting up a heroku postgres on PgAdmin remember to add the database name on the DB restriction, else you will get 1000+ databases on the list.** 

## General advice if you are building a TS api using SEQUELIZE: 

Here I am going to focus on SEQUELIZE and TypeScript, if you need help with express.js and typescript, here is [another repo](https://github.com/LidiaKovac/to-rain-or-not-to-rain-be)

(Remember to run ```npx tsc --init```)
- ### Basic setup: 
    - #### Setting up models: 
        - When setting up models you will need some imported types and some custom ones. 
        - The imported models are Sequelize, DataTypes and ModelDefined. This last type takes two parameters. 
        - You will need three custom types for each model. You will need a ```*modelname*Attributes```, a ```*modelname*CreationAttributes.```, and a ```*modelnameInstance``` The second one will extend the first one with the id value, and the third one will create a model that is basically what our class would be: 
        ```js
        export interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}
        ```
        - Based on how you build models, you might need to change it a little bit: in my case, instead of passing DataTypes as a parameter, I imported it from sequelize. I did this because there is no collective type for the DataTypes objects. 
        - The ModelDefined type, as said, takes two parameters, which are the two custom interfaces we did: ```ModelDefined<UserAttributes, UserCreationAttributes>```. 
    - #### Setting up
