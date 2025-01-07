import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'fs';

export async function compareScreenshots(
  actualPath: string,
  expectedPath: string,
  diffPath: string
): Promise<boolean> {
  const actual = PNG.sync.read(fs.readFileSync(actualPath));
  const expected = PNG.sync.read(fs.readFileSync(expectedPath));

  const { width, height } = actual;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    actual.data,
    expected.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return numDiffPixels === 0; // Return true if images are identical
}
