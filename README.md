# NestJS Mailer

<a href="https://www.npmjs.com/package/nestjs-mailer"><img src="https://img.shields.io/npm/v/nestjs-mailer.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-mailer"><img src="https://img.shields.io/npm/l/nestjs-mailer.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates Nodemailer with Nest

## Installation

```bash
npm install nestjs-mailer nodemailer handlebars
```

```bash
npm install -D @types/nodemailer
```

Hint: handlebars is an optional dependency, if you want to use the template helper, you must install it.

## Examples

### MailerModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MailerModule } from 'nestjs-mailer';
import { AppController } from './app.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      config: {
        transport: 'smtp://login:password@smtp.mailtrap.io',
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### MailerModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { MailerModule } from 'nestjs-mailer';
import { AppController } from './app.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        config: {
          transport: 'smtp://login:password@smtp.mailtrap.io',
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectMailer(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';

@Controller()
export class AppController {
  constructor(
    @InjectMailer() private readonly mailer: Mailer,
  ) {}

  @Get()
  async getHello() {
    this.mailer.sendMail({
      from: '"Sviatoslav" <sviatoslav@example.com>',
      to: 'john@example.com',
      subject: 'Hello ✔',
      text: 'Hello John',
      html: template('src/mailer/hello.hbs', { name: 'John' })
    }).catch(e => console.log(e));
  }
}
```

## License

MIT
