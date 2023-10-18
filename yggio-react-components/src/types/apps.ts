interface App {
  id: string;
  name: string;
  tagline: string;
  tags?: string[];
  images?: {
    icon: string,
    screenshots?: string[],
  },
  metadata?: {
    softwareQuality: number;
  },
  description?: string,
  url?: string;
  demoUrl?: string;
  support?: string;
  public?: boolean;
}

export type {
  App,
};
