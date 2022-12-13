import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { HttpStatus } from "@nestjs/common";

export const storyNotFoundError = new HttpErrorByCode[HttpStatus.NOT_FOUND](["story uuid not found"]);
