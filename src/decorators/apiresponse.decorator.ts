import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import CustomResponse from '../interfaces/custom-response';

export const ApiOkCustomResponse = <T extends Type<unknown>>(dto: T) =>
  applyDecorators(
    ApiExtraModels(CustomResponse, dto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dto) },
              },
            },
          },
        ],
      },
    }),
  );
