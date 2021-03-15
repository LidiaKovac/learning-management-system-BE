
import {
	DataType,
	UUID,
	STRING,
	DATE,
	ENUM,
	INTEGER,
	Model,
	Sequelize,
	Association,
} from "sequelize"

class Material extends Model {
	file_id!: number
	name!: string
	type!: string
	description!: string

	createdAt!: Date
	updatedAd!: Date

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				file_id: {
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
          type: ENUM("pdf", "docx", "audio", "video", "image"), 
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
				modelName: "Files",
			}
		)
	}
}


export default Material