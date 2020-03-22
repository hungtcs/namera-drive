import 'zone.js/dist/zone-node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';
import { AppServerModule } from './src/main.server';
import { ngExpressEngine } from '@nguniversal/express-engine';

export * from './src/main.server';

export function app() {
  const server = express();
  // const distFolder = join(process.cwd(), 'dist/namera-drive-webapp/browser');
  const distFolder = join(__dirname, '../browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('views', distFolder);
  server.set('view engine', 'html');

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (request, response) => {
    response.render(indexHtml, {
      req: request,
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: request.baseUrl,
        },
      ],
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}
