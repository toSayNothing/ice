import { ServerResponse } from 'node:http';

export default {
  '/api/foo/bassr31': (req, res: ServerResponse) => {
    const testUd = undefined;
    const age = testUd ?? 10;
    // const kk 11
    res
      .writeHead(200, {
        // 'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify({ name: 'zhangsan', age }));
  },
  '/api/foo/bassr312': (req, res: ServerResponse) => {
    const testUd = undefined;
    const age = testUd ?? 10;
    // const kk 11
    res
      .writeHead(200, {
        // 'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify({ name: 'zhangsan', age }));
  },
  '/ap3i/foo/bassr31': (req, res: ServerResponse) => {
    const testUd = undefined;
    const age = testUd ?? 10;
    // const kk 11
    res
      .writeHead(200, {
        // 'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify({ name: 'zhangsan', age }));
  },
  '/api3/foo/bassr31': (req, res: ServerResponse) => {
    const testUd = undefined;
    const age = testUd ?? 10;
    // const kk 11
    res
      .writeHead(200, {
        // 'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify({ name: 'zhangsan', age }));
  },
  '/api/fo333o/bassr31': (req, res: ServerResponse) => {
    const testUd = undefined;
    const age = testUd ?? 10;
    // const kk 11
    res
      .writeHead(200, {
        // 'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      })
      .end(JSON.stringify({ name: 'zhangsan', age }));
  },
};
