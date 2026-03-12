import { useEffect, useState, type ReactNode } from "react";

interface Props {
    children: () => ReactNode;
    fallback?: ReactNode;
}

/**
 * Component that only renders its children on the client side.
 * This is useful for components that cause hydration mismatches or 
 * depend on client-side global state/APIs.
 */
export function ClientOnly({ children, fallback = null }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? <>{children()}</> : <>{fallback}</>;
}
