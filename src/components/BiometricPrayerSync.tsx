
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Waves, Moon, Sun } from 'lucide-react';

interface BiometricData {
  heartRate: number;
  breathingRate: number;
  stressLevel: number;
  coherence: number;
}

const BiometricPrayerSync: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [biometrics, setBiometrics] = useState<BiometricData>({
    heartRate: 72,
    breathingRate: 16,
    stressLevel: 0.3,
    coherence: 0.8
  });

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setBiometrics(prev => ({
          heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
          breathingRate: Math.max(12, Math.min(20, prev.breathingRate + (Math.random() - 0.5) * 2)),
          stressLevel: Math.max(0, Math.min(1, prev.stressLevel + (Math.random() - 0.5) * 0.1)),
          coherence: Math.max(0, Math.min(1, prev.coherence + (Math.random() - 0.5) * 0.1))
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const getPrayerRecommendation = () => {
    if (biometrics.stressLevel > 0.7) {
      return "Breathing meditation recommended - 'Be still and know'";
    } else if (biometrics.coherence > 0.8) {
      return "Heart coherence optimal - 'Give thanks in all circumstances'";
    } else {
      return "Centering prayer suggested - 'Come unto me, all who are weary'";
    }
  };

  const getCoherenceColor = (coherence: number) => {
    if (coherence > 0.8) return 'text-green-600';
    if (coherence > 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-red-500" />
          <span>Biometric Prayer Synchronization</span>
          {isConnected && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Connected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <Button 
            onClick={() => setIsConnected(!isConnected)}
            variant={isConnected ? "destructive" : "default"}
            className="w-full"
          >
            {isConnected ? 'Disconnect Sensors' : 'Connect Biometric Sensors'}
          </Button>
        </div>

        {isConnected && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold">{biometrics.heartRate.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">BPM</div>
              </div>
              
              <div className="text-center p-4 bg-white rounded-lg">
                <Waves className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{biometrics.breathingRate.toFixed(0)}</div>
                <div className="text-sm text-muted-foreground">Breaths/min</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stress Level</span>
                <span className="text-sm">{(biometrics.stressLevel * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500"
                  style={{ width: `${biometrics.stressLevel * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Heart Coherence</span>
                <span className={`text-sm font-bold ${getCoherenceColor(biometrics.coherence)}`}>
                  {(biometrics.coherence * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${biometrics.coherence * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-2 mb-2">
                {biometrics.stressLevel > 0.5 ? 
                  <Moon className="w-5 h-5 text-blue-600" /> : 
                  <Sun className="w-5 h-5 text-yellow-600" />
                }
                <span className="font-semibold text-amber-800">Sacred Guidance</span>
              </div>
              <p className="text-sm text-amber-700 italic">
                {getPrayerRecommendation()}
              </p>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              AI analyzes biometric patterns to suggest personalized spiritual practices
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BiometricPrayerSync;
