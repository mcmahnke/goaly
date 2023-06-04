import { Migration } from '@mikro-orm/migrations';

export class Migration20230604041833 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "items_owned" drop constraint "items_owned_pkey";');
    this.addSql('alter table "items_owned" drop column "id";');
    this.addSql('alter table "items_owned" drop column "created_at";');
    this.addSql('alter table "items_owned" drop column "updated_at";');
    this.addSql('alter table "items_owned" drop column "deleted_at";');
    this.addSql('alter table "items_owned" add constraint "items_owned_pkey" primary key ("owned_by_id", "item_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "items_owned" add column "id" int not null, add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null, add column "deleted_at" timestamptz(0) null;');
    this.addSql('alter table "items_owned" drop constraint "items_owned_pkey";');
    this.addSql('alter table "items_owned" add constraint "items_owned_pkey" primary key ("id", "owned_by_id", "item_id");');
  }

}
