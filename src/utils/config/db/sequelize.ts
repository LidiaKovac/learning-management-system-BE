require("dotenv").config()
import  Material  from "../../models/files"
import  User  from "../../models/user"
import EventM from "../../models/event"
import Class from "../../models/class"
import Students_Class from "../../models/student_class"
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

let models = [Material, User, EventM, Class, Students_Class]
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

module.exports = sequelize
