export function getUser() {
    try {
        const user = localStorage.getItem("currentUser");

        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}