import { STRING, INTEGER, Model, Sequelize, BOOLEAN, UUID, UUIDV4 } from "sequelize";

class Todo extends Model {
  id!: string;
  task!: string;
  done!: boolean;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          primaryKey: true,
					type: UUID,
					defaultValue: UUIDV4
        },
        task: {
          type: STRING(50),
          allowNull: false,
        },
        done: {
          type: BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      },
      {
        sequelize,
        modelName: "Todos",
      }
    );
  }
}
export default Todo