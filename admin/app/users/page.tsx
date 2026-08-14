import { Metadata } from "next";
import UsersManager from "@/components/users/UsersManager";

export const metadata: Metadata = {
  title: "Users & Roles",
};

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users & Roles</h1>
        <p className="mt-1 text-sm text-[#94A3B8]">
          Manage all users across the MotoHave platform — create admin/staff accounts and assign roles.
        </p>
      </div>

      <UsersManager />
    </div>
  );
}