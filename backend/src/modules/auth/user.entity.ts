import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Posts } from '../posts/posts.entity';
import { generateUid } from '../../core/helpers/generate-uid';

@Entity('user', { schema: 'public' })
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uid: string;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  phonenumber: number;

  @Column()
  salt: string;

  @OneToMany(
    () => Posts,
    posts => posts.user,
    { eager: true },
  )
  posts: Posts[];

  @BeforeInsert()
  beforInsertEntityCoreProps() {
    this.uid = generateUid();
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
