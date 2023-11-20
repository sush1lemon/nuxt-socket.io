import crypto from "crypto";

export default function () {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    let user = useCookie('ncs-user', {
        default: () => ({id: crypto.randomUUID(), name: null}),
        expires: now,
        watch: true
    });

    return { user }
}
