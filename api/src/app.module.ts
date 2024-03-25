import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrphanSchema } from './schema/orphan.schema';
import { OrphanService } from './orphan/orphan.service';
import { OrphanController } from './orphan/orphan.controller';
import { GuardianController } from './guardian/guardian.controller';
import { GuardianService } from './guardian/guardian.service';
import { GuardianSchema } from './schema/guardian.schema';
import { OrphanageSchema } from './schema/orphanage.schema';
import { DonationSchema } from './schema/donation.schema';
import { OrphanageController } from './orphanage/orphanage.controller';
import { DonationController } from './donation/donation.controller';
import { OrphanageService } from './orphanage/orphanage.service';
import { DonationService } from './donation/donation.service';
import { WithdrawSchema } from './schema/withdraw.schema';
import { WithdrawController } from './withdraw/withdraw.controller';
import { WithdrawService } from './withdraw/withdraw.service';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.DATABASE_URL, {
    //   dbName: 'orphandb',
    // }),
    MongooseModule.forRoot("mongodb://localhost:27017", {
      dbName: 'orphandb',
    }),
    MongooseModule.forFeature([
      { name: 'Orphan', schema: OrphanSchema },
      { name: 'Guardian', schema: GuardianSchema },
      { name: 'Orphanage', schema: OrphanageSchema },
      { name: 'Donation', schema: DonationSchema },
      { name: 'Withdraw', schema: WithdrawSchema },
    ]),
  ],
  controllers: [
    AppController,
    OrphanController,
    GuardianController,
    OrphanageController,
    DonationController,
    WithdrawController
  ],
  providers: [
    AppService,
    OrphanService,
    GuardianService,
    OrphanageService,
    DonationService,
    WithdrawService
  ],
})
export class AppModule {}
