import fs from 'fs';
import path from 'path';
import slugify from './slugify';

export type CocktailIngredient = {
  name: string;
  measurement: string | null;
};

export type Cocktail = {
  slug: string;
  name: string;
  category: string;
  IBA: string | null;
  glass: string;
  isAlcoholic: boolean;
  image: string;
  ingredients: CocktailIngredient[];
  instructions: string;
};

function parseFrontmatter(content: string): {
  data: Record<string, any>;
  body: string;
} {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }

  const yamlStr = match[1];
  const body = match[2].trim();
  const data: Record<string, any> = {};

  let currentKey = '';
  let currentList: any[] | null = null;
  let currentListItem: Record<string, any> | null = null;

  for (const line of yamlStr.split('\n')) {
    const trimmed = line.trimEnd();

    // Top-level key: value
    const kvMatch = trimmed.match(/^(\w[\w\s]*?):\s*(.+)$/);
    if (kvMatch) {
      if (currentList && currentListItem) {
        currentList.push(currentListItem);
        currentListItem = null;
      }
      if (currentList) {
        data[currentKey] = currentList;
        currentList = null;
      }
      const key = kvMatch[1].trim();
      let value: any = kvMatch[2].trim();
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (value === 'null') value = null;
      data[key] = value;
      currentKey = key;
      continue;
    }

    // Top-level key with no value (start of list)
    const listStartMatch = trimmed.match(/^(\w[\w\s]*?):\s*$/);
    if (listStartMatch) {
      if (currentList && currentListItem) {
        currentList.push(currentListItem);
        currentListItem = null;
      }
      if (currentList) {
        data[currentKey] = currentList;
      }
      currentKey = listStartMatch[1].trim();
      currentList = [];
      continue;
    }

    // List item with key: value (e.g. "  - name: Vodka")
    const listItemMatch = trimmed.match(/^\s+-\s+(\w+):\s*(.+)$/);
    if (listItemMatch && currentList !== null) {
      if (currentListItem) {
        currentList.push(currentListItem);
      }
      currentListItem = {};
      let value: any = listItemMatch[2].trim();
      if (value === 'null') value = null;
      currentListItem[listItemMatch[1]] = value;
      continue;
    }

    // Continuation key: value inside a list item (e.g. "    measurement: 50 ml")
    const contMatch = trimmed.match(/^\s+(\w+):\s*(.+)$/);
    if (contMatch && currentListItem) {
      let value: any = contMatch[2].trim();
      if (value === 'null') value = null;
      currentListItem[contMatch[1]] = value;
      continue;
    }
  }

  if (currentList && currentListItem) {
    currentList.push(currentListItem);
  }
  if (currentList) {
    data[currentKey] = currentList;
  }

  return { data, body };
}

function loadCocktailFromFile(filePath: string): Cocktail {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, body } = parseFrontmatter(content);
  const slug = path.basename(filePath, '.md');

  return {
    slug,
    name: data.name,
    category: data.category,
    IBA: data.IBA,
    glass: data.glass,
    isAlcoholic: data.isAlcoholic,
    image: data.image,
    ingredients: (data.ingredients || []).map((ing: any) => ({
      name: ing.name,
      measurement: ing.measurement || null,
    })),
    instructions: body,
  };
}

const cocktailsDir = path.join(process.cwd(), 'src/data/cocktails');

export function getAllCocktails(): Cocktail[] {
  const files = fs.readdirSync(cocktailsDir).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => loadCocktailFromFile(path.join(cocktailsDir, file)))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCocktailBySlug(slug: string): Cocktail | undefined {
  const filePath = path.join(cocktailsDir, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    return loadCocktailFromFile(filePath);
  }
  // Fallback: search all cocktails by slugified name
  return getAllCocktails().find((c) => slugify(c.name) === slug);
}
