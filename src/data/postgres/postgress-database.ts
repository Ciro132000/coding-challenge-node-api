import { PrismaClient } from '@prisma/client';

interface Options {
    databaseUrl: string;
}

export class PostgresDatabase {

    static _prisma: PrismaClient;

    static async connect(options: Options) {

        const { databaseUrl } = options;

        try {

            this._prisma = new PrismaClient({
                datasources: {
                    db: {
                        url: databaseUrl,
                    },
                },
            });
            
            // this._prisma = new PrismaClient();
            

            await this._prisma.$connect();

            console.log('PostgreSQL connected');

        } catch (error) {

            console.log('PostgreSQL connection error');

            throw error;
        }
    }

    static get prisma(): PrismaClient {

        if (!this._prisma) {
            console.log(this._prisma)
            throw new Error('PostgreSQL has not been initialized');
        }

        return this._prisma;
    }
}