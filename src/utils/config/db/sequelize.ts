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

Material.belongsTo(User)
User.hasMany(Material)

EventM.belongsTo(User)
User.hasMany(EventM)

EventM.belongsTo(Class, {targetKey: "class_id"})
Class.hasMany(EventM)

Class.belongsToMany(User, {through: "Students_Classes"})
User.belongsToMany(Class, {through: "Students_Classes"})

Homework.belongsTo(EventM)
EventM.hasMany(Homework)

Class.hasMany(Section)
Section.belongsTo(Class)

Todo.belongsTo(User)
User.hasMany(Todo)


module.exports = sequelize
