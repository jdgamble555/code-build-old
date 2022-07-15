import type { User } from "@supabase/supabase-js";
import { readable, type Subscriber } from "svelte/store";

import type { DB } from "./db";
import { supabase } from "./supabase";

export const user = readable<User>(null, (set: Subscriber<User>) => {
    set(supabase.auth.user());
    return supabase.auth.onAuthStateChange(
        (_, session) => session ? set(session.user) : set(null)).data.unsubscribe;
});

export const _login = async (email: string): Promise<DB> => {
    const { error } = await supabase.auth.signIn({ email });
    if (error) {
        return { error: error.message };
    }
};

export const _loginWithGoogle = async (): Promise<DB> => {
    const { error } = await supabase.auth.signIn({ provider: 'google' });
    if (error) {
        return { error: error.message };
    }
};

export const _logout = async (): Promise<DB> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: error.message };
    }
};
