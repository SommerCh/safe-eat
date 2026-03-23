import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    da: {
        translation: {
            // Generelt
            "error": "Fejl: {{message}}",
            "go_back": "Gå tilbage",
            "save_changes": "Gem ændringer",
            "saving": "Gemmer...",
            "name": "Navn",
            "email_address": "E-mailadresse",
            "password": "Adgangskode",

            // Hjem & Artikler
            "welcome": "Godaften",
            "search_placeholder": "Søg i artikler...",
            "latest_news_and_guides": "Seneste nyt & guides",
            "article_count": "{{count}} artikler",
            "article_not_found": "Artiklen blev ikke fundet.",
            "you_might_also_like": "Måske også relevant for dig",
            "article_tip_heading": "Husk!",
            "article_wip_heading": "Mere på vej",
            "article_wip_paragraph": "Dette er en spændende artikel, som vi er ved at skrive færdig.",
            "article_wip_tip": "Husk at holde din app opdateret for at få de seneste artikler.",

            // Artikelkategorier
            "category_all": "Alle",
            "category_news": "Nyheder",
            "category_tips": "Tips",
            "category_recipes": "Opskrifter",
            "category_health": "Sundhed",
            "category_guides": "Guides",

            // Scanner
            "scan_button": "Åbn scanner",
            "scanner_camera_error": "Kunne ikke få adgang til kameraet",
            "scanner_image_error": "Kunne ikke oprette billede",
            "scanner_no_allergies": "Ingen angivet",
            "scanner_server_error": "Serverfejl",
            "scanner_image_captured": "Billede taget!",
            "scanner_analyzing": "Analyserer ingredienser...",
            "scanner_done": "Færdig med varen.",

            // Onboarding & Auth
            "onboarding_subtitle": "Scan ingredienser og lav din personlige madprofil",
            "login_apple": "Log ind med Apple",
            "login_google": "Log ind med Google",
            "social_login_soon": "Socialt login kommer snart",
            "use_email_for_now": "Brug e-mail indtil da",
            "your_password": "Din adgangskode",
            "password_min_chars": "Adgangskode (min. 6 tegn)",
            "remember_me": "Husk mig på denne enhed",
            "logging_in": "Logger ind...",
            "creating_account": "Opretter...",
            "log_in": "Log ind",
            "create_profile": "Opret profil",
            "no_account_question": "Har du ikke en bruger?",
            "has_account_question": "Har du allerede en bruger?",
            "terms_agreement": "Ved at fortsætte accepterer du vores vilkår og betingelser",

            // Profil & Indstillinger
            "settings_title": "Indstillinger",
            "settings_subtitle": "Administrer din konto og sikkerhed",
            "enter_your_name": "Indtast dit navn",
            "new_password": "Ny adgangskode",
            "new_password_placeholder": "Skriv kun for at ændre",
            "profile_updated_success": "Din profil er blevet opdateret!",
            "log_out": "Log ud",
            "delete_profile": "Slet profil",
            "delete_profile_confirm": "Er du helt sikker på, at du vil slette din profil? Dette kan ikke fortrydes.",
            "delete_profile_error": "Der opstod en fejl under sletning af profilen.",

            // Profil - Personlig "No-list"
            "profile_nolist_title": "Personlig liste",
            "profile_nolist_clear_all": "Ryd alle",
            "profile_nolist_empty": "Listen er tom...",
            "profile_nolist_placeholder": "Tilføj f.eks. palmeolie...",

            // Råvareguide
            "dictionary_title": "Råvareguide",
            "dictionary_subtitle": "Slå skjulte ingredienser op",
            "dictionary_search_placeholder": "Søg f.eks. efter E-numre...",
            "sort_most_important": "Vigtigste",
            "sort_alphabetical": "A-Å",
            "sort_saved": "Gemte",
            "remove_all": "Fjern alle",
            "add_all": "Tilføj alle",
            "dictionary_no_results": "Vi fandt desværre intet der matchede din søgning.",
            "no_favorites": "Ingen favoritter endnu",

            // API Fejl
            "api_post_only": "Kun POST",
            "api_key_missing": "API-nøgle mangler i Vercel",
            "api_fetch_models_error": "Kunne ikke hente modeller: {{message}}",
            "api_unknown_error": "Ukendt fejl",
            "api_no_image_models": "Din API-nøgle har ikke adgang til nogen billed-modeller.",
            "api_model_error": "Fejl fra {{model}}: {{message}}",
            "api_critical_error": "Kritisk serverfejl"
        }
    },
    en: {
        translation: {
            // General
            "error": "Error: {{message}}",
            "go_back": "Go back",
            "save_changes": "Save changes",
            "saving": "Saving...",
            "name": "Name",
            "email_address": "E-mail address",
            "password": "Password",

            // Home & Articles
            "welcome": "Good evening",
            "search_placeholder": "Search articles...",
            "latest_news_and_guides": "Latest news & guides",
            "article_count": "{{count}} articles",
            "article_not_found": "Article not found.",
            "you_might_also_like": "You might also like",
            "article_tip_heading": "Remember!",
            "article_wip_heading": "More on the way",
            "article_wip_paragraph": "This is an exciting article that we are in the process of finishing.",
            "article_wip_tip": "Remember to keep your app updated to get the latest articles.",

            // Article Categories
            "category_all": "All",
            "category_news": "News",
            "category_tips": "Tips",
            "category_recipes": "Recipes",
            "category_health": "Health",
            "category_guides": "Guides",

            // Scanner
            "scan_button": "Open scanner",
            "scanner_camera_error": "Could not access the camera",
            "scanner_image_error": "Could not create image",
            "scanner_no_allergies": "None specified",
            "scanner_server_error": "Server error",
            "scanner_image_captured": "Image captured!",
            "scanner_analyzing": "Analyzing ingredients...",
            "scanner_done": "Done with the product.",

            // Onboarding & Auth
            "onboarding_subtitle": "Scan ingredients and create your personal food profile",
            "login_apple": "Sign in with Apple",
            "login_google": "Sign in with Google",
            "social_login_soon": "Social login coming soon",
            "use_email_for_now": "Use e-mail for now",
            "your_password": "Your password",
            "password_min_chars": "Password (min. 6 characters)",
            "remember_me": "Remember me on this device",
            "logging_in": "Logging in...",
            "creating_account": "Creating account...",
            "log_in": "Log in",
            "create_profile": "Create profile",
            "no_account_question": "Don't have an account?",
            "has_account_question": "Already have an account?",
            "terms_agreement": "By continuing, you agree to our terms and conditions",

            // Profile & Settings
            "settings_title": "Settings",
            "settings_subtitle": "Manage your account and security",
            "enter_your_name": "Enter your name",
            "new_password": "New password",
            "new_password_placeholder": "Only fill to change",
            "profile_updated_success": "Your profile has been updated!",
            "log_out": "Log out",
            "delete_profile": "Delete profile",
            "delete_profile_confirm": "Are you sure you want to delete your profile? This action cannot be undone.",
            "delete_profile_error": "An error occurred while deleting the profile.",

            // Profile - Personal "No-list"
            "profile_nolist_title": "Personal list",
            "profile_nolist_clear_all": "Clear all",
            "profile_nolist_empty": "The list is empty...",
            "profile_nolist_placeholder": "Add e.g. palm oil...",

            // Dictionary
            "dictionary_title": "Ingredient Guide",
            "dictionary_subtitle": "Look up hidden ingredients",
            "dictionary_search_placeholder": "Search for e.g. E-numbers...",
            "sort_most_important": "Most important",
            "sort_alphabetical": "A-Z",
            "sort_saved": "Saved",
            "remove_all": "Remove all",
            "add_all": "Add all",
            "dictionary_no_results": "We couldn't find anything matching your search.",
            "no_favorites": "No favorites yet",

            // API Errors
            "api_post_only": "Only POST requests are allowed",
            "api_key_missing": "API key is missing in Vercel",
            "api_fetch_models_error": "Could not fetch models: {{message}}",
            "api_unknown_error": "Unknown error",
            "api_no_image_models": "Your API key does not have access to any image models.",
            "api_model_error": "Error from {{model}}: {{message}}",
            "api_critical_error": "Critical server error"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "da",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;