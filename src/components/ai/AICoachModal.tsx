
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Sparkles, Heart, Target, Star, Lightbulb, MessageCircle } from 'lucide-react';
import { useAICoach, AICoachType } from '@/hooks/use-ai-coach';
import { cn } from '@/lib/utils';

interface AICoachModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habitName?: string;
  habitDescription?: string;
  initialType?: AICoachType;
}

const AICoachModal = ({ 
  open, 
  onOpenChange, 
  habitName = '', 
  habitDescription = '',
  initialType = 'motivation'
}: AICoachModalProps) => {
  const [selectedType, setSelectedType] = useState<AICoachType>(initialType);
  const [customInput, setCustomInput] = useState('');
  const { getAIAdvice, isLoading, response, clearResponse } = useAICoach();

  const coachTypes = [
    {
      id: 'motivation' as AICoachType,
      title: 'Motivation Boost',
      icon: Heart,
      description: 'Get personalized encouragement',
      color: 'bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300',
      iconColor: 'text-pink-500'
    },
    {
      id: 'habit-stacking' as AICoachType,
      title: 'Habit Stacking',
      icon: Target,
      description: 'Find complementary habits',
      color: 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300',
      iconColor: 'text-blue-500'
    },
    {
      id: 'overcoming-challenges' as AICoachType,
      title: 'Overcome Challenges',
      icon: Star,
      description: 'Get help with obstacles',
      color: 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300',
      iconColor: 'text-yellow-500'
    },
    {
      id: 'brainstorming' as AICoachType,
      title: 'Brainstorm Ideas',
      icon: Lightbulb,
      description: 'Discover new habit ideas',
      color: 'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300',
      iconColor: 'text-purple-500'
    }
  ];

  const handleGetAdvice = async () => {
    const context = selectedType === 'brainstorming' ? customInput : undefined;
    const prompt = selectedType === 'brainstorming' ? customInput : undefined;
    
    await getAIAdvice(selectedType, {
      habitName,
      habitDescription,
      context
    }, prompt);
  };

  const handleTypeChange = (type: AICoachType) => {
    setSelectedType(type);
    clearResponse();
    setCustomInput('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-pink-50 border-2 border-blue-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-purple-700">
            <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
            Your AI Habit Coach
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Habit Context */}
          {habitName && (
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-pink-50 border-yellow-200">
              <h3 className="font-semibold text-purple-700 mb-1">Working with habit:</h3>
              <p className="text-purple-600 font-medium">{habitName}</p>
              {habitDescription && (
                <p className="text-sm text-purple-500 mt-1">{habitDescription}</p>
              )}
            </Card>
          )}

          {/* Coach Type Selection */}
          <div>
            <h3 className="font-semibold text-purple-700 mb-3">What can I help you with?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coachTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.id}
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-200 border-2",
                      type.color,
                      selectedType === type.id 
                        ? "ring-2 ring-purple-400 scale-105 shadow-lg" 
                        : "hover:scale-102 hover:shadow-md"
                    )}
                    onClick={() => handleTypeChange(type.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-5 w-5", type.iconColor)} />
                      <div>
                        <h4 className="font-medium text-purple-700">{type.title}</h4>
                        <p className="text-sm text-purple-600">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Custom Input for Brainstorming */}
          {selectedType === 'brainstorming' && (
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">
                What's your goal or area you'd like to improve?
              </label>
              <Textarea
                placeholder="e.g., 'Reduce stress', 'Be more productive', 'Improve health'..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="border-purple-200 focus:border-purple-400 bg-white/70"
              />
            </div>
          )}

          {/* Get Advice Button */}
          <Button
            onClick={handleGetAdvice}
            disabled={isLoading || (selectedType === 'brainstorming' && !customInput.trim())}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Your AI coach is thinking...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Get AI Advice
              </div>
            )}
          </Button>

          {/* AI Response */}
          {response && (
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-green-200 to-blue-200 rounded-full">
                  <Sparkles className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-700 mb-2">Your AI Coach Says:</h4>
                  <div className="text-green-600 whitespace-pre-wrap leading-relaxed">
                    {response}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AICoachModal;
