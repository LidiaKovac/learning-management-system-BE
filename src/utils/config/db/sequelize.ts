import  Material  from "../../models/files"
import  User  from "../../models/user"

const {
	SQL_URI
} = process.env
const Sequelize = require("sequelize")

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
