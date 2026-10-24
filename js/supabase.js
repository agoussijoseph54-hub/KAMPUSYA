// 1) Créez un projet sur https://supabase.com  2) Exécutez supabase/schema.sql  3) Collez vos clés ci-dessous
const SUPABASE_URL = "https://VOTRE-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "VOTRE_CLE_ANON_PUBLIQUE";
const sb = (window.supabase && !SUPABASE_URL.includes("VOTRE-PROJET"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const noDb = { error: { message: "Supabase n'est pas configuré : renseignez js/supabase.js." } };
window.API = {
  subscribe: email => sb ? sb.from("newsletter_subscribers").insert({ email }) : noDb,
  contact: d => sb ? sb.from("contact_messages").insert(d) : noDb,
  signUp: (email, password, full_name) => sb ? sb.auth.signUp({ email, password, options: { data: { full_name } } }) : noDb,
  signIn: (email, password) => sb ? sb.auth.signInWithPassword({ email, password }) : noDb,
  signOut: () => sb && sb.auth.signOut(),
  user: async () => sb ? (await sb.auth.getUser()).data.user : null
};
