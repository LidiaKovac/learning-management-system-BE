import {
	STRING,
	DATE,
	ENUM,
	INTEGER,
	Model,
	Sequelize,
	Association,
} from "sequelize"

import  Material  from "./files"

class User extends Model {
	user_id!: number
	name!:{
		allowNull: false
		type: string
	}
	last_name!:{
		allowNull: false
		type: string
	}
	email!:{
		allowNull: false
		type: string
	}
	password!:{
		allowNull: false
		type: string
	}
	role!:{
		allowNull: false
		type: string
	}
	pronouns!:{
		allowNull: false
		type: string
	}
	birthday!: Date

	createdAt!: Date
	updatedAd!: Date


	static initialize(sequelize: Sequelize) {
		this.init(
			{
				user_id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: INTEGER,
					unique: true,
				},
				//-------ANAGRAPHICS--------
				name: {
					type: STRING(50),
					allowNull: true,
				},
				last_name: {
					type: STRING(50),
					allowNull: false,
				},
				email: {
					type: STRING(100),
					allowNull: false,
				},
				password: {
					type: STRING(30),
					allowNull: false,
				},
				//------EXTRAS and SYS INFO--------
				role: {
					type: ENUM("student", "teacher", "admin"),
					allowNull: false,
				},
				pronouns: {
					type: ENUM("he/him", "she/her", "they/them"),
					allowNull: false,
				},
				birthday: {
					type: DATE,
					allowNull: true,
				},
			},
			{
				sequelize :sequelize,
				timestamps: true
			}
		)
	}
	
}
export default User
