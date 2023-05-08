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
	type!: string
    description!: string
	startDate!: String
    endDate!: String
	graded!: boolean


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
				type: {
                    type: STRING(100), 
                    allowNull: false
                },
				graded: {
					type: BOOLEAN,
					allowNull: false,
					defaultValue: false
				},
				description: {
                    type: STRING(3000), 
                    allowNull: true
                },
                startDate: {
                    type: STRING,
                    allowNull: false
                },
                endDate: {
                    type: STRING,
                    allowNull: false
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