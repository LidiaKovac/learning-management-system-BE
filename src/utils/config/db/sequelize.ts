require("dotenv").config()
import  Material  from "../../models/files"
import  User  from "../../models/user"
import EventM from "../../models/event"
import Class from "../../models/class"
import Students_Class from "../../models/student_class"
import Homework from "../../models/homework"
import Section from "../../models/section"
import Todo from "../../models/todo"
const Sequelize = require("sequelize")
const {SQL_URI} = process.env


const sequelize = new Sequelize(SQL_URI, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			required: true,
			rejectUnauthorized: false,
		},
	},
})

let models = [Material, User, EventM, Class, Students_Class, Homework, Section, Todo]
models.forEach((model) => {
	model.initialize(sequelize)
})

Material.belongsTo(User) //will have the FK
User.hasMany(Material)

Material.belongsTo(Section, {foreignKey: "section_ref"})
Section.hasMany(Material, {foreignKey: "section_ref"})

EventM.belongsTo(User) //this is where we define WHO CREATED THE EVENT
User.hasMany(EventM)

EventM.belongsToMany(Class, {through: "Events_Classes"}) //each event will be assigned to x classes
Class.belongsToMany(EventM, {through: "Events_Classes"})

Class.belongsToMany(User, {through: "Students_Classes"})
User.belongsToMany(Class, {through: "Students_Classes"})

User.hasMany(Class, {foreignKey: "author"})
Class.belongsTo(User, {foreignKey: "author"})

Homework.belongsTo(EventM)
EventM.hasMany(Homework)

Class.hasMany(Section, {as: "sections"})
Section.belongsTo(Class)

Todo.belongsTo(User)
User.hasMany(Todo)


export default sequelize
