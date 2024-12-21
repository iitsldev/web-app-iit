import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import turndown from 'turndown';

const turndownService = new turndown();
const newsEventsDirectory = path.join(process.cwd(), 'news_events');

// Ensure the directory exists
if (!fs.existsSync(newsEventsDirectory)) {
  fs.mkdirSync(newsEventsDirectory, { recursive: true });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // If directory is empty or doesn't exist, return empty array
      if (!fs.existsSync(newsEventsDirectory)) {
        return res.status(200).json([]);
      }

      const files = fs.readdirSync(newsEventsDirectory);
      const posts = files
        .filter(filename => filename.endsWith('.md'))
        .map(filename => {
          const filePath = path.join(newsEventsDirectory, filename);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          return {
            slug: filename.replace('.md', ''),
            content,
            ...data
          };
        });
      
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error reading posts:', error);
      res.status(500).json({ error: 'Error reading posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, type, date, image, content, dateStr } = req.body;
      
      // Create slug from date and title
      const slug = `${dateStr}-${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}`;
      
      // Convert HTML to Markdown
      const markdown = turndownService.turndown(content || '');
      
      // Create frontmatter
      const frontmatter = {
        type,
        date,
        title,
        dateStr,
        image,
      };
      
      // Create markdown file content
      const fileContent = matter.stringify(markdown, frontmatter);
      
      // Write to file
      fs.writeFileSync(
        path.join(newsEventsDirectory, `${slug}.md`),
        fileContent
      );
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}