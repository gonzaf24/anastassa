import { auth } from "@/auth";


export default async function Page() {
  const session = await auth()
 
  if (!session) return <div>Not authenticated</div>

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
     
    </main>
  );
}
