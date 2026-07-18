"use client";

export default function GoogleButton() {
  return (
    <button
      type="button"
      className="
        group

        flex
        h-12
        w-full

        items-center
        justify-center
        gap-3

        rounded-2xl

        border
        border-white/10

        bg-white/5
        backdrop-blur-xl

        text-sm
        font-semibold
        text-white

        transition-all
        duration-300

        hover:border-[#FF9F43]/40
        hover:bg-white/10
        hover:shadow-[0_15px_35px_rgba(255,140,40,.18)]

        active:scale-[0.98]
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center

          rounded-full

          bg-white
          shadow-sm
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-5 w-5"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2c-2.1 1.6-4.7 2.5-7.3 2.5-5.3 0-9.8-3.3-11.4-8l-6.5 5C9.5 39.6 16.1 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.7-6.2 7.5l6.2 5.2C39 37.3 44 31.2 44 24c0-1.3-.1-2.4-.4-3.5z"
          />
        </svg>
      </div>

      <span className="tracking-[0.01em]">
        Continue with Google
      </span>
    </button>
  );
}