import { supabase } from "./supabase";

export interface Resource {
    id?: string
    title: string;
    description: string;
    url: string;
};

export const addResource = async ({ title, description, url }: Resource): Promise<any> =>
    await supabase
        .from('resources')
        .insert({ title, description, url });

export const getResources = async (): Promise<any> =>
    await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

export const getResource = async (id: string): Promise<any> =>
    await supabase
        .from('resources')
        .select('*')
        .filter('id', 'eq', id);

export const updateResource = async ({ id, title, description, url }: Resource): Promise<any> =>
    await supabase
        .from('resources')
        .upsert({
            id,
            title,
            description,
            url
        });

export const deleteResource = async ({ id }: { id: string }): Promise<any> =>
    await supabase
        .from('resources')
        .delete()
        .match({ id });
