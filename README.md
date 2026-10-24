# SixPay — site web
Site statique multi-pages (HTML/CSS/JS) + Supabase.
## Structure
index.html · tarifs.html · contact.html · connexion.html · css/style.css · js/app.js · js/supabase.js · supabase/schema.sql
## Mise en route
1. Créez un projet Supabase, puis exécutez `supabase/schema.sql` dans le SQL Editor.
2. Copiez l'URL et la clé « anon » (Settings > API) dans `js/supabase.js`.
3. Lancez en local : `npx serve .` (ou ouvrez index.html).
4. Déployez sur Netlify, Vercel ou GitHub Pages (dossier racine).
## Notes
- Transitions de page : rideau animé géré dans `js/app.js`.
- Auth : activez la confirmation e-mail dans Supabase > Authentication.
- Remplacez les noms de partenaires fictifs par vos vrais logos.
