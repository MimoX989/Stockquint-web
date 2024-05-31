"use client";
import { Button, Card, CardBody, Input, Tab, Tabs } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const [resetTabKey, setResetTabKey] = useState("verifymail");
  const [password, setPassword] = useState("");
  const [confpass, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const supabase = createClientComponentClient();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleMailVerify = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/reset-password`,
    });
    console.log({ data });
    alert("Check your email to confirm!");
    setLoading(false);
  };

  const handlePassReset = async () => {
    setLoading(true);
    if (password != confpass) {
      alert("Password Mismatch Error!");
    } else {
      const { data, error } = await supabase.auth.updateUser({
        password: confpass,
      });
      if (data) {
        alert("Password updated successfully!");
        router.push("/login");
      }
      if (error) alert("There was an error updating your password.");
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full flex-col min-h-60 m-10">
      <Tabs
        defaultSelectedKey={resetTabKey}
        variant="underlined"
        aria-label="Options"
      >
        <Tab key="verifymail" title="Input your e-mail">
          <Card>
            <CardBody>
              <form className="m-2">
                <Input
                  isRequired
                  type="email"
                  variant="underlined"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  label="Email"
                  style={{ color: "azure", padding: "5px" }}
                />
              </form>
              <Button isLoading={isLoading} onPress={handleMailVerify}>
                Next
              </Button>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="resetpass" title="Input new password">
          <Card>
            <CardBody>
              <form className="m-2">
                <Input
                  isRequired
                  type="password"
                  variant="underlined"
                  name="password"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ color: "azure", padding: "5px" }}
                />
                <Input
                  isRequired
                  type="password"
                  variant="underlined"
                  name="confirmpassword"
                  label="Confirm Password"
                  onChange={(e) => setConfPassword(e.target.value)}
                  style={{ color: "azure", padding: "5px" }}
                />
              </form>
              <Button isLoading={isLoading} onPress={handlePassReset}>
                Next
              </Button>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>{" "}
    </div>
  );
}

export default page;
