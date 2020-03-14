import * as fs from 'fs';
import * as Handlebars from 'handlebars';

export function template(path: string, context: object) {
  const template = Handlebars.compile(fs.readFileSync(path, 'utf-8'));
  return template(context);
}