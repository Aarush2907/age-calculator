import fs from 'fs';
import path from 'path';

const pagesDir = 'e:/age calculator/src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro'));

const exclude = [
  '404.astro', '500.astro', 'about-us.astro', 'contact-us.astro', 
  'privacy-policy.astro', 'terms-and-conditions.astro', 'index.astro',
  'bmi-calculator.astro', 'pregnancy-due-date-calculator.astro',
  'life-expectancy-calculator.astro', 'retirement-calculator.astro',
  'pet-age-calculator.astro', 'percentage-calculator.astro'
];

for (const file of files) {
  if (exclude.includes(file)) continue;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let modified = false;
  
  // Add import if not exists
  if (!content.includes('import RelatedArticles')) {
    content = content.replace(
      /import ToolsGrid from '\.\.\/components\/ToolsGrid\.astro';/g,
      "import ToolsGrid from '../components/ToolsGrid.astro';\nimport RelatedArticles from '../components/RelatedArticles.astro';"
    );
    modified = true;
  }
  
  // Add component if not exists
  if (!content.includes('<RelatedArticles')) {
    // Some calculators might have a different category, but 'general' is fine as a fallback
    let category = 'general';
    if (file.includes('age') || file.includes('generation') || file.includes('birthday')) category = 'general';
    if (file.includes('menstrual')) category = 'pregnancy';
    
    content = content.replace(
      /<ToolsGrid \/>\s*<Footer slot="footer" \/>/g,
      `<RelatedArticles category="${category}" />\n\n  <ToolsGrid />\n  <Footer slot="footer" />`
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
