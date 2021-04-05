import { NUMBER } from "sequelize"
import {
	STRING,
	INTEGER,
	Model,
	Sequelize,
} from "sequelize"

class Section extends Model {
	section_id!: number
	name!: string
    description!: string
    //add optional course ref to files

	createdAt!: Date
	updatedAd!: Date

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				section_id: {
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
				ClassClassId: {
					type: INTEGER,
					allowNull: false
				}
			},
			{
				sequelize,
				timestamps: true,
				modelName: "Section",
			}
		)
	}
}


export default Section