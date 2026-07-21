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
            counterpartyId: "",
            inviteStatus: "Pending",
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
        return deals.filter((deal: Deal) => deal.userId === userId || deal.counterpartyId === userId);
    } catch (err) {
        console.error("Error getting user deals:", err);
        return [];
    }
};

export const getDealsInvite = (counterparty: string) => {
    try {
        const deals = JSON.parse(localStorage.getItem("deals") || "[]");
        return deals.filter((deal: Deal) => deal.counterparty === counterparty &&
            deal.inviteStatus === "Pending");
    } catch (err) {
        console.error("Error getting user deals invites:", err);
        return [];
    }
};

export const dealsInviteResponse = (
    counterparty: string,
    counterpartyId: string,
    inviteStatus: "Accepted" | "Declined",
) => {
    try {
        const deals: Deal[] = JSON.parse(
            localStorage.getItem("deals") || "[]"
        );

        const updatedDeals = deals.map((deal) => {
            if (
                deal.counterparty === counterparty &&
                deal.inviteStatus === "Pending"
            ) {
                if (inviteStatus === "Accepted") {
                    const currentParticipants = deal.participants || 0;
                    return {
                        ...deal,
                        counterpartyId:
                            inviteStatus === "Accepted"
                                ? counterpartyId
                                : "",
                        inviteStatus: "Accepted",
                        participants: currentParticipants + 1,
                    };
                }

                if (inviteStatus === "Declined") {
                    return {
                        ...deal,
                        counterpartyId: "",
                        inviteStatus: "Declined",
                        participants: deal.participants || 0,
                    };
                }
            }

            return deal;
        });

        localStorage.setItem("deals", JSON.stringify(updatedDeals));

        return updatedDeals;
    } catch (err) {
        console.error("Error changing deals invites status:", err);
        return [];
    }
};