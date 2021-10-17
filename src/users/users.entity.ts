import {
  BaseEntity,
  Entity,
  Unique, // para identificar as entradas únicas - exemplo: email
  PrimaryGeneratedColumn, //Para criar id no formato uuid
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() //Para criar uma entity sempre tem que usar o decorator
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') // Posso passar qual tipo de id quero utilizar
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 }) //passo todas as informações características da coluna.
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  //Role = papel - é admin ou usuário comum?
  @Column({ nullable: false, type: 'varchar', length: 200 })
  role: string;

  //Para bloquear o usuário - se o valor estiver falso ele bloqueia o usuário.
  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  // Nullable true pq só vai ser gerado quando o usuário solicitar recuperação de senha
  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
