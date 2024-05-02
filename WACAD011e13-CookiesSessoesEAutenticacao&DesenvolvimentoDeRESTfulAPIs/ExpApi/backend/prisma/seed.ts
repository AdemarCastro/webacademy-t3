import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
    const admin = await prisma.tipoUsuario.upsert({
        where: { id: TiposUsuarios.ADMIN, rotulo: "admin" },
        update: {}, 
        create: { id: TiposUsuarios.ADMIN, rotulo: "admin" }, 
    });

    const client = await prisma.tipoUsuario.upsert({
        where: { id: TiposUsuarios.CLIENT, rotulo: "client" },
        update: {}, 
        create: { id: TiposUsuarios.CLIENT, rotulo: "client" },
    });

    console.log({ admin, client });
};

seed()
   .then(() => {
        console.log("Seed executado com sucesso!");
        prisma.$disconnect();
    })
   .catch((err) => {
        console.error("Erro ao executar o seed:", err);
        prisma.$disconnect();
    });
