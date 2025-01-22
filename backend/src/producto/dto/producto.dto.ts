import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/IsNotBlank.decorator";

export class ProductoDTO {

    @IsNotBlank({message: 'el nombre no puede estar vacio'})
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el precio no debe ser menor a 10'})
    precio?: number;
}

