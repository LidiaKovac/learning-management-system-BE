import { STRING, INTEGER, Model, Sequelize, BOOLEAN } from "sequelize";

class Todo extends Model {
  todo_id!: number;
  task!: string;
  done!: boolean;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        todo_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: INTEGER,
          unique: true,
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

export default Todo;
