import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
   return membersData.map(async member => {
     await prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        passwordHash: await hash('password', 10),
        image: member.image,
        member: {
          create: {
            name: member.name,
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            image: member.image,
            recipes: {
              create: {
                title: 'recipe',
                image: member.recipeImg,
                content: member.description,
                created: new Date(member.created),
                updated: new Date(member.lastActive)
              }
            }
          }
        }
      }
    })
  })
}

async function main() {
   await seedMembers();
}

main()
  .catch((e)=> {
  console.error(e);
  process.exit(1);
}).finally(async ()=> {
  await prisma.$disconnect();
})

// seedMembers()
// .then(async ()=> {
//   await prisma.$disconnect()
// })
// .catch(async (e)=> {
//   console.error(e);
//   await prisma.$disconnect();
//   process.exit(1)
// })