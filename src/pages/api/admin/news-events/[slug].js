import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import turndown from 'turndown';

const turndownService = new turndown();
const newsEventsDirectory = path.join(process.cwd(), 'news_events');

export default async function handler(req, res) {
  const { slug } = req.query;
  const filePath = path.join(newsEventsDirectory, `${slug}.md`);

  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      res.status(200).json({ ...data, content });
    } catch (error) {
      console.error('Error getting post:', error);
      res.status(500).json({ error: 'Error getting post' });
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { title, type, date, image, content, dateStr } = req.body;

      // Convert HTML to Markdown
      const markdown = content; //turndownService.turndown(content || '');

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
      fs.writeFileSync(filePath, fileContent);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Error updating post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      fs.unlinkSync(filePath);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}