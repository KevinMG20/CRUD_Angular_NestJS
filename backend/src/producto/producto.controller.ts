import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDTO } from './dto/producto.dto';

@Controller('producto')
export class ProductoController {
    constructor(private readonly ProductoService: ProductoService) { }

    @Get()
    async getAll() {
        return await this.ProductoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.ProductoService.findById(id);
    }

    @Post()
    async create(@Body() dto: ProductoDTO) {
        return await this.ProductoService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductoDTO) {
        return await this.ProductoService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.ProductoService.delete(id);
    }
}
