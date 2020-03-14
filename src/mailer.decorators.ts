import { Inject } from '@nestjs/common';
import { getMailerConnectionToken } from './mailer.utils';

export const InjectMailer = (connection?) => {
  return Inject(getMailerConnectionToken(connection));
};

export const InjectConnection = InjectMailer;
