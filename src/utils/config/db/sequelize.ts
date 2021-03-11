import  Material  from "../../models/files"
import  User  from "../../models/user"
const Sequelize = require("sequelize")

let SQL_URI:String
SQL_URI = process.env.SQL_URI!

const sequelize = new Sequelize(SQL_URI, {
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			required: true,
			rejectUnauthorized: false,
		},
	},
})

let models = [Material, User]
models.forEach((model) => {
	model.initialize(sequelize)
})

Material.belongsTo(User)
User.hasMany(Material)


module.exports = sequelize
