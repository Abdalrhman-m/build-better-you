
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type AICoachType = 'motivation' | 'habit-stacking' | 'overcoming-challenges' | 'celebration' | 'brainstorming';

interface UseAICoachParams {
  habitName?: string;
  habitDescription?: string;
  context?: string;
}

export function useAICoach() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const { toast } = useToast();

  const getAIAdvice = async (
    type: AICoachType, 
    params: UseAICoachParams = {},
    customPrompt?: string
  ) => {
    setIsLoading(true);
    setResponse('');

    try {
      const { data, error } = await supabase.functions.invoke('ai-habit-coach', {
        body: {
          type,
          habitName: params.habitName,
          habitDescription: params.habitDescription,
          context: params.context,
          prompt: customPrompt
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        setResponse(data.message);
        return data.message;
      } else {
        throw new Error(data?.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('AI Coach error:', error);
      toast({
        title: "AI Coach Unavailable",
        description: "I'm having trouble connecting right now. Please try again later!",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAIAdvice,
    isLoading,
    response,
    clearResponse: () => setResponse('')
  };
}
