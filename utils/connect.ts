// lib/db.ts

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;


// import { PrismaClient } from "@prisma/client";

// let prisma 
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient()
// } else {
//     if (!global.prisma){
//         global.prisma = new PrismaClient()
//     }
//     prisma = global.prisma
// }

// export default prisma