import { auth } from "@/auth";
import Tabs from "@/app/ui/admin/tabs";


export default async function Page() {
  const session = await auth()
 
  if (!session) return <div>Not authenticated</div>

  return (
    <main className="w-full">
      <p className="text-lg font-bold border-2 w-full text-center uppercase mb-4">
        ADMINISTRACION
      </p>
      <Tabs />
    </main>
  );
}
