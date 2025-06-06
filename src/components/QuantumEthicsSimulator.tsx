
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Shield, Eye, TrendingUp } from 'lucide-react';
import { useCovenant } from '../contexts/CovenantContext';

interface QuantumState {
  ethicalCoherence: number;
  spiritualResonance: number;
  ecologicalHarmony: number;
  socialJustice: number;
  culturalPreservation: number;
}

const QuantumEthicsSimulator: React.FC = () => {
  const { terrainContext } = useCovenant();
  const [isSimulating, setIsSimulating] = useState(false);
  const [quantumState, setQuantumState] = useState<QuantumState>({
    ethicalCoherence: 0.85,
    spiritualResonance: 0.92,
    ecologicalHarmony: 0.78,
    socialJustice: 0.88,
    culturalPreservation: 0.94
  });
  const [entanglement, setEntanglement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSimulating) {
        setQuantumState(prev => ({
          ethicalCoherence: Math.min(1, prev.ethicalCoherence + (Math.random() - 0.5) * 0.02),
          spiritualResonance: Math.min(1, prev.spiritualResonance + (Math.random() - 0.5) * 0.02),
          ecologicalHarmony: Math.min(1, prev.ecologicalHarmony + (Math.random() - 0.5) * 0.02),
          socialJustice: Math.min(1, prev.socialJustice + (Math.random() - 0.5) * 0.02),
          culturalPreservation: Math.min(1, prev.culturalPreservation + (Math.random() - 0.5) * 0.02)
        }));
        setEntanglement(Math.sin(Date.now() / 1000) * 0.5 + 0.5);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const getColorForValue = (value: number) => {
    if (value > 0.9) return 'bg-emerald-500';
    if (value > 0.7) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const runQuantumSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-600" />
          <span>Quantum Ethics Simulator</span>
          <Badge variant="secondary" className="ml-2">
            {terrainContext === 'desert' ? 'Desert Wisdom' : 'Empire Logic'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button 
            onClick={runQuantumSimulation}
            className={`${isSimulating ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isSimulating ? 'Stop Quantum Simulation' : 'Start Quantum Simulation'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(quantumState).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <span className="text-sm font-bold">
                  {(value * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getColorForValue(value)}`}
                  style={{ width: `${value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center p-4 bg-white/50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">Quantum Entanglement Level</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {(entanglement * 100).toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Measuring interconnectedness of ethical dimensions
          </p>
        </div>

        {isSimulating && (
          <div className="text-center p-3 bg-yellow-100 rounded-lg animate-pulse">
            <TrendingUp className="w-5 h-5 mx-auto mb-2 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Quantum simulation active - monitoring ethical field fluctuations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuantumEthicsSimulator;
