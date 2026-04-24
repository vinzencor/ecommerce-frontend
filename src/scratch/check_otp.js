/* global console */
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function findLatest() {
  try {
    const user = await prisma.users.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    console.log('Latest User:', user?.email || user?.phone)
    console.log('Name:', user?.name)
    console.log('OTP in DB:', user?.otp)
    console.log('OTP Type:', typeof user?.otp)
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

findLatest()
