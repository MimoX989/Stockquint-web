"use client";
import React, { useContext, useState } from "react";
import LoginForm from "./components/login-form";
// import { AuthContext } from "../utils/providers";
import SignupForm from "./components/signup-form";
import { Button, Spinner, Tab, Tabs } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Page() {
  // let [isAuth, setIsAuth, user] = useContext(AuthContext);
  const types = ["login", "signup"];
  const [isLoading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <div className="p-5">
        <h3>Welcome to Stockquint</h3>
      </div>
      <Tabs
        key={types}
        defaultSelectedKey={"login"}
        variant="underlined"
        aria-label="Tabs"
      >
        <Tab key="login" title="Login">
          <LoginForm />
        </Tab>
        <Tab key="signup" title="Signup">
          <SignupForm />
        </Tab>
      </Tabs>
      <div>
        <Button type="submit" formAction={handleLogout}>
          {isLoading ? <Spinner size="sm" /> : "Logout"}
        </Button>
      </div>
    </>
  );
}

export default Page;
