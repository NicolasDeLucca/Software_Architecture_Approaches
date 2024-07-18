import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { TaskStatus } from '../taskLogic/status';

@Table({
  tableName: 'tasks',
  timestamps: false
})
export class Task extends Model {

  @Column({
    type: DataType.INTEGER, 
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull : false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'New Task'
  })
  description!: string;

  @Column({
    type: DataType.ENUM('waiting', 'active', 'completed'),
    defaultValue: 'waiting'
  })
  status!: TaskStatus;

}