import {Sequelize, DataTypes, Model, ModelStatic, ModelScopeOptions} from 'sequelize'
import {UserInstance} from '../interfaces'

module.exports = (sequelize: Sequelize) => {
    const User = sequelize.define<UserInstance>(
      "User", {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        pronouns: {
            type: DataTypes.ENUM('she/her', 'he/him', 'they/them'),
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATE
        },
        role: {
            type: DataTypes.ENUM('admin', 'student', 'teacher')
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
          type: DataTypes.STRING, 
          allowNull: false
        }
      },
      { timestamps: true }
    );
    
    static associate = (models) => {
      User.hasMany(models.Article);
    };
    return User;
  };