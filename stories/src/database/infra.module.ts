import { Global } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { Database } from "./database";
@Global()
@Module({
	exports: [Database],
	providers: [Database],
})
export class InfraModule {}
