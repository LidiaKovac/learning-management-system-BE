//ERRORS: 

export class ApiError extends Error {
    public response: { status: number; message: string; detail: string };
 
     constructor(
         error: { status: number, message: string }, 
         detail: string, 
         ...args:any) {
        super(...args);
        this.response = {status: error.status, message: error.message, detail: detail};
    }
 }

module.exports = ApiError;