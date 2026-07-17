import { UserData } from "@/data/user";

export function createUser(firstName: string, lastName: string, email: string, password: string) {
    try {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if email is already registered
        const userExists = existingUsers.some(
            (user: UserData) => user.email === email,
        );

        if (userExists) {
            return {
                success: false,
                message: "An account with this email already exists",
            };
        }

        // Create new user
        const newUser: UserData = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date().toISOString(),
        };

        // Save to localStorage
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // Also store current user session
        const { password: _, ...userWithoutPassword } = newUser;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(userWithoutPassword),
        );

        return {
            success: true,
            message: "Account created successfully!",
            user: userWithoutPassword,
        };
    } catch (err) {
        console.error("Signup error:", err);
        return {
            success: false,
            message: "An error occurred during signup. Please try again.",
        };
    }
}

export function verifyUser(email: string, password: string) {
    try {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Find user by email
        const user = users.find((u: UserData) => u.email === email);

        if (!user) {
            return {
                success: false,
                message: "No account found with this email",

            };
        }

        // Check password
        if (user.password !== password) {
            return {
                success: false,
                message: "Incorrect password",

            };
        }

        // Store current user session (without password)
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem(
            "currentUser",
            JSON.stringify(userWithoutPassword),
        );

        return {
            success: true,
            message: "Successfully logged in...",
            user: userWithoutPassword,
        };

    } catch (err) {
        console.error("Login error:", err);
        return {
            success: false,
            message: "An error occurred during login. Please try again.",

        };
    }
}