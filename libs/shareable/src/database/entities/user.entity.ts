import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StatusEnum, UserEnum } from '@shareable/enum';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'first_name',
  })
  @Index()
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    nullable: true,
    name: 'profile_image',
  })
  @Index()
  profileImage?: string | null;

  @Column()
  @Index()
  email: string;

  @Column({
    enum: StatusEnum,
    type: 'enum',
    default: StatusEnum.Active,
  })
  status: number;

  @Column({
    enum: UserEnum,
    type: 'enum',
    default: UserEnum.moderator,
  })
  type: UserEnum;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
