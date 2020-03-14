import { DynamicModule, Module } from '@nestjs/common';
import { MailerCoreModule } from './mailer.core-module';
import { MailerModuleAsyncOptions, MailerModuleOptions } from './mailer.interfaces';

@Module({})
export class MailerModule {
  public static forRoot(options: MailerModuleOptions, connection?: string): DynamicModule {
    return {
      module: MailerModule,
      imports: [MailerCoreModule.forRoot(options, connection)],
      exports: [MailerCoreModule],
    };
  }

  public static forRootAsync(options: MailerModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: MailerModule,
      imports: [MailerCoreModule.forRootAsync(options, connection)],
      exports: [MailerCoreModule],
    };
  }
}
