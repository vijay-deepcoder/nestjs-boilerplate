import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {Response} from 'express';
import {ApiException} from './api.exception';
import {ErrorCodes, Exceptions} from './exceptions';
import {EntityNotFoundError} from 'typeorm';
import {ValidationException} from '@core/exception/validation-exception';

@Catch(HttpException, EntityNotFoundError)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (exception instanceof ApiException) {
            return response.status(exception.getStatus()).json({
                isError: true,
                code: exception.getErrorCode(),
                message: exception.getMsg(),
                data: {},
            });
        }

        if (exception instanceof ValidationException) {
            const exceptionResponse = exception.getResponse();
            const message = (exceptionResponse[0] || null)?.constraints ?? null;
            return response.status(422).json({
                isError: true,
                code: ErrorCodes.ValidationFailed,
                message: message ? Object.values(message)[0] : Exceptions.getErrorsData(ErrorCodes.BadRequest).msg,
                data: {},
            });
        }

        if (exception instanceof EntityNotFoundError) {
            const error = Exceptions.getErrorsData(ErrorCodes.NotFound);
            return response.status(HttpStatus.NOT_FOUND).json({
                isError: true,
                code: error.code,
                message: error.msg,
                data: {},
            });
        }

        return response.status(exception.getStatus()).json({
            isError: true,
            code: Exceptions.getErrorsData(exception.getStatus()).code,
            message: exception.message,
            data: {},
        });
    }
}
