import { Migration } from '@mikro-orm/migrations';

export class Migration20230604034937 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "item" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "name" varchar(255) not null, "price" int not null, "description" varchar(255) not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "email" varchar(255) not null, "name" varchar(255) not null, "password" varchar(255) not null, "wins" int not null, "spendable" int not null, "role" text check ("role" in (\'Admin\', \'User\')) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "items_owned" ("id" int not null, "owned_by_id" int not null, "item_id" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, constraint "items_owned_pkey" primary key ("id", "owned_by_id", "item_id"));');

    this.addSql('alter table "items_owned" add constraint "items_owned_owned_by_id_foreign" foreign key ("owned_by_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "items_owned" add constraint "items_owned_item_id_foreign" foreign key ("item_id") references "item" ("id") on update cascade;');
  }

}
