import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-6 border-t dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-blue-800 dark:text-gray-200">GradLink</span>. All rights reserved.
        </p>
        
        {/* Optional: Social or nav links */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/privacy" className="hover:underline text-sm text-black">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline text-sm text-black">
            Terms
          </Link>
          <a
            href="https://github.com/tarunkataruka"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-sm text-black"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
