import { Inject } from '@nestjs/common';
import { getMailerConnectionToken } from './mailer.utils';

export const InjectMailer = (connection?: string) => {
  return Inject(getMailerConnectionToken(connection));
};
