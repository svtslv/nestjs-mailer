import { MailerModuleOptions } from "./mailer.interfaces";
import * as Nodemailer from 'nodemailer';
import {
  MAILER_MODULE_CONNECTION,
  MAILER_MODULE_CONNECTION_TOKEN,
  MAILER_MODULE_OPTIONS_TOKEN
} from './mailer.constants';

export function getMailerOptionsToken(connection: string): string {
  return `${ connection || MAILER_MODULE_CONNECTION }_${ MAILER_MODULE_OPTIONS_TOKEN }`;
}

export function getMailerConnectionToken(connection: string): string {
  return `${ connection || MAILER_MODULE_CONNECTION }_${ MAILER_MODULE_CONNECTION_TOKEN }`;
}

export function createMailerConnection(options: MailerModuleOptions): any {
  const { config } = options;
  return Nodemailer.createTransport(config.transport, config.defaults);
}
