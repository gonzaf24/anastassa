import { Button } from "@nextui-org/button";
import Link from "next/link";

import { categories } from "@/lib/data";

export const Menu = () => {
  return (
    <div className="flex flex-col gap-1 uppercase py-5">
      {categories.map((category) => (
        <Button
          key={category.id}
          as={Link}
          className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
          href={category.href}
        >
          {category.label}
        </Button>
      ))}
      {/*  <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/REMERAS-100"}
      >
        Remeras
      </Button>
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/CAMISETAS-101"}
      >
        Camisetas
      </Button>
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/CHALECOS-109"}
      >
        Chalecos
      </Button>
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/VESTIDOS-102"}
      >
        Vestidos
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/KIMONOS-103"}
      >
        Kimonos
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/BLUSAS-CAMISAS-104"}
      >
        Blusas camisas
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/TAPADOS-105"}
      >
        Tapados
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/PASHMINA-106"}
      >
        Pashmina
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/PANTALONES-Y-LEGGINS-107"}
      >
        Pantalones y Leggins
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"/SWEATERS-TEJIDOS-108"}
      >
        Sweaters tejidos
      </Button> */}
    </div>
  );
};
