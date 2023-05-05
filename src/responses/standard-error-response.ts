/* eslint-disable prettier/prettier */
export interface StandardError {
  code: string;
  description: string;
  traceId?: string;
  field?: string;
}

export interface StandardErrorResponse {
  errors: StandardError[];
}
