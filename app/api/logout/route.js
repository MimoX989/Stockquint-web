import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createServerComponentClient();

export default async function GET(req,res) {
    await supabase.auth.signOut();
}