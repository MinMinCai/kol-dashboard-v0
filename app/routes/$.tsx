import { json } from "@remix-run/node";

export function loader() {
    throw new Response("Not Found", { status: 404 });
}

export default function SplatRoute() {
    return null; // Will trigger ErrorBoundary in root.tsx
}
