import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(res.data);
      {
        res.data.session != null
          ? router.push("/dashboard")
          : console.log("Wrong Authentication!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  return (
    <form className="flex flex-col gap-3 border-4 border-double border-white p-4 w-full">
      <h3 className="text-blue-500">Login</h3>
      <div className="m-2">
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
        <Input
          isRequired
          type="password"
          variant="underlined"
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ color: "azure", padding: "5px" }}
        />
      </div>
      <Button
        isLoading={isLoading}
        variant="ghost"
        type="submit"
        onClick={handleSignIn}
      >
        Log In
      </Button>
      <p className="text-center text-xs text-slate-400">
        Don't have an account? <Link className="text-sm">Sign Up</Link>
      </p>
      <p className="text-center text-xs text-slate-400">
        <Button
          as={Link}
          variant="light"
          className="bg-transparent"
          href={"/reset-password"}
        >
          Forgot Password?
        </Button>
      </p>
    </form>
  );
}
