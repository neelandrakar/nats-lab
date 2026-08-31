"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
    >
      Logout
    </button>
  );
}
