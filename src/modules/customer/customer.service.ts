import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './interface/customer.interface';
import { Cron } from '@nestjs/schedule';
import moment from 'moment';
import { winstonLog } from 'src/config/winstonLog';

@Injectable()
export class CustomerService {
  private readonly customers: Customer[] = [];

  @Cron('0 5 0 * * *') // runs at 5 minutes past midnight every day
  wishCustomersOnBirthday() {
    const today = moment().format('YYYY-MM-DD');
    const customersHavingBirthdayToday =
      this.findAllHavingSpecificBirthdate(today);
    if (customersHavingBirthdayToday.length >= 1) {
      winstonLog.log(
        'info',
        'Initiating birthday wish sending to the following customers: %o',
        customersHavingBirthdayToday.map((customer) => customer.name),
        {
          label: 'Birthday Wish',
        },
      );
      customersHavingBirthdayToday.forEach((customer) => {
        this.sendBirthdayWishThroughEmail(customer.email, customer.name);
      });
    }
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findAllHavingSpecificBirthdate(dob: string): Customer[] {
    return this.customers.filter(
      (customer) => customer.dob.substring(5) === dob.substring(5), // Matches only the month and the date
    );
  }

  findOne(id: string): Customer {
    return this.customers.find((customer) => customer.customer_id === id);
  }

  create(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      customer_id: (this.customers.length + 1).toString(),
      name: createCustomerDto.name,
      email: createCustomerDto.email,
      dob: createCustomerDto.dob,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto): Customer {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.customer_id === id,
    );
    if (customerIndex === -1) {
      return null;
    }
    this.customers[customerIndex] = {
      ...this.customers[customerIndex],
      ...updateCustomerDto,
    };
    return this.customers[customerIndex];
  }

  remove(id: string): boolean {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.customer_id === id,
    );
    if (customerIndex === -1) {
      return false;
    }
    this.customers.splice(customerIndex, 1);
    return true;
  }

  // Service to send birthday wish email
  sendBirthdayWishThroughEmail(email: string, name: string): boolean {
    const senderEmail = process.env.SENDER_EMAIL_ADDRESS;
    const birthdayWish = {
      from: `"CRM XYZ" <${senderEmail}>`,
      to: email,
      subject: 'Happy Birthday from XYZ!',
      text: `Dear ${name},\n\nWe at XYZ wish you a very Happy Birthday! We hope your day is filled with joy and laughter. Thank you for being a valued customer of our company.\n\nWarm regards,\nThe XYZ Team`,
      html: `
        <html>
            <body>
                <h1>Happy Birthday, ${name}!</h1>
                <p>We at <strong>XYZ</strong> wish you a very Happy Birthday! We hope your day is filled with joy and laughter.</p>
                <p>Thank you for being a valued customer of our company.</p>
                <p>Warm regards,<br>The XYZ Team</p>
            </body>
        </html>`,
    };
    winstonLog.log(
      'info',
      'Successfully sent the birthday wish to %o. Email Details: %o',
      name,
      birthdayWish,
      {
        label: 'Birthday Wish',
      },
    );
    return true;
  }
}
