import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll() {
    const customers = await this.customerService.findAll();
    return customers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customerService.findOne(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  @Post('register')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const createdCustomer =
      await this.customerService.create(createCustomerDto);
    return createdCustomer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const updatedCustomer = await this.customerService.update(
      id,
      updateCustomerDto,
    );
    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return updatedCustomer;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedCustomer = await this.customerService.remove(id);
    if (!deletedCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return { message: 'Customer deleted successfully' };
  }
}
