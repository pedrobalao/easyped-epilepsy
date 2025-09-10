import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map