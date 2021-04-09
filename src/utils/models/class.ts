import { NUMBER } from "sequelize"
import {
	STRING,
	INTEGER,
	Model,
	Sequelize,
} from "sequelize"

class Class extends Model {
	class_id!: number
	name!: string
    description!: string
	author!: number

	createdAt!: Date
	updatedAd!: Date

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				class_id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: INTEGER,
					unique: true,
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
					type: NUMBER,
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