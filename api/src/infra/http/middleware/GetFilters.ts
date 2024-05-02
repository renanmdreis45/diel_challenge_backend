import { Response, Request, NextFunction } from 'express';

/**
 * Get startDate and endDate from query params
 * @param req
 * @param res
 * @param next
 */
export async function getFilters(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { startDate, endDate } = req.query;

    // TODO: validate startDate and endDate
    const filters = {
        startDate: startDate ? new Date(String(startDate)) : undefined,
        endDate: endDate ? new Date(String(endDate) + ' 23:59:59') : undefined,
    };

    req.query.startDate = filters.startDate as string | string[] | undefined;
    req.query.endDate = filters.endDate as string | string[] | undefined;

    next();
}