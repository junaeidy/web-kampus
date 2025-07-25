import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "@/Components/LoadingOverlay";
import AOS from "aos";
import "aos/dist/aos.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        function AppWrapper() {
            const [showLoader, setShowLoader] = useState(true);
            const currentUrl = props.page?.url || props.initialPage?.url || "";

            const excludedPages = ["/admin", "/dashboard", "/login"];
            const isExcluded = excludedPages.some((prefix) =>
                currentUrl.startsWith(prefix)
            );

            useEffect(() => {
                AOS.init({
                    duration: 700,
                    once: true,
                    easing: "ease-out-cubic",
                });
            }, []);

            useEffect(() => {
                const firstLoad = setTimeout(() => {
                    setShowLoader(false);
                }, 1500);

                const start = () => setShowLoader(true);

                const finish = () => {
                    setTimeout(() => {
                        setShowLoader(false);
                        requestAnimationFrame(() => {
                            AOS.refreshHard();
                        });
                    }, 1000);
                };

                router.on("start", start);
                router.on("finish", finish);
                router.on("error", finish);

                return () => {
                    clearTimeout(firstLoad);
                    router.off("start", start);
                    router.off("finish", finish);
                    router.off("error", finish);
                };
            }, []);

            return (
                <>
                    <Toaster position="top-right" />
                    {!isExcluded && showLoader && <LoadingOverlay />}
                    <App {...props} />
                </>
            );
        }

        if (import.meta.env.SSR) {
            hydrateRoot(el, <AppWrapper />);
        } else {
            createRoot(el).render(<AppWrapper />);
        }
    },
    progress: {
        color: "#09309CFF",
        showSpinner: false,
    },
});
