// API related

import axios from "axios";
export const getChatMessages = async (chatId) => {
    let accessToken = sessionStorage.getItem("accessToken");
    try {
        const response = await axios.get(
            `/api/chatbot/getChatMessage?chat_id=${chatId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const messages = response.data;
        return messages
    } catch (error) {
        console.error("Error getting new chat ID", error);
        return [];
    } finally {
    }
}

export const setNewChatId = async () => {
    let accessToken = sessionStorage.getItem("accessToken");
    //when first time open the chatbot
    try {
        console.log("chatid Not found running setNewChatId");
        const response = await axios.get("/api/chatbot/postCreateNewChat", {
            headers: {
                Authorization: `Bearer ${accessToken || ""}`,
            },
        });
        const chatId = response.data.chat_id;
        sessionStorage.setItem("current_chatId", chatId);
        // router.push(`/chatbot/${chatId}`, undefined, { shallow: true });
        return chatId;
    } catch (error) {
        console.error("Error getting new chat ID", error);
        return;
    }
}


export const getChatStatus = async (chatId) => {
    let accessToken = sessionStorage.getItem("accessToken");
    try {
        const response = await axios.get(
            `/api/chatbot/getChatStatus?chat_id=${chatId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken || ""}`,
                },
            }
        );
        const chatStatus = response.data.chatStatus;
        return chatStatus;
    } catch (error) {
        return "";
    }
}