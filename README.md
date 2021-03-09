# SOLO CAPSTONE - Learning management system (LMS)
## :computer: Check out this project's [Notion](https://www.notion.so/lidiakovac/SOLO-CAPSTONE-60bd6b2e4a254a6a8e5025db83966905) for to-dos, mocks and releases! 

## :clapper: Live demos coming soon! 

---

# Daily LOG on the [FRONTEND REPO](https://github.com/LidiaKovac/learning-management-system-FE)

**:exclamation: When setting up a heroku postgres on PgAdmin remember to add the database name on the DB restriction, else you will get 1000+ databases on the list.** 

## General advice if you are building a TS api using SEQUELIZE: 

Here I am going to focus on SEQUELIZE and TypeScript, if you need help with express.js and typescript, here is [another repo](https://github.com/LidiaKovac/to-rain-or-not-to-rain-be)

(Remember to run ```npx tsc --init```)
#### :exclamation: NOTE: I tried almost all the approaches I found on the internet. This is a fusion of 2/3 of them and the results of a whole morning of experiments. 
 
#### Setting up models:

**Main difference with regular JS approach**: relationships (which is really the main problem here) are not defined inside the model. 
Instead of declaring the model straight away, we need to first declare a **class**. 
*What is a class?* The class feature was introduced in ES6 and it's a "template" for an object. 
:exclamation: **It's not an object!**

Basically, if your class looks like this: 
```js
        class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}
```
or, like I did: 
```js 
        class Car {
             name!: string
             year!: string

        }
```
...you can then call you class and create a new object like this: 
```js 
let my_car = new Car("Panda", "2014") 
```
The ! operator assures the compiler that the value exists (I think) and therefor we don't need constructors anymore. 
        
