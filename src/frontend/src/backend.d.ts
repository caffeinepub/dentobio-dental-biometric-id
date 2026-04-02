import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface IdentificationRecord {
    status: string;
    dentalPatternHash: string;
    matchScore: bigint;
    subjectId: string;
    timestamp: Time;
}
export interface DemoRequest {
    name: string;
    email: string;
    message: string;
    organization: string;
}
export type Time = bigint;
export interface backendInterface {
    addIdentificationRecord(subjectId: string, matchScore: bigint, dentalPatternHash: string, status: string): Promise<void>;
    getAllDemoRequests(): Promise<Array<DemoRequest>>;
    getAllIdentificationRecords(): Promise<Array<IdentificationRecord>>;
    submitDemoRequest(name: string, email: string, organization: string, message: string): Promise<void>;
}
