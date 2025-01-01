import * as fs from 'node:fs';
import path from 'node:path';

export function formatDir(target?: string) {
  return target?.trim().replace(/\/+$/g, '');
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

export function removeDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.rmSync(path.resolve(dir), { recursive: true, force: true });
}


export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}