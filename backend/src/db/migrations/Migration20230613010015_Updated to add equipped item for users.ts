import { Migration } from '@mikro-orm/migrations';

export class Migration20230613010015 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "equipped" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "equipped";');
  }

}
