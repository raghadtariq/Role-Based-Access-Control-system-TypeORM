import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";
import { Profile } from "./entities/Profile.js";
import { Permission } from "./entities/Permission.js";

// const dataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     database: "RBAC",
//     username: "root",
//     password: "",
//     entities:[Permission,User,Profile,Role],
//     synchronize: false,
//     logging: false

//   });

  
// const initialize = () =>{
//     dataSource.initialize().then(() => {
//         console.log("Connected to DB!");
//       }).catch(err => {
//         console.error("Failed to connect to DB: " + err);
//       });
//     }
//     export default {dataSource,initialize};

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ Permission, Profile,Role,User],
   migrations: ['./**/migration/*.ts'],
  synchronize: true,
  logging: false,
});

export const initDB = async () =>
  await dataSource.initialize().then(() => {
    console.log("Connected to DB!");
  }).catch(err => {
    console.error('Failed to connect to DB: ' + err);
  });


export default dataSource ;