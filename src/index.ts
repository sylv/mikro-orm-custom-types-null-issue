import { MikroORM } from "@mikro-orm/postgresql";
import { UserEntity } from "./user.entity.js";


async function setup() {
  const orm = await MikroORM.init({
    // clientUrl: 'sqlite:///:memory:',
    clientUrl: process.env.DB_URI,
    allowGlobalContext: true,
    entities: [UserEntity],
  });

  // recreate db on run
  await orm.getSchemaGenerator().dropSchema();
  await orm.getSchemaGenerator().createSchema();

  // create a blank user
  orm.em.create(UserEntity, {});
  await orm.em.flush();

  orm.em.clear();
  return orm;
}

const orm = await setup();
const found = await orm.em.findOneOrFail(UserEntity, {
  id: 1,
});

// foundSubscription.createdAt will be null
console.log(found);
