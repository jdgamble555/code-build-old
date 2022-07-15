import { getResources } from "@modules/resource";

export const get = async () => {
    const r = await getResources();
    if (r.error) {
        return {
            status: 404,
            body: r.error.message
        }
    }
    return {
        body: r.data
    };
};
