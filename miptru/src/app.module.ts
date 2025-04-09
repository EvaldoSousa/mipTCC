import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { CoverModule } from "./modules/cover/cover.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: "miptru",
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 12,
    }),
    AuthModule,
    ReportsModule,
    CoverModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
