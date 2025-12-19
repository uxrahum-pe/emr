// TODO: DB 연결 시 주석 해제
// import { prisma } from '@/lib/prisma'
import { GraphQLError } from "graphql";
import { z } from "zod";
import { patientSchema } from "@/lib/validations/schemas";

export const resolvers = {
  Query: {
    patients: async () => {
      // TODO: DB 연결 시 주석 해제
      // return await prisma.patient.findMany({
      //   orderBy: { registerDate: 'desc' },
      // })
      return [];
    },
    patient: async (_: any, { id }: { id: string }) => {
      // Zod 검증
      try {
        z.string().uuid("올바른 UUID 형식이 아닙니다").parse(id);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new GraphQLError("Validation error", {
            extensions: { code: "VALIDATION_ERROR", errors: error.issues },
          });
        }
        throw error;
      }

      // TODO: DB 연결 시 주석 해제
      // const patient = await prisma.patient.findUnique({
      //   where: { id },
      // })
      // if (!patient) {
      //   throw new GraphQLError('Patient not found', {
      //     extensions: { code: 'NOT_FOUND' },
      //   })
      // }
      // return patient
      throw new GraphQLError("Patient not found", {
        extensions: { code: "NOT_FOUND" },
      });
    },
  },
  Mutation: {
    createPatient: async (_: any, { name }: { name: string }) => {
      // Zod 검증
      try {
        const validatedData = patientSchema.parse({
          name,
          registerDate: new Date(),
        });

        // TODO: DB 연결 시 주석 해제
        // return await prisma.patient.create({
        //   data: validatedData,
        // })
        return {
          id: "temp-id",
          name: validatedData.name,
          registerDate: validatedData.registerDate,
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new GraphQLError("Validation error", {
            extensions: { code: "VALIDATION_ERROR", errors: error.issues },
          });
        }
        throw error;
      }
    },
    updatePatient: async (
      _: any,
      { id, name }: { id: string; name?: string }
    ) => {
      // Zod 검증
      if (name !== undefined) {
        try {
          const nameSchema = z
            .string()
            .min(1, "이름을 입력해주세요")
            .max(100, "이름은 100자 이하여야 합니다");
          nameSchema.parse(name);
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new GraphQLError("Validation error", {
              extensions: { code: "VALIDATION_ERROR", errors: error.issues },
            });
          }
          throw error;
        }
      }
      // TODO: DB 연결 시 주석 해제
      // const patient = await prisma.patient.findUnique({
      //   where: { id },
      // })
      // if (!patient) {
      //   throw new GraphQLError('Patient not found', {
      //     extensions: { code: 'NOT_FOUND' },
      //   })
      // }
      // return await prisma.patient.update({
      //   where: { id },
      //   data: { name },
      // })
      throw new GraphQLError("Patient not found", {
        extensions: { code: "NOT_FOUND" },
      });
    },
    deletePatient: async (_: any, { id }: { id: string }) => {
      // TODO: DB 연결 시 주석 해제
      // const patient = await prisma.patient.findUnique({
      //   where: { id },
      // })
      // if (!patient) {
      //   throw new GraphQLError('Patient not found', {
      //     extensions: { code: 'NOT_FOUND' },
      //   })
      // }
      // await prisma.patient.delete({
      //   where: { id },
      // })
      // return true
      throw new GraphQLError("Patient not found", {
        extensions: { code: "NOT_FOUND" },
      });
    },
  },
};
