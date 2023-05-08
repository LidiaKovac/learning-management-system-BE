import {
	STRING,
	DATE,
	ENUM,
	INTEGER,
	Model,
	Sequelize,
	BelongsToManyAddAssociationsMixin,
	UUID,
	UUIDV4
} from "sequelize"
import Class from "./class"
import Students_Class from "./student_class"


class User extends Model {
	id!: string
	name!: string
	lastName!: string
	email!: string
	password!: string
	role!: string
	pronouns!: string
	birthday!: string
	propic!: string

	createdAt!: Date
	updatedAd!: Date

	public addClass!: BelongsToManyAddAssociationsMixin<Class["id"], { through: Students_Class }>


	static initialize(sequelize: Sequelize) {
		this.init(
			{
				id: {
					primaryKey: true,
					type: UUID,
					defaultValue: UUIDV4
				},
				//-------ANAGRAPHICS--------
				name: {
					type: STRING(50),
					allowNull: true,
				},
				lastName: {
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
					type: STRING(15),
					allowNull: false,
				},
				pronouns: {
					type: STRING(10),
					allowNull: false,
				},
				birthday: {
					type: STRING,
					allowNull: true,
				},
				propic: {
					type: STRING,
					allowNull: true
				}
			},
			{
				sequelize: sequelize,
				timestamps: true
			}
		)
	}

}

export default User
