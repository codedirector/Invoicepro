import { prisma } from "./prisma"

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@invoicepro.com",
      name: "Test User",
    },
  })

  console.log(user)
}

main()
