import { STRING, ENUM, INTEGER, Model, Sequelize } from "sequelize";

class Material extends Model {
  file_id!: number;
  name!: string;
  type!: string;
  description!: string;
  section_ref!: number;

  createdAt!: Date;
  updatedAd!: Date;

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
          allowNull: false,
        },
        type: {
          type: ENUM("pdf", "markdown", "audio", "video", "image"),
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

export default Material;
