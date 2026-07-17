import { Deal } from "@/data/deals";

export const createDeal = ({
    title,
    userId,
    description,
    deadline,
    creator,
    counterparty
}: {
    title: string;
    userId: string;
    description: string;
    deadline: string;
    creator: string;
    counterparty: string;
}) => {
    try {
        // Check if deal already exists
        const existingDeals = JSON.parse(localStorage.getItem("deals") || "[]");

        // Check if deal is already created under user
        const dealExists = existingDeals.find(
            (deal: Deal) => deal.title.toLowerCase() === title.toLowerCase() && deal.userId === userId,
        );

        if (dealExists) {
            return {
                success: false,
                message: "A deal with this title already exists. Please choose a different name.",
            };
        }

        // Create new deal
        const newDeal: Deal = {
            id: `D${String(existingDeals.length + 1).padStart(3, "0")}`,
            userId,
            title,
            description,
            creator,
            deadline,
            createdAt: new Date().toISOString(),
            status: "Pending",
            counterparty: counterparty || "Not Assigned",
            terms: "",
            participants: 1,
            updates: 0,
            pages: 0,
            wordCount: "0",
            version: "1.0",
            fullContract: "",
        };

        // Save to localStorage
        existingDeals.push(newDeal);
        localStorage.setItem("deals", JSON.stringify(existingDeals));


        return {
            success: true,
            message: "Deal created successfully!",
            data: newDeal,
        };
    } catch (err) {
        console.error("Deal error:", err);
        return {
            success: false,
            message: "An error occurred during deal creation. Please try again.",
        };
    }
}

export const getUserDeals = (userId: string) => {
    try {
        const deals = JSON.parse(localStorage.getItem("deals") || "[]");
        return deals.filter((deal: Deal) => deal.userId === userId);
    } catch (err) {
        console.error("Error getting user deals:", err);
        return [];
    }
};