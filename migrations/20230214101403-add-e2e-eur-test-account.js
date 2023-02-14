'use strict';
import config from 'config';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    if (!['e2e', 'ci'].includes(config.env)) {
      return;
    }

    queryInterface.sequelize.query(`
        INSERT INTO "Collectives"
            (id, name, description, currency, 
              "createdAt", "updatedAt", "isActive", 
              "slug", settings, "LastEditedByUserId", 
              "CreatedByUserId", "HostCollectiveId", type, 
              "approvedAt", "isHostAccount", plan, "platformFeePercent")
          VALUES 
            (1334, 'e2e-eur-host', 'e2e eur tests', 'EUR',
            current_date, current_date, true,
            'e2e-eur-host', '{"apply": true, "features": {"conversations": true, "stripePaymentIntent": true}, "hostCollective": {"id": 1334}}', 9474, 
            9474, 1334, 'ORGANIZATION', 
            current_date, true, 'start-plan-2021', 0);

        INSERT INTO "Members"
          (id, "createdAt", "updatedAt", "CreatedByUserId", "CollectiveId", role, 
            "MemberCollectiveId", since)
          VALUES 
            (1334, current_date, current_date, 9474, 1334, 'ADMIN',
            10881, current_date);

        INSERT INTO "ConnectedAccounts"
          (id, service, username, 
            token, 
            data,
            "createdAt", "updatedAt", "deletedAt", "CreatedByUserId", 
            "CollectiveId")
          VALUES 
          (1334, 'stripe', 'acct_1BBQ2eBYycQg1OMf',
            'U2FsdGVkX18o9Mxr4Vu8nTLjwT3jFuEPoQ2NrbOfqn06WwinI21hWJovEj/7pt4v/y4hyZ2+oe6bc4PmeRi8WoU8CvPL0G2QjA2vWSSt+cKm9D7IdhVeaemhAyYWjZxE32PXneX11ZsmavMdC5IxXIuuQB4p4QMXXUb0UInGIP0=',
            '{"publishableKey": "pk_test_51BBQ2eBYycQg1OMfQMXRce1uiQGpNSIZC0FtGsOb53psUtspvA28A1s0PikTjz3DAyBLMzKSYcvkSSgFaeCGgQwj005rUwS5DU"}',
            current_date, current_date, NULL, 9474, 
            1334);
      `);
  },

  async down(queryInterface) {
    if (!['e2e', 'ci'].includes(config.env)) {
      return;
    }

    queryInterface.sequelize.query(`
        DELETE FROM "ConnectedAccounts" where id = 1334;
        DELETE FROM "Members" where id = 1334;
        DELETE FROM "Collectives" where id = 1334;
      `);
  },
};
