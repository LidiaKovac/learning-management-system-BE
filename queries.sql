-- _/*CREATE STUDENT CLASSES TABLE*/
-- CREATE TABLE IF NOT EXISTS "Students_Classes" ("ClassClassId" INTEGER  REFERENCES "Classes" ("class_id") ON DELETE CASCADE ON UPDATE CASCADE, "UserUserId" INTEGER  REFERENCES "Users" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE, "id" SERIAL UNIQUE,  PRIMARY KEY ("id"));
-- /* CLEANUP STATEMENTS */
-- DELETE FROM "Users" WHERE "birthday" IS NULL;
-- DELETE FROM "Files" WHERE "description" IS NULL;
-- DELETE FROM "Events" WHERE "name" IS NULL;
-- DELETE FROM "Students_Classes" WHERE "ClassClassId" IS NULL;
-- DELETE FROM "Students_Classes" WHERE "UserUserId" IS NULL;
-- DELETE FROM "Classes" WHERE "name" IS NULL;


DELETE FROM "Classes" WHERE "isApproved" IS NULL