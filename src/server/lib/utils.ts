import { exec } from "child_process";

export async function $(strings: TemplateStringsArray, ...expressions: any[]) {
  const command = strings.reduce((acc, str, i) => acc + str + (expressions[i] || ''), '');
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`execSync error: ${error.message}`);
        if (error) {
          console.error(`stderr: ${error.stderr?.toString()}`);
        }
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}
  
export function uid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}