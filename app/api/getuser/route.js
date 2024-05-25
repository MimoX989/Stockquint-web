import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createServerComponentClient();

export default async function GET(req, res) {
  const user = await supabase.auth.user();
  return res.status(200).json(await user);
}
