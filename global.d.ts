import { PrismaClient } from "@prisma/client";

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
type MovieType = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: number;
};
