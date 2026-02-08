import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookiePopup() {
    useEffect(() => {
        CookieConsent.run({

            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true
                },
                analytics: {
                    enabled: false
                }
            },

            language: {
                default: 'en',
                translations: {
                    en: {
                        consentModal: {
                            title: 'We use cookies',
                            description: 'We use cookies to improve the performance of our website. You can manage your settings.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage Individual preferences'
                        },
                        preferencesModal: {
                            title: 'Manage cookie preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Accept current selection',
                            closeIconLabel: 'Close modal',
                            sections: [
                                {
                                    title: 'Somebody said ... cookies?',
                                    description: 'I want one!'
                                },
                                {
                                    title: 'Strictly Necessary cookies',
                                    description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: 'Performance and Analytics',
                                    description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                    linkedCategory: 'analytics'
                                },
                                {
                                    title: 'More information',
                                    description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                                }
                            ]
                        }
                    }
                }
            },
            
            onConsent: ({cookie}) => {
                cookieStore.set("necessary-cookie", "Necessary Hello, World!");

                if (cookie.categories.find(c => c === "analytics"))
                    cookieStore.set("analytics-cookie", "Analytics Hello, World!");
                else
                    cookieStore.delete("analytics-cookie");
            }
        });
    }, [])

    return null;
}