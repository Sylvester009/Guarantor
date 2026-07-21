import { Message } from "@/data/messages";

export const saveMessage = ({
    dealId,
    senderId,
    senderName,
    content,
}: {
    dealId: string;
    senderId: string;
    senderName?: string;
    content: string;
}) => {
    try {
        // Check if Messages already exists
        const existingMessages = JSON.parse(localStorage.getItem("messages") || "[]");


        // save new message
        const newMessage: Message = {
            id: `M${String(existingMessages.length + 1).padStart(3, "0")}`,
            dealId,
            senderId,
            senderName,
            content,
            createdAt: new Date().toISOString(),
            status: "Sent",
        };

        // Save to localStorage
        existingMessages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(existingMessages));


        return {
            success: true,
            message: "Message sent successfully!",
            data: newMessage,
        };
    } catch (err) {
        console.error("message error:", err);
        return {
            success: false,
            message: "An error occurred during Message saving. Please try again.",
        };
    }
}

export function getMessages() {
    try {
        const messages = localStorage.getItem("messages");

        return messages ? JSON.parse(messages) : null;
    } catch {
        return null;
    }
}


export const getMessagesByDealId = (dealId: string) => {
    try {
        const messages = JSON.parse(localStorage.getItem("messages") || "[]");
        return messages.filter((message: Message) => message.dealId === dealId);
    } catch (err) {
        console.error("Error getting user deals:", err);
        return [];
    }
};