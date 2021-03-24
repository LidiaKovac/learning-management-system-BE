
import * as SQ from "sequelize"
import { ARRAY, BelongsToManyAddAssociationsMixin, BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixinOptions, ManyToManyOptions } from "sequelize"
import {
	STRING,
	DATE,
	ENUM,
	INTEGER,
	Model,
	Sequelize,
	InstanceUpdateOptions
} from "sequelize"
import { SequelizeMethod } from "sequelize/types/lib/utils"
import Students_Class from "./student_class"
import User from "./user"

class Class extends Model {
	class_id!: number
	name!: string
    description!: string

	createdAt!: Date
	updatedAd!: Date

	public addUser!: BelongsToManyAddAssociationMixin<User["user_id"], {through: Students_Class}>

	static initialize(sequelize: Sequelize) {
		this.init(
			{
				class_id: {
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
				description: {
                    type: STRING(3000), 
                    allowNull: true
                }
			},
			{
				sequelize,
				timestamps: true,
				modelName: "Classes",
			}
		)
	}
}


export default Class