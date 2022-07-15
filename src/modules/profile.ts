import type { DB } from "./db";
import { supabase } from "./supabase";

export interface Profile {
    username: string;
    website: string;
    photo_url: string;
};

export const _getProfile = async (): Promise<DB> => {
    const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, photo_url`);
    return { data: data[0], error: error?.message };
};

export const _updateProfile = async ({ username, website, photo_url }: Profile): Promise<DB> => {
    const user = supabase.auth.user();
    const { data, error } = await supabase.from('profiles').upsert({
        id: user.id,
        username,
        website,
        photo_url
    });
    return { data: data[0], error: error?.message };
};