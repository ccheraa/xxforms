import { $, randomUUIDv7, ShellError } from "bun";
import { basename, resolve } from "path";
import { existsSync, unlinkSync } from "fs";

export async function transformXml(xml: string, xsl: string): Promise<string> {
  let out: string;
  while (existsSync(out = resolve('assets/tmp', `${basename(xml)}_${basename(xsl)}_${randomUUIDv7()}.xml`))) {}
  try {
    console.log(`Transforming ${xml} with ${xsl}...`);
    await $`java -jar saxon/saxon.jar -s:${xml} -xsl:${xsl} -o:${out} baseuri="/xsltforms/"`;
    return out;
  } catch (error: any) {
    console.log('-------------------------------------');
    console.log((error as ShellError).text());
    console.log('-------------------------------------');
    console.error(error);
    if (existsSync(out)) {
      unlinkSync(out);
    }
    return error.message;
  }
}

export async function transform(xml: string, xsl: string, clean = true): Promise<string> {
  const out = await transformXml(xml, xsl);
  const result = await Bun.file(out).text();
  if (clean) {
    unlinkSync(out);
  }
  return result;
}

export async function xslt(xml: string, xsl: string): Promise<string> {
  return transform(resolve('assets/xml', xml + '.xml'), resolve('assets/xsl', xsl + '.xsl'));
}

export async function xform(xml: string): Promise<string> {
  return transform(resolve('assets/form', xml + '.xml'), resolve('assets/xsl/xsltforms.xsl'));
}

export async function xxform(xml: string): Promise<string> {
  if (xml === 'test') {
    return transform(resolve('assets/form/test.xhtml'), resolve('assets/xsl/xsltforms.xsl'));
  }
  // return transform(resolve('assets/form', xml + '.xhtml'), resolve('assets/xsl/xsltforms.xsl'));
  // return transform(resolve('assets/form', xml + '.xhtml'), resolve('assets/xsl/xx-forms.xsl'));
  const out = await transformXml(resolve('assets/form', xml + '.xhtml'), resolve('assets/xsl/xx-forms.xsl'));
  const result = await transform(out, resolve('assets/xsl/xsltforms.xsl'));
  unlinkSync(out);
  return result;
}
