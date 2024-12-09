export interface MediaItem {
  id: number;
  url: string;
  type: "image" | "video";
  metadata: Record<string, any>;
  metadataText: string;
  originUrl: string;
  createdAt: string;
}
