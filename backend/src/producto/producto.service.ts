import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Importing TypeORM's InjectRepository decorator for injecting a repository
import { ProductoRepository } from './producto.repository';
// Custom repository for product-related database operations
import { ProductoEntity } from './producto.entity';
// Entity that represents the 'Producto' table in the database
import { ProductoDTO } from './dto/producto.dto';
import { MessageDto } from 'src/common/message.dto';
// Data Transfer Object (DTO) for validating and structuring product data

@Injectable()
// Marks the class as a NestJS service that can be injected into other parts of the application
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        // Injects the repository for the ProductoEntity into the service
        private productoRepository: ProductoRepository
        // Repository for interacting with the ProductoEntity database table
    ) { }

    // Retrieve all products
    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        // Fetches all records from the database
        if (!list.length) {
            // Throws an exception if the list is empty
            throw new NotFoundException(new MessageDto('la lista esta vacia'));
        }
        return list;
        // Returns the list of products
    }

    // Find a product by its ID
    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { id } });
        // Finds a product by ID
        if (!producto) {
            // Throws an exception if no product is found
            throw new NotFoundException(new MessageDto('el producto no existe'));
        }
        return producto;
        // Returns the found product
    }

    // Find a product by its name
    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { nombre } });
        // Finds a product by name
        return producto;
        // Returns the found product (or undefined if not found)
    }

    // Create a new product
    async create(dto: ProductoDTO): Promise<any> {
        const exists = await this.findByNombre(dto.nombre);
        if (exists) throw new BadRequestException(new MessageDto('ya hay un producto con ese nombre'));
        const producto = this.productoRepository.create(dto);
        // Creates a new product entity with the provided DTO
        await this.productoRepository.save(producto);
        // Saves the new product in the database
        return new MessageDto(`producto ${producto.nombre} creado`);
        // Returns a success message
    }

    // Update an existing product
    async update(id: number, dto: ProductoDTO): Promise<any> {
        const producto = await this.findById(id);
        if (!producto) throw new BadRequestException(new MessageDto('ese producto no existe'));

        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id)
            throw new BadRequestException(new MessageDto('ya hay otro producto con ese nombre'));

        // Finds the product by ID to ensure it exists
        dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        // Updates the product's name if provided
        dto.precio ? producto.precio = dto.precio : producto.precio = producto.precio;
        // Updates the product's price if provided

        await this.productoRepository.save(producto);
        // Saves the updated product in the database
        return new MessageDto(`producto ${producto.nombre} actualizado`);
        // Returns a success message
    }

    // Delete a product by its ID
    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        // Finds the product by ID to ensure it exists
        await this.productoRepository.delete(producto);
        // Deletes the product from the database
        return new MessageDto(`producto ${producto.nombre} eliminado`);
        // Returns a success message                                                                                
    }
}
