import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { xform, xslt, xxform } from './lib/xml'
import { compileTS } from './lib/typescript'
import { compileSCSS } from './lib/scss'
import { readFile } from 'fs/promises'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'

const app = new Hono()

app.use(logger());

app.use('/res/*', serveStatic({
  root: './static',
  rewriteRequestPath: (path) => path.replace(/^\/res/, ''),
  onNotFound: (path, c) => {
    console.log(`${path} is not found, you access ${c.req.path}`)
  },
}))
app.use('/xsltforms/*', serveStatic({
  root: './static',
  onNotFound: (path, c) => {
    console.log(`${path} is not found, you access ${c.req.path}`)
  },
}))

app.get('/xsl/:xml/:xsl', async c => {
  const xml = c.req.param('xml');
  const xsl = c.req.param('xsl');
  const result = await xslt(xml, xsl);
  return c.text(result, 200, { 'Content-Type': 'text/html' });
});

app.get('/xform/:xml', async c => {
  const xml = c.req.param('xml');
  const result = await xform(xml);
  return c.text(result, 200, { 'Content-Type': 'text/html' });
});

app.get('/form/:xml', async c => {
  const xml = c.req.param('xml');
  const result = await xxform(xml);
  return c.text(result, 200, { 'Content-Type': 'text/html' });
});

app.get('/ts/:path', async c => {
  return c.text(await compileTS(c.req.param('path')), 200, { 'Content-Type': 'text/javascript' });
});
app.get('/scss/:path', async c => {
  return c.text(compileSCSS(c.req.param('path')), 200, { 'Content-Type': 'text/css' });
});

app.get('/', async (c) => {
  return c.html(await readFile('./index.html', 'utf-8'));
});

serve(app);

export default app
