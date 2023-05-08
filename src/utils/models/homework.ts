import {
	STRING,
	INTEGER,
	Model,
	Sequelize,
	UUID,
	UUIDV4,
} from "sequelize"

class Homework extends Model {
	id!: string
	author!: number //id of the creator

    content!: string
    //graded!: boolean MOVED TO EVENT
    grade!: number

	createdAt!: Date
	updatedAd!: Date

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				id: {
					primaryKey: true,
					type: UUID,
					defaultValue: UUIDV4
				},
				content: {
                    type: STRING(10000), 
                    allowNull: true
                },
				author: {
					type: INTEGER,
					allowNull: false
				},
                grade: {
                    type: INTEGER,
                    validate: {
                        max: 10,
                        min: 0
                    },
                    allowNull: true
                }
			},
			{
				sequelize,
				timestamps: true,
				modelName: "Homeworks",
			}
		)
	}
}

 export default Homework

