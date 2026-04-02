import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IdentificationRecord } from "../backend.d";
import { useActor } from "./useActor";

export function useGetIdentificationRecords() {
  const { actor, isFetching } = useActor();
  return useQuery<IdentificationRecord[]>({
    queryKey: ["identificationRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllIdentificationRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddIdentificationRecord() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      subjectId,
      matchScore,
      dentalPatternHash,
      status,
    }: {
      subjectId: string;
      matchScore: bigint;
      dentalPatternHash: string;
      status: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.addIdentificationRecord(
        subjectId,
        matchScore,
        dentalPatternHash,
        status,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identificationRecords"] });
    },
  });
}

export function useSubmitDemoRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      organization,
      message,
    }: {
      name: string;
      email: string;
      organization: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitDemoRequest(name, email, organization, message);
    },
  });
}
