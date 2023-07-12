import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HumanDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const human = request.res.locals.human;
    return human;
  },
);
