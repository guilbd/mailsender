import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 400 })
  bio: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  category: string[];

  @Column({ nullable: false, type: 'date' })
  publish: Date;

  @Column({ nullable: false, type: 'varchar' })
  likes: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
