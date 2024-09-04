import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex flex-col gap-1 uppercase py-5">
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Remeras
      </Button>
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Camisetas
      </Button>
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Chalecos
      </Button>
      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Vestidos
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Kimonos
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Blusas camisas
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Tapados
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Pashmina
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Pantalones y Leggins
      </Button>

      <Button
        as={Link}
        className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none"
        href={"#"}
      >
        Sweaters tejidos
      </Button>
    </div>
  );
}
