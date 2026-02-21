const { execSync } = require('child_process');

const TARGET_FILES = ['public/sitemap.xml', 'public/llms.txt', 'public/ai-context.json'];

const run = (command, options = {}) =>
  execSync(command, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  });

const verifyGeneratedArtifacts = () => {
  // Always regenerate from source-of-truth before checking git diff.
  run('node scripts/generate-ai-context.js', { stdio: 'inherit' });
  run('node scripts/generate-sitemap.js', { stdio: 'inherit' });

  const files = TARGET_FILES.join(' ');
  try {
    run(`git diff --exit-code -- ${files}`);
    console.log('Generated SEO/AI artifacts are up to date.');
  } catch (_error) {
    const diff = run(`git diff -- ${files}`);
    console.error('Generated SEO/AI artifacts are not committed.');
    console.error('Run `npm run sync:seo-artifacts`, then commit the updated files:');
    console.error(`- ${TARGET_FILES.join('\n- ')}`);
    if (diff.trim()) {
      console.error('\nDiff preview:\n');
      console.error(diff);
    }
    process.exit(1);
  }
};

verifyGeneratedArtifacts();
