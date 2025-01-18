import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// This is a database table that stores products
@Entity({ name: 'producto' })
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
    nombre: string;

    @Column({ type: 'float', nullable: false })
    precio: number;
}