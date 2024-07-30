import { ZodIssue } from 'zod';

//discriminated union: need to have a common property to distinguish between the two types
type ActionResult<T> =
  {status: 'success', data: T} | {status: 'error', error: string | ZodIssue[]};