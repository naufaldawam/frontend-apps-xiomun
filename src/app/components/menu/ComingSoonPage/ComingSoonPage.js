'use client'
import Link from 'next/link';

const ComingSoonPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff4e6] to-[#fef6ee] text-[#5c2f11] px-4">
      <div className="text-center max-w-md space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">🚧 Coming Soon</h1>
        <p className="text-base md:text-lg text-gray-700">
          We’re working hard to bring you this feature. Stay tuned for updates and a fresh experience.
        </p>
        <Link href="/wellcome">
          <button className="bg-[#723c16] hover:bg-[#5c2f11] text-white px-6 py-2 rounded-lg shadow-md transition">
            Back to Home
          </button>
        </Link>
      </div>

      <div className="mt-10">
        <img
          src="https://ik.imagekit.io/naufal/coming-soon-placeholder.png?updatedAt=1748642226882"
          alt="Coming Soon Illustration"
          className="w-64 md:w-80 mx-auto"
        />
      </div>
    </main>
  );
};

export default ComingSoonPage;
