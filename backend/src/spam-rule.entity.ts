import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class SpamRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 }) // 'PHONE' | 'KEYWORD'
  type: string;

  @Column({ type: 'varchar', length: 255 })
  value: string; // Numara veya Kelime

  @Column({ type: 'varchar', length: 50, default: 'SCAM' })
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
