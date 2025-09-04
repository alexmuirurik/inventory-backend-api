import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CheckoutsService {
    constructor(private prisma: PrismaService) {}

    async getAll() {
        return await this.prisma.checkoutSession.findMany()
    }

    async getActiveSession(userId: string) {
        return await this.prisma.checkoutSession.findFirst({
            where: {
                cashierId: userId,
                status: 'OPEN',
            },
        })
    }

    async getSession(id: string) {
        return await this.prisma.checkoutSession.findUnique({
            where: {
                id,
            },
        })
    }

    async getSessionByUserId(userId: string) {
        return await this.prisma.checkoutSession.findMany({
            where: {
                cashierId: userId,
            },
        })
    }

    async create(userId: string, openingCash: number) {
        try {
            const session = await this.prisma.checkoutSession.create({
                data: {
                    cashierId: userId,
                    openingCash,
                },
            })

            return session
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async close(userId: string, closingCash: number) {
        try {
            const activeSession = await this.getActiveSession(userId)
            if (!activeSession) {
                return Promise.reject(new Error('No active session found'))
            }

            const session = await this.prisma.checkoutSession.update({
                where: {
                    id: activeSession.id,
                },
                data: {
                    status: 'CLOSED',
                    closingCash,
                },
            })

            return session
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
