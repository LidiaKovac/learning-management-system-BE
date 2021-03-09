# SOLO CAPSTONE - Learning management system (LMS)
## :computer: Check out this project's [Notion](https://www.notion.so/lidiakovac/SOLO-CAPSTONE-60bd6b2e4a254a6a8e5025db83966905) for to-dos, mocks and releases! 

## :clapper: Live demos coming soon! 

---

# Daily LOG on the [FRONTEND REPO](https://github.com/LidiaKovac/learning-management-system-FE)

**:exclamation: When setting up a heroku postgres on PgAdmin remember to add the database name on the DB restriction, else you will get 1000+ databases on the list.** 

## General advice if you are building a TS api using SEQUELIZE: 

Here I am going to focus on SEQUELIZE and TypeScript, if you need help with express.js and typescript, here is [another repo](https://github.com/LidiaKovac/to-rain-or-not-to-rain-be)

(Remember to run ```npx tsc --init```)
 
### Setting up models:

**Main difference with regular JS approach**: relationships (which is really the main problem here) are not defined inside the model. 
Instead of declaring the model straight away, we need to first declare a **class**. 

#### Classes: 
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
             year!: number

        }
```
...you can then call you class and create a new object like this: 
```js 
let my_car = new Car("Panda", "2014") 
```
I assume the ! operator assures the compiler that the value exists and so deletes the need for a constructor. 

Inside our class declaration, we need the initialize() function, declared as a static. 

#### The ```static initialize()``` method: 

The initialize() function takes one parameter: the database connection (in my code ```sequelize```). This will be passed from outside when calling the method. This parameter takes Sequelize as a type, imported from sequelize.

#### The ```this.init()``` function: 

This is a regular .init function from sequelize. 
If you are more used to the ```model.define()``` syntax, just know that .define calls .init under the hood. You can discover more about .init on the official sequelize documentation. 

#### :exclamation: Remember to export your classes! 

#### Setting up relationships: 

In another file, idealy where you are configuring the sequelize connection, import your classes. 

Declare an array of all your classes and iterate through them firing the .initialize method. Remember to pass you sequelize connection as a parameter. 

After you have initialized all of your classes, you can declare the relationships the way you would do with JS: 

```js 
import  Material  from "../models/files"
import  User  from "../models/user"

Material.belongsTo(User)
User.hasMany(Material)
```


        
