import { resolve } from "path";

const compiler = new Bun.Transpiler({ loader: 'ts', minifyWhitespace: true  });

function compile(code: string) {
  return compiler.transformSync(code);
}
export async function compileTS(name: string) {
  const filename = resolve('typescript', name + '.ts');
  const code = await Bun.file(filename).text();
  return compiler.transform(code);
}