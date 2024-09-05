import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMessages, Message, sendMessage } from "../api/messageService";
import { useEffect } from "react";
import { useWebSocket } from "./useWebsocket";

interface LEvent<T = unknown> {
  type: string
  data: T
}

export const useMessages = () => {
  const queryClient = useQueryClient();
  const socketService = useWebSocket('ws://localhost:4000');

  const { data: messages, isLoading } = useQuery<unknown, Error, Array<{ id: number, content: string }>>({ queryKey: ['messages'], queryFn: fetchMessages },);

  const postMessage = useMutation({
    mutationFn: sendMessage
  })

  useEffect(() => {
    const listener = ({ type, data }: LEvent<{ id: number }>) => {
      if (type === 'initial_messages') {
        queryClient.setQueryData(['messages'], () => data)
      }
      if (type === 'added') {
        queryClient.setQueryData(['messages'], (old: Message[]) => [...old, data]);
      }
      else {
        queryClient.setQueryData(['messages'], (old: Message[]) => old.filter((e: { id: number }) => e.id != data.id));
      }
    };

    socketService.messages.forEach(listener);
  }, [socketService.messages, queryClient]);

  return { messages, isLoading, postMessage };
};
