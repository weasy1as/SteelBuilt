import { auth, signOut } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <div className="bg-black text-white">
        <pre className="bg-black text-white">
          Logged in as:{JSON.stringify(session, null, 2)}
        </pre>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" className="bg-red-500 text-white p-2">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
