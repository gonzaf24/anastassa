import { Button } from "@nextui-org/button";

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-0 md:pt-0 sm:pr-6">
      <form className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  required
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  required
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  minLength={6}
                  name="password"
                  placeholder="Enter password"
                  type="password"
                />
              </div>
            </div>
          </div>
          <Button className="mt-4 w-full">Log in</Button>
          <div className="flex h-8 items-end space-x-1">
            {/* Add form errors here */}
          </div>
        </div>
      </form>
    </section>
  );
}
