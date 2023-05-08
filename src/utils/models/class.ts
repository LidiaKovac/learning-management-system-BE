import { NUMBER, UUID, UUIDV4 } from "sequelize"
import {
	STRING,
	INTEGER,
	Model,
	Sequelize,
} from "sequelize"

class Class extends Model {
	id!: string
	name!: string
	description!: string
	author!: string

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				id: {
					primaryKey: true,
					type: UUID,
					defaultValue: UUIDV4
				},
				name: {
					type: STRING(50),
					allowNull: false
				},
				description: {
					type: STRING(3000),
					allowNull: true
				},
				author: {
					type: UUID,
					//this is the fk for user
					allowNull: false
				}
			},
			{
				sequelize,
				timestamps: true,
				modelName: "Classes",
			}
		)
	}
}

export default Class