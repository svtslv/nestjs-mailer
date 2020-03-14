import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { MailerModuleAsyncOptions, MailerModuleOptions, MailerModuleOptionsFactory } from './mailer.interfaces';
import { createMailerConnection, getMailerOptionsToken, getMailerConnectionToken } from './mailer.utils'

@Global()
@Module({})
export class MailerCoreModule {

  /* forRoot */
  static forRoot(options: MailerModuleOptions, connection?: string): DynamicModule {

    const mailerOptionsProvider: Provider = {
      provide: getMailerOptionsToken(connection),
      useValue: options,
    };

    const mailerConnectionProvider: Provider = {
      provide: getMailerConnectionToken(connection),
      useValue: createMailerConnection(options),
    };

    return {
      module: MailerCoreModule,
      providers: [
        mailerOptionsProvider,
        mailerConnectionProvider,
      ],
      exports: [
        mailerOptionsProvider,
        mailerConnectionProvider,
      ],
    };
  }

  /* forRootAsync */
  public static forRootAsync(options: MailerModuleAsyncOptions, connection: string): DynamicModule {

    const mailerConnectionProvider: Provider = {
      provide: getMailerConnectionToken(connection),
      useFactory(options: MailerModuleOptions) {
        return createMailerConnection(options)
      },
      inject: [getMailerOptionsToken(connection)],
    };

    return {
      module: MailerCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), mailerConnectionProvider],
      exports: [mailerConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: MailerModuleAsyncOptions, connection?: string): Provider[] {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection)
      ];
    }

    return [ 
      this.createAsyncOptionsProvider(options, connection), 
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: MailerModuleAsyncOptions, connection?: string): Provider {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getMailerOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getMailerOptionsToken(connection),
      async useFactory(optionsFactory: MailerModuleOptionsFactory): Promise<MailerModuleOptions> {
        return await optionsFactory.createMailerModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}