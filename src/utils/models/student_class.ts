import { NUMBER } from "sequelize"
import {
	Model,
	Sequelize,
    INTEGER
} from "sequelize"

class Students_Class extends Model {
    id!: number
	ClassClassId!: number
	UserUserId!: number

	static initialize(sequelize: Sequelize) {
		this.init(
            {
                id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: INTEGER,
					unique: true,
				},
                ClassClassId: {
                    allowNull: false,
                    type: INTEGER
                },
                UserUserId: {
                    allowNull: false,
                    type: INTEGER
                }
            },
			{
				sequelize,
                timestamps: false,
				modelName: "Students_Class",
			}
		)
	}
}


export default Students_Class