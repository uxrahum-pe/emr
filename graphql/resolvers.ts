import { prisma } from '@/lib/prisma'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    patients: async () => {
      return await prisma.patient.findMany({
        orderBy: { registerDate: 'desc' },
      })
    },
    patient: async (_: any, { id }: { id: string }) => {
      const patient = await prisma.patient.findUnique({
        where: { id },
      })
      if (!patient) {
        throw new GraphQLError('Patient not found', {
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return patient
    },
  },
  Mutation: {
    createPatient: async (_: any, { name }: { name: string }) => {
      return await prisma.patient.create({
        data: { name },
      })
    },
    updatePatient: async (_: any, { id, name }: { id: string; name?: string }) => {
      const patient = await prisma.patient.findUnique({
        where: { id },
      })
      if (!patient) {
        throw new GraphQLError('Patient not found', {
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return await prisma.patient.update({
        where: { id },
        data: { name },
      })
    },
    deletePatient: async (_: any, { id }: { id: string }) => {
      const patient = await prisma.patient.findUnique({
        where: { id },
      })
      if (!patient) {
        throw new GraphQLError('Patient not found', {
          extensions: { code: 'NOT_FOUND' },
        })
      }
      await prisma.patient.delete({
        where: { id },
      })
      return true
    },
  },
}

