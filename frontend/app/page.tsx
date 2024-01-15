import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const metadata: Metadata = {
  title: "Learn AWS Cognito",
  description:
    "Learn how to provide Authenticated and UnAuthenticated access to your application using AWS Cognito User and Identity Pool and Google Social Login.",
};

const buyMeACoffeLink = "https://bmc.link/vidit0210";

export default function Home() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link href={buyMeACoffeLink}>
            <Image
              src="/images/bmc-button.png"
              alt="buymeacoffeeImage"
              width={125}
              height={125}
              className="hover:mouse-pointer"
            />
          </Link>
          <Link href={"https://twitter.com/Vidit_210"} target="_blank">
            <p className="mt-6 text-sm leading-8 text-gray-500 hover:text-gray-900">
              Contact the Dev(Vidit Shah)
            </p>
          </Link>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-700 sm:text-6xl">
              Learn AWS Cognito
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              Learn how to provide Authenticated and UnAuthenticated access to
              your application using AWS Cognito User and Identity Pool and
              Google Social Login.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              👉 Deploy your backend with AWS CDK and test with AWS SDK
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              👉 Integrate your frontend with Nextjs 13 and AWS Amplify
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://vidit0210.notion.site/vidit0210/AWS-Cognito-11a8be8036544812906b3ccc83450d77"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Learning
              </Link>
              <Link
                href="https://main.d3m5kt17r5818r.amplifyapp.com/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Try out <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
