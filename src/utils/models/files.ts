
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

import User from "./user"

class Material extends Model {
	file_id!: number
	name!: {
		allowNull: true
		type: string
	}
	type!: {
		allowNull: false
		type: string
	}
	description!: {
		allowNull: false
		type: string
	}

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