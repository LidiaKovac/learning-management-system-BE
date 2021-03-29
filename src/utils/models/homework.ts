import {
	STRING,
	INTEGER,
	Model,
	Sequelize,
} from "sequelize"

class Homework extends Model {
	hw_id!: number
	author!: number //id of the creator

    content!: string
    //graded!: boolean MOVED TO EVENT
    grade!: number

	createdAt!: Date
	updatedAd!: Date

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				hw_id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: INTEGER,
					unique: true,
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