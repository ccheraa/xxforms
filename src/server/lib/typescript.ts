import { resolve } from "path";
import { transform } from "esbuild";
import { readFile } from "fs/promises";

async function compileString(code: string) {
  try {
    const result = await transform(code, {
      loader: 'ts',
      minifyWhitespace: true,
      target: 'es2018',
    });
    return result.code;
  } catch (error) {
    console.error("esbuild transform error:", error);
    throw error;
  }
}

export async function compileTS(name: string) {
  const filename = resolve('typescript', name + '.ts');
  
  let code: string;
  try {
    code = await readFile(filename, 'utf8');
  } catch (readError) {
    console.error(`Error reading file ${filename}:`, readError);
    throw readError;
  }

  try {
    const result = await transform(code, {
      loader: 'ts',
      minifyWhitespace: true,
      target: 'es2018',
    });
    return result.code;
  } catch (transformError) {
    console.error(`esbuild transform error for ${filename}:`, transformError);
    throw transformError;
  }
}
