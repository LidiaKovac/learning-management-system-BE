import {
	STRING,
	ENUM,
	INTEGER,
	BOOLEAN,
	Model,
	Sequelize,
} from "sequelize"

class Event extends Model {
	event_id!: number
	name!: string
	type!: string
    description!: string
	startDate!: String
    endDate!: String
	graded!: boolean

	createdAt!: Date
	updatedAd!: Date

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				event_id: {
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
				type: {
                    type: ENUM("homework", "exam"), 
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