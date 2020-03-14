import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { Transport, TransportOptions } from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';
import * as JSONTransport from 'nodemailer/lib/json-transport';
import * as SESTransport from 'nodemailer/lib/ses-transport';

export type Mailer = Transport['mailer'];
export type Options = 
  | SMTPTransport.Options
  | SMTPPool.Options
  | SendmailTransport.Options
  | StreamTransport.Options
  | JSONTransport.Options
  | SESTransport.Options
  | TransportOptions;

export type TransportType =
  | Options
  | SMTPTransport
  | SMTPPool
  | SendmailTransport
  | StreamTransport
  | JSONTransport
  | SESTransport
  | Transport
  | string;

export interface MailerModuleOptions {
  config: { transport?: TransportType, defaults?: Options }
}

export interface MailerModuleOptionsFactory {
  createMailerModuleOptions(): Promise<MailerModuleOptions> | MailerModuleOptions;
}

export interface MailerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MailerModuleOptionsFactory>;
  useExisting?: Type<MailerModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailerModuleOptions> | MailerModuleOptions;
}
