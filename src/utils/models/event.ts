import { FLOAT } from "sequelize"
import { NUMBER } from "sequelize"
import {
	STRING,
	ENUM,
	INTEGER,
	BOOLEAN,
	Model,
	Sequelize,
	UUIDV4,
	UUID,
} from "sequelize"

class Event extends Model {
	id!: string
	name!: string
	location!: string
	building!: string
	timeStart!: string
	duration!: number


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
				location: {
					type: STRING(100),
					allowNull: false
				},
				timeStart: {
					type: STRING(100),
					allowNull: false
				},
				building: {
					type: STRING(3000),
					allowNull: true
				},
				duration: {
					type: FLOAT,
					allowNull: true
				},
			},
			{
				sequelize,
				timestamps: true,
				modelName: "Events",
			}
		)
	}
}

export default Event