import { Metadata } from "next";
import { notFound } from "next/navigation";
import Dashboard from "./Dashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata(
  { params }: { params: { username: string } }
): Promise<Metadata> {
  try {
    const res = await fetch(`${API_URL}api/v1/users/identify/${params.username}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    if (!data || data.type === "notFound") {
      notFound();
    }

    return {
      title: `Dashboard`,
      description: `Welcome to ${data.firstName} ${data.lastName}'s personalized dashboard on GradLink.`,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    notFound();
  }
}

export default async function Page(props: { params: { username: string } }) {
  return <Dashboard username={props.params.username} />;
}
