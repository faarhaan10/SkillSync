import { ExpressErrorMiddlewareInterface, Middleware,  } from "routing-controllers";
import { Service } from "typedi";
import { Request, Response,NextFunction } from "express"; // 🆕 Add this!

@Middleware({ type: "after" })
@Service() 
export class CustomErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, req: Request, res: Response, next: NextFunction) {
        // Tip: routing-controllers uses .httpCode for its errors
        const statusCode = error.httpCode || error.statusCode || 500;
        const message = error.message || "Internal Server Error";

        res.status(statusCode).json({
            success: false,
            statusCode,
            name:error.name || "InternalServerError",
            message:error.message || "An unexpected error occurred!", 
            errors: error.errors || undefined, 
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined 
        });
    }
}
