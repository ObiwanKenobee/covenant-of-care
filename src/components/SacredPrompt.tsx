
import React from 'react';
import { useCovenant } from '../contexts/CovenantContext';
import { Card } from '@/components/ui/card';

const SacredPrompt: React.FC = () => {
  const { currentPrayer, terrainContext } = useCovenant();

  const getPromptStyles = () => {
    switch (terrainContext) {
      case 'desert':
        return {
          container: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200',
          text: 'text-amber-900',
          accent: 'text-orange-600'
        };
      case 'empire':
        return {
          container: 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200',
          text: 'text-purple-900',
          accent: 'text-blue-600'
        };
      default:
        return {
          container: 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200',
          text: 'text-green-900',
          accent: 'text-blue-600'
        };
    }
  };

  const styles = getPromptStyles();

  return (
    <Card className={`p-6 ${styles.container} border-2 shadow-lg transition-all duration-500 hover:shadow-xl`}>
      <div className="flex items-center space-x-4">
        <div className={`w-3 h-3 rounded-full ${styles.accent.replace('text-', 'bg-')} animate-pulse`} />
        <div className="flex-1">
          <p className={`${styles.text} font-medium text-lg italic leading-relaxed`}>
            "{currentPrayer}"
          </p>
          <p className={`${styles.accent} text-sm mt-2 capitalize`}>
            {terrainContext} wisdom
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SacredPrompt;
