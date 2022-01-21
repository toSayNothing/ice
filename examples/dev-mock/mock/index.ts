import { ServerResponse } from 'node:http';
import otherApi from './other';

export default {
  // 同时支持 GET 和 POST
  '/api/users/1': { data: {} },
  // 支持标准 HTTP
  'GET /api/users': { users: [1, 2] },
  'DELETE /api/users': { users: [1, 2] },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id });
  },
  'GET /api/new': (req, res: ServerResponse) => {
    const testUd = undefined;
    const age = testUd ?? 10;
    const obj = new ExampleClass();
    const data = obj.method();
    // const kk 11
    res
      .writeHead(200, {
        // 'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      })
      // .end(JSON.stringify({ name: "zhangsan", age }));
      .end(JSON.stringify(data));
  },
};

// @experimentalDecorators
function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second(): called');
  };
}

// class ExampleClass {
//   // @first()
//   // @second()
//   method(): { age: string; id: string } {
//     return {
//       age: 'fucking old now!',
//       id: 'hey, this is special',
//     };
//   }
// }
