import * as fs from 'fs';

const templates: any = {};
let handlebars: any = null;

export function template(path: string, context: object) {
  let template = templates[path];

  if(!template) {
    template = fs.readFileSync(path, 'utf-8');
    templates[path] = template;
  }

  if(!handlebars) {
    try {
      handlebars = require('handlebars');
    } catch(e) {
      throw new Error('Cannot find module handlebars. To use this feature you must install it `npm install handlebars`');
    }
  }

  return handlebars.compile(template)(context);
}

// import * as fs from 'fs';
// import * as handlebars from 'handlebars';

// const templates: any = {};

// export function template(path: string, context: object) {
//   let template = templates[path];

//   if(!template) {
//     template = fs.readFileSync(path, 'utf-8');
//     templates[path] = template;
//   }

//   return handlebars.compile(template)(context);
// }
