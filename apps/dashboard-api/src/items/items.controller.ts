import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { AuthGuard, type AuthedRequest } from "../auth/auth.guard";
import { ItemsService } from "./items.service";
import {
  CreateItemDto,
  PatchItemDto,
  ReorderBulkDto,
  ReorderItemDto,
  UpdateItemDto,
} from "./dto";

function ctx(req: Request) {
  const { restaurantId } = (req as AuthedRequest).authUser;
  return { restaurantId };
}

@Controller("items")
@UseGuards(AuthGuard)
export class ItemsController {
  constructor(private readonly svc: ItemsService) {}

  @Get()
  list(@Req() req: Request) {
    return this.svc.list(ctx(req));
  }

  @Post()
  create(@Req() req: Request, @Body() body: CreateItemDto) {
    return this.svc.create(ctx(req), body);
  }

  @Put(":id")
  update(@Req() req: Request, @Param("id") id: string, @Body() body: UpdateItemDto) {
    return this.svc.update(ctx(req), id, body);
  }

  @Patch(":id")
  patch(@Req() req: Request, @Param("id") id: string, @Body() body: PatchItemDto) {
    return this.svc.patch(ctx(req), id, body);
  }

  @Post(":id/duplicate")
  duplicate(@Req() req: Request, @Param("id") id: string) {
    return this.svc.duplicate(ctx(req), id);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Req() req: Request, @Param("id") id: string) {
    await this.svc.remove(ctx(req), id);
  }

  @Post("reorder")
  reorder(@Req() req: Request, @Body() body: ReorderItemDto) {
    return this.svc.reorder(ctx(req), body.itemId, body.direction);
  }

  @Post("reorder-bulk")
  reorderBulk(@Req() req: Request, @Body() body: ReorderBulkDto) {
    return this.svc.reorderBulk(ctx(req), body.items);
  }

}
