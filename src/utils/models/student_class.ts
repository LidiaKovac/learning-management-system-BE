import { NUMBER, UUID, UUIDV4 } from "sequelize"
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
					primaryKey: true,
					type: UUID,
					defaultValue: UUIDV4
				},
                ClassClassId: {
                    allowNull: false,
                    type: UUID
                },
                UserUserId: {
                    allowNull: false,
                    type: UUID
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