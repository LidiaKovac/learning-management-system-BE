import { NUMBER, UUID, UUIDV4 } from "sequelize"
import {
	STRING,
	INTEGER,
	Model,
	Sequelize,
} from "sequelize"
import Material from "./files"

class Section extends Model {
	id!: string
	name!: string
    description!: string
	// files?: Array<Material>
    //add optional course ref to files


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
