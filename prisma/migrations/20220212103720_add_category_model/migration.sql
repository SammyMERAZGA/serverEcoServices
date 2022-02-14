-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icone" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);
