import {Optional, Model} from 'sequelize'

export interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {
}

export interface UserAttributes {
    user_id: Number, 
    name: String,
    last_name: String,
    email: String,
    password: String,
    pronouns: String,
    role: String, 
    profile_picture?: String,

    birthday: Date
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        public user_id!: Number;
        public name!: String;
        public last_name!: String;
        public email!: String;
        public password!: String;
        public pronouns!: String;
        public role!: String;
        public profile_picture!: String;
        public birthday!: Date

    }
    //associations will be here (https://stackoverflow.com/questions/53090294/how-to-define-sequelize-associations-in-typescript)


export class User extends Model<UserAttributes, UserCreationAttributes>

  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public preferredName!: string | null; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Project, number>;
  public hasProject!: HasManyHasAssociationMixin<Project, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Project>;
  };
}


