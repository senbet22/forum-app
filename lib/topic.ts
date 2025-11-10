import axiosInstance from "./axios";
import { endpoints } from "./endpoints";
import { APIResponse } from "../types/auth";

// --- Delete function ---

export interface DeleteTopicData {
  result: string;
}

export type DeleteTopicResponse = APIResponse<DeleteTopicData>;

export async function deleteTopic(id: number) {
  const response = await axiosInstance.delete(endpoints.topic.delete(id));
  return response.data;
}

// --- Get topic tree function ---
export interface TopicNode {
  id: number;
  name: string;
  children?: TopicNode[];
}

export type TopicTreeResponse = APIResponse<TopicNode[]>;

export async function getTopicTree() {
  const response = await axiosInstance.get<TopicTreeResponse>(
    endpoints.topic.getTree
  );
  return response.data;
}

// --- Get topic by ID function ---
export interface Topic {
  id: number;
  name: string;
  isWritable: boolean;
  parentId: number | null;
  children?: Topic[];
}

export type TopicResponse = APIResponse<Topic>;

export async function getTopicById(id: number) {
  const response = await axiosInstance.get<TopicResponse>(
    endpoints.topic.getById(id)
  );
  return response.data;
}

// --- Check if topic is writable function ---
export interface TopicWritability {
  isWritable: boolean;
}

export type TopicWritabilityResponse = APIResponse<TopicWritability>;

export async function isTopicWritable(id: number) {
  const response = await axiosInstance.get<TopicWritabilityResponse>(
    endpoints.topic.isWritable(id)
  );
  return response.data;
}

// --- Migrate posts function ---
// Payload som sendes inn til API
export interface MigratePostsPayload {
  sourceId: number; // id til topic du flytter fra
  targetPostId: number; // id til topic du flytter til
  includeDescendants: boolean; // om underkategorier også skal inkluderes
}

// Data som kommer tilbake fra API (tilpass når du ser eksakt respons)
export interface MigratePostsData {
  migratedCount: number; // antall innlegg som ble flyttet
  sourceId: number;
  targetPostId: number;
}

// Typet respons
export type MigratePostsResponse = APIResponse<MigratePostsData>;

// Funksjon som migrerer innlegg fra en topic til en annen
export async function migratePosts(payload: MigratePostsPayload) {
  const response = await axiosInstance.post<MigratePostsResponse>(
    endpoints.topic.migratePosts,
    payload
  );
  return response.data;
}

// --- Create topic function ---
export interface CreateTopicPayload {
  name: string;
  isWritable: boolean;
  parentId: number | null;
}

export interface CreatedTopic {
  id: number;
  name: string;
  isWritable: boolean;
  parentId: number | null;
}

export type CreateTopicResponse = APIResponse<CreatedTopic>;

// Funksjon som oppretter en ny topic
export async function createTopic(payload: CreateTopicPayload) {
  const response = await axiosInstance.post<CreateTopicResponse>(
    endpoints.topic.create,
    payload
  );
  return response.data;
}

// --- Update topic function ---
export interface UpdateTopicPayload {
  name: string;
  isWritable: boolean;
  parentId: number | null;
}

export type UpdateTopicResponse = APIResponse<unknown[]>;

export async function updateTopic(id: number, payload: UpdateTopicPayload) {
  const response = await axiosInstance.put<UpdateTopicResponse>(
    endpoints.topic.update(id),
    payload
  );
  return response.data;
}
