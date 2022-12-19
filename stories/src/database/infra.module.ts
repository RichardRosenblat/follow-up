import { Global } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { Database } from "./database";

@Global()
@Module({
    exports: [{ provide: "IDatabase", useClass: Database }],
    providers: [{ provide: "IDatabase", useClass: Database }],
})
export class InfraModule {}
