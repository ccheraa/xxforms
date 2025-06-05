import { writeFileSync } from "fs";
import { resolve } from "path";
import { compile } from 'sass';

export function compileSCSS(name: string): string {
  let filename: string;
  if (name.includes(',')) {
    filename = resolve('scss/temp', name + '.scss');
    const scss = name.split(',').map(file => `@use "../${file}" as *;`).join('\n');
    writeFileSync(filename, scss);
  } else {
    filename = resolve('scss', name + '.scss');
  }
  return compile(filename).css;
}