import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isFinished: boolean;
}
let connection:Connection;

export async function getItemRepository(): Promise<Repository<Item>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'Blank',
      synchronize: true,
      entities: [
        Item
      ],
    });
  }
  return connection.getRepository(Item);
}
