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
	name!:string
	last_name!:string
	email!:string
	password!:string
	role!:string
	pronouns!:string
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
					unique: true
				},
				password: {
					type: STRING(200),
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
				profile_picture: {
					type: STRING,
					allowNull: true
				}
			},
			{
				sequelize :sequelize,
				timestamps: true
			}
		)
	}
	
}
export default User
