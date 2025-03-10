// @ts-ignore - clack is ESM and TS complains about that. It works though
import clack, { select } from '@clack/prompts';
import chalk from 'chalk';
import { abortIfCancelled } from '../../utils/clack-utils';

export async function configureTscSourcemapGenerationFlow(): Promise<void> {
  clack.log.step(
    `Add the following code to your ${chalk.bold(
      'tsconfig.json',
    )} file: ${chalk.dim(
      '(This ensures that source maps are generated correctly)',
    )}`,
  );

  // Intentially logging directly to console here so that the code can be copied/pasted directly
  // eslint-disable-next-line no-console
  console.log(codeSnippet);

  await abortIfCancelled(
    select({
      message: 'Did you update your config as shown in the snippet above?',
      options: [{ label: 'Yes, continue!', value: true }],
      initialValue: true,
    }),
  );
}

const codeSnippet = chalk.gray(`
{
  "compilerOptions": {
    ${chalk.greenBright('"sourceMap": true,')}
    ${chalk.greenBright('"inlineSources": true,')}

    // Set \`sourceRoot\` to  "/" to strip the build path prefix from
    // generated source code references. This will improve issue grouping in Sentry.
    ${chalk.greenBright('"sourceRoot": "/"')}
  }
}
`);
