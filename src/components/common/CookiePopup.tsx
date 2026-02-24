import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookiePopup() {
    useEffect(() => {
        CookieConsent.run({
            disablePageInteraction: true,
            guiOptions: {
                consentModal: {
                    layout: "box",
                    position: "middle center",
                    equalWeightButtons: true,
                }
            },

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
                            acceptNecessaryBtn: 'Only accept necessary',
                            showPreferencesBtn: 'Manage Individual preferences'
                        },
                        preferencesModal: {
                            title: 'Manage cookie preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Only accept necessary',
                            savePreferencesBtn: 'Accept current selection',
                            closeIconLabel: 'Close modal',
                            sections: [
                                {
                                    title: 'Somebody said ... cookies?',
                                    description: 'I want one!'
                                },
                                {
                                    title: 'Strictly Necessary cookies',
                                    description: '[For educational purposes only, we do not actually use cookies] These cookies are essential for the proper functioning of the website and cannot be disabled.',
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: 'Performance and Analytics',
                                    description: '[For educational purposes only, we do not actually use cookies] These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                                    linkedCategory: 'analytics'
                                },
                                {
                                    title: 'More information',
                                    description: 'For any queries in relation to my policy on cookies and your choices, please <a href="https://github.com/DeLinev/HanoiTower/issues">contact us</a>'
                                }
                            ]
                        }
                    }
                }
            },
            
            onConsent: ({cookie}) => {
                if (cookie.categories.find(c => c === "necessary"))
                    cookieStore.set("necessary-cookie", "Necessary Hello, World!");
                else
                    cookieStore.delete("necessary-cookie");

                if (cookie.categories.find(c => c === "analytics"))
                    cookieStore.set("analytics-cookie", "Analytics Hello, World!");
                else
                    cookieStore.delete("analytics-cookie");
            }
        });
    }, [])

    return null;
}