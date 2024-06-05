import { useEffect, useState } from 'react';

import { getChatMessages, setNewChatId, getChatStatus } from './api'

const useChat = () => {
  const router = useRouter();
  const routerChatId = router.query.id
  const [currentChatId, setCurrentChatId] = useState(null)
  const [isSendChatLoading, setIsSendChatLoading] = useState(false);
  const [isGetChatLoading, setIsGetChatLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");

  useEffect(() => {
    if (routerChatId) {
      const getChatHistory = async (chatId) => {
        setIsGetChatLoading(true)
        const result = await getChatMessages(chatId)
        setResponseStatus(result)
        setIsGetChatLoading(false)
      }
      getChatHistory(routerChatId);
      setCurrentChatId(routerChatId)
    }
  }, [routerChatId])


  const sendMessage = async (message) => {
    if (currentChatId){
      let result = await sendMessageGivenChatId(message) // Handle result processing
      return
    }
    const newChatId = await setNewChatId()
    const chatStatus = await getChatStatus(newChatId)
    setResponseStatus(chatStatus)
  };

  return {
    isSendChatLoading,
    isGetChatLoading,
    sendMessage,
    responseStatus
  };
};

export { useChat };
