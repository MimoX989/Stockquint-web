"use client";
import { useContext, useEffect } from "react";
import TopNavbar from "./components/top-navbar";
import { AppContext } from "../utils/providers";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const userdata = useContext(AppContext);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    handleReq();
  }, []);

  const handleReq = async () => {
    const res = await supabase.auth.getUser();
    const data = res.data;
    if (data.user != null && data.user.role === "authenticated") {
      userdata.setUser(data.user);
      userdata.setIsAuth(true);
    } else {
      userdata.setIsAuth(false);
      router.replace("/login");
    }
  };

  return (
    <section className="h-screen pb-14">
      <TopNavbar />
      <div className="flex h-full w-full p-2">{children}</div>
    </section>
  );
}

export default DashboardLayout;
