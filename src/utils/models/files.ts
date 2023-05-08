import { STRING, ENUM, INTEGER, Model, Sequelize, UUID, UUIDV4 } from "sequelize";

class Material extends Model {
  id!: string;
  name!: string;
  type!: string;
  description!: string;
  section_ref!: number;


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
          allowNull: false,
        },
        type: {
          type: STRING(10),
          allowNull: false,
        },
        description: {
          type: STRING(1000000),
          allowNull: true,
        },
        section_ref: {
          type: INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Files",
      }
    );
  }
}

export default Material


