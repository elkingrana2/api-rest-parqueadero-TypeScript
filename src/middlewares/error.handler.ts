/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable prettier/prettier */

function errorHandler(err: any, req: any, res: any, next: any) {
  if (typeof err === 'string') {
    // custom application error
    return res
      .status(400)
      .json({
        errors: [
          { code: 'BAD_REQUEST', description: err, traceId: err.toString() },
        ],
      });
  }

  // default to 500 server error
  return res
    .status(500)
    .json({
      errors: [
        {
          code: 'UNKNOWN_ERROR',
          description: err.message,
          traceId: err.toString(),
        },
      ],
    });
}

export default errorHandler;
