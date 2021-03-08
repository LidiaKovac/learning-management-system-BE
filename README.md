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
        - You will need two custom types for each model. You will need a ```*modelname*Attributes``` and a ```*modelname*CreationAttributes.``` The second one will extend the first one with the id value. Althought, you need the id value on the standard interface: 
        ```js
        export interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}```
