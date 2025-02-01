import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Electricitydata {

    @PrimaryGeneratedColumn()
    id: number

    @Column('date')
    date: string

    @Column('time')
    starttime: string

    @Column('decimal', {
        nullable: true,
        precision: 11,
        scale: 5
    })
    productionamount: number

    @Column('decimal', {
        nullable: true,
        precision: 11,
        scale: 3
    })
    consumptionamount: number

    @Column('decimal', {
        nullable: true,
        precision: 6,
        scale: 3
    })
    hourlyprice: number

}
